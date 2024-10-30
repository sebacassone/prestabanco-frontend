import { TextField, MenuItem } from '@mui/material';
import StepContentProps from '../interfaces/StepContent';
import RUTInput from './RutInput';

const StepContent: React.FC<StepContentProps> = ({ step, user, address, job, handleChange }) => {
  switch (step) {
    case 0:
      return (
        <div>
          <RUTInput value={user.rut}
            onValueChange={
              (value) => handleChange({
                target: { name: 'rut', value } 
                } as React.ChangeEvent<HTMLInputElement>)} />
          <TextField 
            label="Celular"
            name="phone"
            placeholder="Ej: +56 9 XXXX XXXX"
            fullWidth margin="normal"
            value={user.phone}
            onChange={handleChange}
            required
            inputProps={{maxLenght: 14}}
            />
          <TextField
            label="Email"
            name="email"
            placeholder="Ej: nombre@dominio.com"
            fullWidth margin="normal"
            value={user.email}
            onChange={handleChange}
            required />
          </div> 
        );
    case 1:
      return (
        <div>
          <TextField label="Calle" name="street" placeholder="Ej: Av. Siempre Viva" fullWidth margin="normal" value={address.street} onChange={handleChange} required />
          <TextField label="Número" name="number" placeholder="Ej: 1234" fullWidth margin="normal" value={address.number} onChange={handleChange} required /> <TextField label="Comuna" name="commune" placeholder="Ej: Springfield" fullWidth margin="normal" value={address.commune} onChange={handleChange} required /> <TextField label="Región" name="region" placeholder="Ej: Metropolitana" fullWidth margin="normal" value={address.region} onChange={handleChange} required /> <TextField label="País" name="country" placeholder="Ej: Chile" fullWidth margin="normal" value={address.country} onChange={handleChange} required />
          </div>
          );
    case 2:
      return (
        <div>
          <TextField select label="Tipo de actividad" name="activity" fullWidth margin="normal" value={job.activity} onChange={handleChange} required >
            <MenuItem value="">Selecciona</MenuItem>
            <MenuItem value="empleado">Empleado</MenuItem>
            <MenuItem value="independiente">Independiente</MenuItem>
            <MenuItem value="estudiante">Estudiante</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
          <TextField label="Antigüedad en el trabajo" name="seniorityJob" placeholder="Ej: 5 años" fullWidth margin="normal" value={job.seniorityJob} onChange={handleChange} required />
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;
