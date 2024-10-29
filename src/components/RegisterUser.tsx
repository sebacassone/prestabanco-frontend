import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Background from '../assets/images/background-ob-cmr-cl.jpg';
import user from '../interfaces/UserObject';
import address from '../interfaces/AddressObject';
import job from '../interfaces/JobObject';
import StepContent from './StepContent';

const steps = ['Datos Personales', 'Dirección', 'Trabajo', 'Ingresos' ,'Confirmación'];

const UserForm: React.FC = () => {
  // State variable for the user information
  const [user, setUser] = useState<user>({
    rut: '',
    phone: '',
    email: '',
    birthday: '',
    name:'',
    firstLastName:'',
    secondLastName:'',
    status:'Active',
    typeUser:'Client',
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  // State variable for the address information
  const [address, setAddress] = useState<address>({
    street: '',
    number: '',
    commune: '',
    region: '',
    country: '',
  });

  // State variable for the job information
  const [job, setJob] = useState<job>({
    activity: '',
    seniorityJob: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (activeStep === 0) {
      setUser({
        ...user,
        [e.target.name]: e.target.value.replace(/[^0-9kK]/g, '').toUpperCase(),
      });
      return;
    } else if (activeStep === 1) {
      setAddress({
        ...address,
        [e.target.name]: e.target.value,
      });
      return;
    } else if (activeStep === 3) {
      setJob({
        ...job,
        [e.target.name]: e.target.value,
      });
      return;
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('User Information:', user);
  };

  return (
    // Add the following code snippet to the return statement in the UserForm component
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40rem',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderBottomLeftRadius: '50% 1rem',
        borderBottomRightRadius: '150% 7rem', // gives it curvature
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      {/* This is a text over the image */}
      <Box
        sx={{
          maxWidth: '40%',
          color: 'white',
          marginLeft: '15rem',
        }}
      >
        <Typography variant="h4">
          Porque nos mueve un mundo financiero simple y transparente
        </Typography>
        <Typography variant="h5">
          Aprende sobre educación financiera junto a nosotros.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '30rem',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: '20rem',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Formulario CMR
        </Typography>

        {/* This draws the progress in the forms */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* This is the form */}
        <form onSubmit={handleSubmit}>
          < StepContent step={activeStep} user={user} job={job} address={address} handleChange={handleChange}/> {/* This renders the form */}

          {/* This causes the button to change */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {activeStep > 0 && ( // This is to show the back button
              <Button onClick={handleBack} sx={{ marginRight: '10px' }}>
                Atrás
              </Button>
            )}
            {activeStep < steps.length - 1 ? ( // This is to show the next button
              <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                Siguiente
              </Button>
            ) : ( // This is to show the submit button
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UserForm;
