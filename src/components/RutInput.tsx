import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import calcularVerificador from '../utils/functions/CalculateVerificator';
import RUTInputProps from '../interfaces/RutInput';

const RUTInput: React.FC<RUTInputProps> = ({ value, onValueChange, width }) => {
  const [error, setError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters and convert to uppercase
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

    onValueChange(formattedValue);
  };

  const handleBlur = () => {
    const rutParts = value.split('-');
    if (rutParts.length === 2) {
      const [rutBody, verifier] = rutParts;
      if (calcularVerificador(rutBody.replace(/\./g, '')) !== verifier || rutParts[0].length < 8) {
        setError('Error: Debes ingresar un RUT válido.');
      } else {
        setError('');
      }
    }
  };

  return (
    <TextField
      label="RUT"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(error)}
      helperText={error}
      sx={{
        backgroundColor: '#F6F6F6',
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '10px',
          },
        },
        width: width? width:'80%',
      }}
      inputProps={{
        maxLength: 12,
      }}
    />
  );
};

export default RUTInput;
