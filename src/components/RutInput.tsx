import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import calcularVerificador from '../utils/functions/CalculateVerificator';

const RUTInput: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^0-9kK]/g, '').toUpperCase(); // Remove non-numeric characters and convert K to uppercase

        let formattedValue = '';
        let rutBody = rawValue.slice(0, -1); // Everything except the last character
        const verifier = rawValue.slice(-1); // The last character

        // Format the RUT body as xx.xxx.xxx
        if (rutBody.length > 1) {
        rutBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        formattedValue = `${rutBody}-${verifier}`;
        
        // Remove the dash if there's no verifier or if the verifier is incorrect
        if (verifier.length === 0 || (verifier !== 'K' && isNaN(Number(verifier)))) {
        formattedValue = rutBody;
        }

        setValue(formattedValue);
    };

    // Function to be executed when exiting the text field
    const handleBlur = () => {
        const rutParts = value.split('-');
        if (rutParts.length === 2) {
            const [rutBody, verifier] = rutParts;
            if (calcularVerificador(rutBody.replace(/\./g, '')) !== verifier 
            ||
            rutParts[0].length < 8) {
                setError('Error: Debes ingresar un RUT válido. ');
            } else {
                console.log(rutBody);
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
            inputProps={{
                maxLength: 12,
            }}
            sx={{
                backgroundColor: '#F6F6F6',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderRadius: '10px',
                    },
                },
                width: '80%',
            }}
        />
  );
};

export default RUTInput;

