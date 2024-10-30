/**
 * This function validates the email format
 * @param value - email
 * @returns
 */
const ValidateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export { ValidateEmail };
