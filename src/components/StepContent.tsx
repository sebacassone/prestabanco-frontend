import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
} from '@mui/material';
import StepContentProps from '../interfaces/StepContent';
import RUTInput from './RutInput';
import { ValidateEmail } from '../utils/functions/ValidateEmail';
import { useState } from 'react';
import { ValidateDate, OfLegalAge } from '../utils/functions/ValidateDate';
import Communes from '../utils/json/communes.json';
import PasswordComponent from './PasswordComponent';

const StepContent: React.FC<StepContentProps> = ({
  step,
  user,
  address,
  job,
  incomes,
  handleChange,
}) => {
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorBirthday, setErrorBirthday] = useState<string>('');
  const [errorIncome, setErrorIncome] = useState<string[]>(Array(12).fill(''));
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [PasswordConfirmation, setPasswordConfirmation] = useState<string>('');
  switch (step) {
    case 0:
      return (
        <div>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              label="Nombre"
              name="name"
              placeholder="Ej: Juan"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Apellido Paterno"
              name="firstLastName"
              placeholder="Ej: Pérez"
              fullWidth
              margin="normal"
              value={user.firstLastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Apellido Materno"
              name="secondLastName"
              placeholder="Ej: González"
              fullWidth
              margin="normal"
              value={user.secondLastName}
              onChange={handleChange}
              required
            />
          </Box>
          <RUTInput
            value={user.rut}
            onValueChange={(value) =>
              handleChange({
                target: { name: 'rut', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            width="100%"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="phone">Celular</InputLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">+56 9</InputAdornment>
              }
              placeholder="XXXX XXXX"
              required
              inputProps={{
                maxLength: 8,
                inputMode: 'numeric',
                pattern: '[0-9]*', // This ensures only numbers are accepted
              }} // Ensure max length is 8 for the remaining part
            />
          </FormControl>
          <TextField
            label="Email"
            name="email"
            placeholder="Ej: nombre@dominio.com"
            fullWidth
            margin="normal"
            value={user.email}
            error={Boolean(errorEmail)}
            helperText={errorEmail}
            onChange={handleChange}
            onBlur={() => {
              if (!ValidateEmail(user.email) && user.email.length > 0) {
                setErrorEmail('Error: Debes ingresar un email válido.');
              } else {
                setErrorEmail('');
              }
            }}
            required
          />
          <TextField
            label="Cumpleaños"
            name="birthday"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={user.birthday}
            onChange={handleChange}
            error={Boolean(errorBirthday)}
            helperText={errorBirthday}
            onBlur={() => {
              if (user.birthday.length === 0) {
                setErrorBirthday('');
              } else if (!ValidateDate(user.birthday)) {
                setErrorBirthday('Error: Debes ingresar una fecha válida.');
              } else if (!OfLegalAge(user.birthday)) {
                setErrorBirthday('Error: Debes ser mayor de edad.');
              } else {
                setErrorBirthday('');
              }
            }}
            required
          />
        </div>
      );
    case 1:
      return (
        <div>
          <TextField
            label="Calle"
            name="street"
            placeholder="Ej: Av. Siempre Viva"
            fullWidth
            margin="normal"
            value={address.street}
            onChange={handleChange}
            required
          />
          <TextField
            label="Número"
            name="number"
            placeholder="Ej: 1234"
            fullWidth
            margin="normal"
            value={address.number}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Región"
            name="region"
            fullWidth
            margin="normal"
            value={address.region}
            onChange={handleChange}
            required
          >
            {' '}
            {Communes.regions.map((region) => (
              <MenuItem key={region.abbreviation} value={region.name}>
                {' '}
                {region.name}{' '}
              </MenuItem>
            ))}{' '}
          </TextField>
          <TextField
            select
            label="Comuna"
            name="commune"
            fullWidth
            margin="normal"
            value={address.commune}
            onChange={handleChange}
            required
          >
            {' '}
            {Communes.regions
              .find((region) => region.name === address.region)
              ?.communes.map((commune) => (
                <MenuItem key={commune.identifier} value={commune.name}>
                  {' '}
                  {commune.name}{' '}
                </MenuItem>
              ))}{' '}
          </TextField>
          <TextField
            select
            label="País"
            name="country"
            placeholder="Ej: Chile"
            fullWidth
            margin="normal"
            value={address.country}
            onChange={handleChange}
            required
          >
            <MenuItem value={Communes.name}> {Communes.name} </MenuItem>
          </TextField>
        </div>
      );
    case 2:
      return (
        <div>
          <TextField
            select
            label="Tipo de actividad"
            name="activity"
            fullWidth
            margin="normal"
            value={job.activity}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Selecciona</MenuItem>
            <MenuItem value="empleado">Empleado</MenuItem>
            <MenuItem value="independiente">Independiente</MenuItem>
            <MenuItem value="estudiante">Estudiante</MenuItem>
            <MenuItem value="cesante">Cesante</MenuItem>
          </TextField>
          {job.activity !== 'cesante' && (
            <TextField
              label="¿Qué fecha comenzó en su trabajo actual (con ingresos)?"
              name="seniorityJob"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={job.seniorityJob}
              onChange={handleChange}
              error={Boolean(errorBirthday)}
              helperText={errorBirthday}
              onBlur={() => {
                if (job.seniorityJob.length === 0) {
                  setErrorBirthday('');
                } else if (!ValidateDate(job.seniorityJob)) {
                  setErrorBirthday('Error: Debes ingresar una fecha válida.');
                } else {
                  setErrorBirthday('');
                }
              }}
              required
            />
          )}
        </div>
      );
    case 3:
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {incomes.map((income, index) => (
            <div
              key={index}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                label={`Ingreso ${index + 1} - Fecha`}
                name="date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={income.date}
                error={Boolean(errorIncome[index])}
                helperText={
                  <span
                    style={{
                      height: '1rem',
                      fontSize: '0.75rem',
                      margin: '0',
                      padding: '0',
                      color: 'red',
                    }}
                  >
                    {errorIncome[index] ? errorIncome[index] : '\u00A0'}{' '}
                    {/* No-break space to keep height */}
                  </span>
                }
                onChange={(e) => handleChange(e, index)}
                onBlur={() => {
                  if (!ValidateDate(income.date)) {
                    setErrorIncome((prev) => {
                      prev[index] = 'Error: Debes ingresar una fecha válida.';
                      return [...prev];
                    });
                  } else {
                    console.log('Valid date');
                    setErrorIncome((prev) => {
                      prev[index] = '';
                      return [...prev];
                    });
                  }
                }}
                required
              />
              <TextField
                label={`Ingreso ${index + 1} - Monto`}
                name="amount"
                fullWidth
                margin="normal"
                value={income.amount}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
          ))}
        </div>
      );
    case 4:
      return (
        <div>
          <PasswordComponent
            value={user.password}
            onValueChange={(value) =>
              handleChange({
                target: { name: 'password', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            errorPassword={errorPassword}
            width="100%"
            onBlur={() => {
              if (
                PasswordConfirmation !== user.password &&
                user.password !== '' &&
                PasswordConfirmation !== ''
              ) {
                setErrorPassword('Error: Las contraseñas no coinciden.');
              } else {
                setErrorPassword('');
              }
            }}
          />
          <PasswordComponent
            nameComponent="Confirmar contraseña"
            value={PasswordConfirmation}
            onValueChange={(value) => setPasswordConfirmation(value)}
            width="100%"
            errorPassword={errorPassword}
            onBlur={() => {
              if (
                PasswordConfirmation !== user.password &&
                user.password !== '' &&
                PasswordConfirmation !== ''
              ) {
                setErrorPassword('Error: Las contraseñas no coinciden.');
              } else {
                setErrorPassword('');
              }
            }}
          />
        </div>
      );

    default:
      return null;
  }
};

export default StepContent;
