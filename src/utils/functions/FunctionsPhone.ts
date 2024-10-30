const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11 && !cleaned.startsWith('569')) {
      const formattedValue = `+56 9 ${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)}`;
      return formattedValue;
    }
    return value;
  };

const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11 && cleaned.startsWith('569'); // Ensure phone number starts with 569
  };

export { formatPhone, validatePhone };