import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// ========= in ts =========
// import clsx, { ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
 
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }