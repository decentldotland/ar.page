/**
 * Extract Month and Year from Unix Timestamp
 * @param timestamp - Unix timestamp in string
 * @returns object containing month and year {month: month, year: year}
 * @note: Month will show 1st three letters, ex. Nov, and year will show entire year, ex. 2022
 */

export function extractMonthAndYear(timestamp: number) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
  
    // Get the month and year from the date object
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();
  
    // Return the month and year as an object
    return { 
        "month": month, 
        "year": year
    }
}