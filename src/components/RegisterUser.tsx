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
import { OfLegalAge, ValidateDate } from '../utils/functions/ValidateDate';
import { ValidateEmail } from '../utils/functions/ValidateEmail';

const steps = [
  'Datos Personales',
  'Dirección',
  'Trabajo',
  'Ingresos',
  'Confirmación',
];

const UserForm: React.FC = () => {
  const [user, setUser] = useState<user>({
    rut: '',
    phone: '',
    email: '',
    birthday: '',
    name: '',
    firstLastName: '',
    secondLastName: '',
    status: 'Active',
    typeUser: 'Client',
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [address, setAddress] = useState<address>({
    street: '',
    number: '',
    commune: '',
    region: '',
    country: '',
  });
  const [job, setJob] = useState<job>({
    activity: '',
    seniorityJob: '',
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1 && activeStep === 0) {
      console.log(user);
      if (
        user.rut.length !== 0 &&
        user.phone.length !== 0 &&
        user.name.length !== 0 &&
        user.firstLastName.length !== 0 &&
        user.secondLastName.length !== 0 &&
        ValidateEmail(user.email) &&
        ValidateDate(user.birthday) &&
        OfLegalAge(user.birthday) &&
        user.email.length !== 0
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep < steps.length - 1 && activeStep === 1) {
      if (
        address.street.length !== 0 &&
        address.number.length !== 0 &&
        address.commune.length !== 0 &&
        address.region.length !== 0 &&
        address.country.length !== 0
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep < steps.length - 1 && activeStep === 2) {
      if (job.activity.length !== 0 && job.seniorityJob.length !== 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (activeStep === 0) {
      if (name === 'phone') {
        const rawValue = value.replace(/[^0-9]/g, '').toUpperCase();
        setUser((prevUser) => ({ ...prevUser, [name]: rawValue }));
      } else if (name === 'birtday') {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      } else {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      }
    } else if (activeStep === 1) {
      setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    } else if (activeStep === 2) {
      setJob((prevJob) => ({ ...prevJob, [name]: value }));
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40rem',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderBottomLeftRadius: '50% 1rem',
        borderBottomRightRadius: '150% 7rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
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
          Registro PrestaBanco
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          <StepContent
            step={activeStep}
            user={user}
            job={job}
            address={address}
            handleChange={handleChange}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ marginRight: '10px' }}>
                Atrás
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                fullWidth
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
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
