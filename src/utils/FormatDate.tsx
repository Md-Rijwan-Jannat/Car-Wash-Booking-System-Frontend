/* eslint-disable @typescript-eslint/no-explicit-any */
import { Temporal } from "@js-temporal/polyfill";

export const formatDate = (date: any): string => {
  return Temporal.PlainDate.from(date).toString(); // "YYYY-MM-DD"
};
