/**
 * This function validates the email format
 * @param value 
 * @returns 
 */
const ValidateEmail = (value: string) => {
    const emailRegex: { test: (arg0: string) => any; } = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

export { ValidateEmail };