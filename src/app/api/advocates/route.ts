import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Parse pagination parameters
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(25, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const offset = (page - 1) * limit;
  
  // Parse search parameter
  const search = searchParams.get("search") || "";
  
  // Build query with optional search filter
  let query = db.select().from(advocates);
  
  if (search) {
    query = query.where(
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        sql`${advocates.specialties}::text ILIKE ${`%${search}%`}`
      )
    );
  }
  
  // Add pagination
  query = query.limit(limit).offset(offset);
  
  // Execute query
  const data = await query;
  
  // Get total count for pagination metadata
  let countQuery = db.select({ count: sql<number>`count(*)` }).from(advocates);
  
  if (search) {
    countQuery = countQuery.where(
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        sql`${advocates.specialties}::text ILIKE ${`%${search}%`}`
      )
    );
  }
  
  const [{ count }] = await countQuery;
  const totalPages = Math.ceil(count / limit);

  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Response.json({
    data,
    pagination: {
      page,
      limit,
      total: parseInt(count),
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}
