import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Clear from '@mui/icons-material/Clear';
import { useState } from 'react';

const PasswordInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <TextField
      label="Clave"
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      margin="normal"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton onClick={handleClear}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: '#F6F6F6',
        borderRadius: '10px',
        width: '80%',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '10px',
          },
        },
      }}
    />
  );
};

export default PasswordInput;