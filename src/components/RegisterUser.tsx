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
import Incomes from '../interfaces/IncomesObject';
import AdressService from '../services/address.service';
import JobService from '../services/job.service';
import UserService from '../services/user.service';
import IncomesService from '../services/incomes.service';

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
    password: '',
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
  const [incomes, setIncomes] = useState<Incomes[]>(
    Array(12).fill({ amount: 0, date: '' }),
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleNext = () => {
    // For the first step when the user is in the first step
    if (activeStep < steps.length - 1 && activeStep === 0) {
      // Validate the user data
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
      // For the second step when the address is in the second step
    } else if (activeStep < steps.length - 1 && activeStep === 1) {
      // Validate the address data
      if (
        address.street.length !== 0 &&
        address.number.length !== 0 &&
        address.commune.length !== 0 &&
        address.region.length !== 0 &&
        address.country.length !== 0
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      // For the third step when the job is in the third step
    } else if (activeStep < steps.length - 1 && activeStep === 2) {
      // Validate the job data
      if (job.activity.length !== 0 && job.seniorityJob.length !== 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      // For the fourth step when the incomes are in the fourth step
    } else if (activeStep < steps.length - 1 && activeStep === 3) {
      // Validate the incomes data
      let isValid = incomes.every((income) => {
        return income.amount !== 0 && income.date !== '';
      });
      if (isValid) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password.length !== 0) {
      // Call the services
      try {
        // Call the management service and get the answer.
        const addressResponse = await AdressService.create(address);
        const addressId = addressResponse.data.idAddress;

        // Call the user service using the address ID and get the answer.
        const userResponse = await UserService.create(user, addressId);
        const userId = userResponse.data.idUser;

        // Call the work service using the user ID and get the answer.
        const jobResponse = await JobService.create(job, userId);
        const jobId = jobResponse.data.idJob; // Obtiene el ID del trabajo

        // Calling the revenue service using the job ID
        await IncomesService.create(incomes, jobId);

        console.log('Registro completado exitosamente');
        setIsSubmitted(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
  ) => {
    const { name, value } = e.target;
    if (activeStep === 0 || name === 'password') {
      if (name === 'phone') {
        const rawValue = value.replace(/[^0-9]/g, '').toUpperCase();
        setUser((prevUser) => ({ ...prevUser, [name]: rawValue }));
      } else if (name === 'birtday') {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      } else {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      }
    } else if (activeStep === 1) {
      if (name === 'number') {
        const rawValue = value.replace(/[^0-9]/g, '').toUpperCase();
        setAddress((prevAddress) => ({ ...prevAddress, [name]: rawValue }));
      } else if (name === 'street') {
        const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
        setAddress((prevAddress) => ({ ...prevAddress, [name]: cleanedValue }));
      } else if (name === 'region' && address.commune.length > 0) {
        address.commune = '';
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
      } else {
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
      }
    } else if (activeStep === 2) {
      setJob((prevJob) => ({ ...prevJob, [name]: value }));
    } else if (activeStep === 3 && typeof index === 'number') {
      const { name, value } = e.target;
      const newIncomes = [...incomes];
      newIncomes[index] = {
        ...newIncomes[index],
        [name]:
          name === 'date'
            ? new Date(value).toISOString().slice(0, 10)
            : Number(value),
      };
      setIncomes(newIncomes);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '55rem',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderBottomLeftRadius: '50% 1rem',
        borderBottomRightRadius: '150% 7rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          maxWidth: '40%',
          color: 'white',
          marginLeft: '13rem',
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
          padding: '2rem',
          borderRadius: '50px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '50rem',
          height: '45rem',
          position: 'relative',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: '10rem',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Registro PrestaBanco
        </Typography>
        {/* Print the flow */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {/* Print the forms */}
            <StepContent
              step={activeStep}
              user={user}
              job={job}
              address={address}
              incomes={incomes}
              handleChange={handleChange}
            />
            {/* Prints the changing button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5rem',
                position: 'absolute',
                bottom: '1rem', // Añadir esta línea
                width: '90%',
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
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', // Para asegurar que ocupe todo el espacio disponible
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              Registro exitoso
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = '/')}
              sx={{
                margin: 'auto',
              }}
            >
              Volver al inicio
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
