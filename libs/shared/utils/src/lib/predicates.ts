/**
 * Type predicate functions for runtime type checking
 */

/**
 * Checks if a value is a string
 * @param value - The value to check
 * @returns True if the value is a string, false otherwise
 * @example
 * ```typescript
 * isString('hello') // true
 * isString(123) // false
 * isString(null) // false
 * isString(undefined) // false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a non-empty string
 * @param value - The value to check
 * @returns True if the value is a non-empty string, false otherwise
 * @example
 * ```typescript
 * isNonEmptyString('hello') // true
 * isNonEmptyString('') // false
 * isNonEmptyString(123) // false
 * ```
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

/**
 * Checks if a value is a string with only whitespace or empty
 * @param value - The value to check
 * @returns True if the value is a string that is empty or contains only whitespace
 * @example
 * ```typescript
 * isEmptyOrWhitespaceString('') // true
 * isEmptyOrWhitespaceString('   ') // true
 * isEmptyOrWhitespaceString('hello') // false
 * isEmptyOrWhitespaceString(123) // false
 * ```
 */
export function isEmptyOrWhitespaceString(value: unknown): boolean {
  return isString(value) && value.trim().length === 0;
}

/**
 * Checks if a value is a string with meaningful content (non-empty after trimming)
 * @param value - The value to check
 * @returns True if the value is a string with meaningful content, false otherwise
 * @example
 * ```typescript
 * isMeaningfulString('hello') // true
 * isMeaningfulString('  hello  ') // true
 * isMeaningfulString('') // false
 * isMeaningfulString('   ') // false
 * isMeaningfulString(123) // false
 * ```
 */
export function isMeaningfulString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}
