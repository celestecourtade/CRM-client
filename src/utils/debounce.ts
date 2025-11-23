// src/utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timeout: number; // <-- cambiar NodeJS.Timeout por number
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), delay); // usar window.setTimeout
  };
}
