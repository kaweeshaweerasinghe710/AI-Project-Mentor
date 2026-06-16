/**
 * Calculates a positive integer hash code from a string.
 * Used to generate consistent mock analysis scores and attributes for custom URLs.
 */
export function getHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
