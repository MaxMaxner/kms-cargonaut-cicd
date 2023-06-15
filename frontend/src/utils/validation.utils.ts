/**
 * Checks whether a given email address is valid based on its format.
 *
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email address is valid.
 */
export function isValidEmail(email: string): boolean {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression and return the result
  return emailRegex.test(email);
}

