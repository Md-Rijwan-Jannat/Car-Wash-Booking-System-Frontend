/* eslint-disable @typescript-eslint/no-explicit-any */
import { Temporal } from "@js-temporal/polyfill";

export const formatDate = (date: any): string => {
  return Temporal.PlainDate.from(date).toString(); // "YYYY-MM-DD"
};

export function formatCalenderDate(date: string): string {
  if (!date) {
    // Handle the case where date is null or undefined
    console.error("Date is null or undefined.");
    return "Invalid Date"; // Or any other default value or error message you prefer
  }
  // Split the date into day, month, and year
  const [day, month, year] = date.split("-");

  // Add leading zeros if necessary
  const formattedDay = day.length === 1 ? `0${day}` : day;
  const formattedMonth = month.length === 1 ? `0${month}` : month;

  // Return the formatted date as YYYY-MM-DD
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export const formatTo12Hour = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedMinute = minute.toString().padStart(2, "0"); // Ensure minutes are 2 digits

  return `${formattedHour}:${formattedMinute} ${period}`;
};
