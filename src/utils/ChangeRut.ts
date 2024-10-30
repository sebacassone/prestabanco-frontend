import { ChangeEvent } from 'react';
import calcularVerificador from './functions/CalculateVerificator';

/*
All the logic for handling the RUT input is encapsulated in this file.
The handleRutChange function formats the RUT as the user types it.
The handleRutBlur function validates the RUT when the input loses focus.
*/

/**
 * Function that formats the RUT as the user types it.
 * @param event - The event that triggered the function.
 * @param setValue - The function that updates the value of the input.
 * @returns void
 */
const handleRutChange = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void,
) => {
  const rawValue = event.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
  let formattedValue = '';
  let rutBody = rawValue.slice(0, -1);
  const verifier = rawValue.slice(-1);

  if (rutBody.length > 1) {
    rutBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formattedValue = `${rutBody}-${verifier}`;

  if (verifier.length === 0 || (verifier !== 'K' && isNaN(Number(verifier)))) {
    formattedValue = rutBody;
  }

  setValue(formattedValue);
};

/**
 * Function that validates the RUT when the input loses focus.
 * @param value - The value of the input.
 * @param setError - The function that updates the error message.
 * @returns void
 */
const handleRutBlur = (value: string, setError: (value: string) => void) => {
  const rutParts = value.split('-');
  if (rutParts.length === 2) {
    const [rutBody, verifier] = rutParts;
    if (
      calcularVerificador(rutBody.replace(/\./g, '')) !== verifier ||
      rutParts[0].length < 8
    ) {
      setError('Error: Debes ingresar un RUT válido. ');
    } else {
      console.log(rutBody);
      setError('');
    }
  }
};

export { handleRutChange, handleRutBlur };
