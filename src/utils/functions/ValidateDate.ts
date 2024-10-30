/**
 * This function validates the date format
 * @param date
 * @returns
 */
const ValidateDate = (date: string): boolean => {
  const year: string = date.split('-')[0];
  let validate: boolean = false;
  if (year.length === 4 && parseInt(year) > 1900) {
    validate = true;
  }
  return validate;
};

/**
 * This function calculates the age of a person
 * @param birthDateStr
 * @param currentDateStr
 * @returns
 */
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * This function calculates the age of a person
 * @param birthDateStr
 * @param currentDateStr
 * @returns
 */
const calculateAge = (birthDateStr: string, currentDateStr: string): number => {
  const birthDate = parseDate(birthDateStr);
  const currentDate = parseDate(currentDateStr);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * This function formats the date
 * @param dateStr
 * @returns
 */
const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
};

/**
 * This function validates if a person is of legal age
 * @param birthDateStr
 * @param currentDateStr
 * @returns
 */
const OfLegalAge = (birthDateStr: string): boolean => {
  const currentDateStr = new Date().toLocaleDateString('es-CL');
  return calculateAge(formatDate(birthDateStr), currentDateStr) >= 18;
};

export { ValidateDate, OfLegalAge };
