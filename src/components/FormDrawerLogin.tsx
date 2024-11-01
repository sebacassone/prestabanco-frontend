import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormDrawerProps from '../interfaces/FormDrawerLogin';
import RUTInput from './RutInput';
import PasswordInput from './PasswordComponent';
import calcularVerificador from '../utils/functions/CalculateVerificator';
import userService from '../services/user.service';

const FormDrawer: React.FC<FormDrawerProps> = ({ open, onClose }) => {
  const [credentials, setCredentials] = useState({ rut: '', password: '' });
  const [isValid, setIsValid] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);

  useEffect(() => {
    setIsValid(validateRUT(credentials.rut) && passwordEntered);
  }, [credentials, passwordEntered]);

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (field === 'password') {
      setPasswordEntered(value.length > 0);
    }
  };

  const handleBlur = (field: string) => {
    if (field === 'password' && credentials.password.length === 0) {
      setPasswordEntered(false);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log('Submitting:', credentials);

      userService
        .login({
          rut: credentials.rut,
          password: credentials.password,
        })
        .then((response) => {
          console.log('Response:', response);
          // save object in local storage
          // redirect to home
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      window.location.href = '/intranet';
    }
  };

  const validateRUT = (rut: string) => {
    const rutParts = rut.split('-');
    if (rutParts.length === 2) {
      const [rutBody, verifier] = rutParts;
      return (
        calcularVerificador(rutBody.replace(/\./g, '')) === verifier &&
        rutParts[0].length >= 8
      );
    }
    return false;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      PaperProps={{
        sx: {
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          transition: 'transform 0.6s ease-in-out',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '20em',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ingresa a tu cuenta
        </Typography>
        <RUTInput
          value={credentials.rut}
          onValueChange={(value) => handleChange('rut', value)}
        />
        <PasswordInput
          value={credentials.password}
          onValueChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            bgcolor: isValid ? '#3B1E54' : '#F6F6F6',
            color: isValid ? '#EEEEEE' : 'black',
            borderRadius: '50px',
            padding: '10px 20px',
            width: '80%',
            '&:hover': {
              bgcolor: isValid ? '#3B1E54' : '#D4BEE4',
            },
          }}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Ingresar
        </Button>
      </Box>
    </Drawer>
  );
};

export default FormDrawer;
