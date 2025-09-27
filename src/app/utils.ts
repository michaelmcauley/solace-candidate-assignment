/**
 * Formats a phone number to a readable format
 * @param phoneNumber - The phone number as a number or string
 * @returns Formatted phone number string (e.g., "(555) 123-4567")
 */
export function formatPhoneNumber(phoneNumber: number | string): string {
  // Convert to string and remove any non-digit characters
  const cleaned = phoneNumber.toString().replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 digits)
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    const exchange = cleaned.slice(3, 6);
    const number = cleaned.slice(6, 10);
    return `(${areaCode}) ${exchange}-${number}`;
  }
  
  // If not 10 digits, return as-is (could be international)
  return phoneNumber.toString();
}
