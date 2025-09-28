"use client";

import AdvocateCard from "./components/AdvocateCard";
import { Advocate } from "./types";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./page.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  // Use react-query to fetch advocates
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["advocates", searchTerm],
    queryFn: async () => {
      const url = searchTerm ? `/api/advocates?search=${searchTerm}` : "/api/advocates";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch advocates");
      }
      return response.json();
    },
  });

  // Update advocates state when data changes
  useEffect(() => {
    if (data && data.data) {
      setAdvocates(data.data);
    }
  }, [data]);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    refetch();
  };

  return (
    <main className="container" id="advocate-search">
      <header>
        <h1 className="centered">Find your advocate</h1>
      </header>
      <section>
        <form onSubmit={handleSearch}>
          <fieldset role="group">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              name="searchTerm"
              type="text"
              placeholder="Search advocates by name or specialty"
            />
            <input type="submit" value="Search" />
          </fieldset>
        </form>
      </section>
      <section>
        {isLoading && (
          <p className="centered" aria-busy="true">Searching for advocates...</p>
        )}
        
        {error && (
          <div className="centered">
            <p>Error loading advocates: {(error as Error).message}</p>
            <button onClick={() => refetch()}>
              Try Again
            </button>
          </div>
        )}
        
        {!isLoading && !error && advocates.length === 0 && (
          <p className="centered">No advocates found matching your search.</p>
        )}
        
        {!isLoading && !error && advocates.length > 0 && (
          <>
            {advocates.map((advocate: Advocate) => (
              <AdvocateCard key={advocate.id} advocate={advocate} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}
