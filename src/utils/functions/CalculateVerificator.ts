/**
 * Function that calculates the check digit of a Chilean rut.
 * @param numero - Rout number without the check digit.
 * @returns The verification digit of the routine.
 */
const calcularVerificador = (numero: string): string => {
  let sum = 0;
  let mul = 2;
  let i = numero.length;

  while (i--) {
    sum += parseInt(numero.charAt(i)) * mul;
    if (mul % 7 === 0) {
      mul = 2;
    } else {
      mul++;
    }
  }

  const res = sum % 11;
  if (res === 0) {
    return '0';
  } else if (res === 1) {
    return 'K';
  }
  return `${11 - res}`;
};

export default calcularVerificador;
