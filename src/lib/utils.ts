import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error handler
export function handleError(err: unknown) {
  if (err instanceof Error) {
    // This is a native JavaScript error(TypeError, RangeError)
    console.error(err.message);
    throw new Error(`Error: ${err.message}`);
  } else if (typeof err === "string") {
    // This is a string error message
    console.error(err);
    throw new Error(`Error: ${err}`);
  } else {
    // This is an unknown type of error
    console.error(err);
    throw new Error(`Unknown error: ${JSON.stringify(err)}`);
  }
}
