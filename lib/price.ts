/**
 * A package price is only "real" if it contains at least one non-zero digit.
 * Empty values, "0", "0.00" and "₹0" all count as missing.
 */
export function hasValidPrice(price: unknown): boolean {
  if (price === null || price === undefined) return false;
  return /[1-9]/.test(String(price));
}

/** Text to show for a package price; falls back to "Price on request". */
export function displayPrice(price: unknown): string {
  return hasValidPrice(price) ? String(price) : "Price on request";
}
