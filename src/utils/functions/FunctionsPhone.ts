/**
 * This function formats the phone number
 * @param value
 * @returns
 */
const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length !== 11 && !cleaned.startsWith('569')) {
    const formattedValue = `+56 9 ${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)}`;
    return formattedValue;
  }
  return value;
};

/**
 * This function validates the phone number
 * @param value
 * @returns
 */
const validatePhone = (value: string): boolean => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('569'); // Ensure phone number starts with 569
};

export { formatPhone, validatePhone };
