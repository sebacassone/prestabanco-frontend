import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Background from '../../assets/images/background-ob-cmr-cl.jpg';
import user from '../../interfaces/UserObject';
import address from '../../interfaces/AddressObject';
import job from '../../interfaces/JobObject';
import StepContent from './StepContent';
import { OfLegalAge, ValidateDate } from '../../utils/functions/ValidateDate';
import { ValidateEmail } from '../../utils/functions/ValidateEmail';
import Incomes from '../../interfaces/IncomesObject';
import AdressService from '../../services/address.service';
import JobService from '../../services/job.service';
import UserService from '../../services/user.service';
import IncomesService from '../../services/incomes.service';

// Define the theme colors
export const themeColors = {
  primary: '#9B7EBD',
  secondary: '#3B1E54',
  accent: '#EEEEEE',
  background: '#FFFFFF',
  backgroundOverlay: 'rgba(255, 255, 255, 0.9)',
  borderColor: '#EEEEEE',
  textColor: '#EEEEEE',
  buttonHover: 'rgba(255, 255, 255, 0.2)',
  buttonActive: 'rgba(255, 255, 255, 0.1)',
  buttonBackground: '#EEEEEE',
  buttonText: '#3B1E54',
};

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
    if (activeStep < steps.length - 1 && activeStep === 0) {
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
      } else {
        alert('Por favor, complete los campos correctamente');
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
      } else {
        alert('Por favor, complete los campos correctamente');
      }
    } else if (activeStep < steps.length - 1 && activeStep === 2) {
      if (job.activity.length !== 0 && job.seniorityJob.length !== 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        alert('Por favor, complete los campos correctamente');
      }
    } else if (activeStep < steps.length - 1 && activeStep === 3) {
      let isValid = incomes.every((income) => {
        return income.amount !== 0 && income.date !== '';
      });
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        alert('Por favor, complete los campos correctamente');
      }
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
      try {
        const addressResponse = await AdressService.create(address);
        const addressId = addressResponse.data.idAddress;
        console.log('Address ID:', addressId);

        const userResponse = await UserService.create(user, addressId);
        const userId = userResponse.data.idUser;

        const jobResponse = await JobService.create(job, userId);
        const jobId = jobResponse.data.idJob;

        await IncomesService.create(incomes, jobId);

        console.log('Registro completado exitosamente');
        setIsSubmitted(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        // Abre una ventana de que hubo un error con el servidor
        alert('Hubo un error con el servidor');
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
        height: 'auto',
        minHeight: '55rem',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderBottomLeftRadius: '50% 1rem',
        borderBottomRightRadius: '200% 10rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          maxWidth: '40%',
          color: themeColors.textColor,
          marginLeft: '13rem',
        }}
      >
        <Typography variant="h4" sx={{ color: themeColors.textColor }}>
          Porque nos mueve un mundo financiero simple y transparente
        </Typography>
        <Typography variant="h5" sx={{ color: themeColors.textColor }}>
          Aprende sobre educación financiera junto a nosotros.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: themeColors.backgroundOverlay,
          padding: '2.5rem',
          borderRadius: '50px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '50rem',
          height: 'auto',
          minHeight: '45rem',
          position: 'relative',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: '10rem',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Registro PrestaBanco
        </Typography>
        <Stepper
          sx={{
            color: themeColors.primary, // Apply primary color to text/icons
            backgroundColor: themeColors.background, // Set the background color
            borderRadius: '50px',
            marginBottom: '1rem',
            '& .MuiStepLabel-root': {
              color: themeColors.primary, // Set step label text color
            },
            '& .MuiStepConnector-line': {
              borderColor: themeColors.primary, // Change the connector line color between steps
            },
            '& .MuiStepIcon-root.Mui-active': {
              color: themeColors.secondary, // Change active step icon color
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: themeColors.primary, // Change completed step icon color
            },
          }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <StepContent
              step={activeStep}
              user={user}
              job={job}
              address={address}
              incomes={incomes}
              handleChange={handleChange}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2rem',
                marginBottom: '1rem',
                position: 'relative',
                bottom: '1rem',
                width: '90%',
              }}
            >
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  sx={{
                    marginRight: '10px',
                    color: themeColors.primary,
                  }}
                >
                  Atrás
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      backgroundColor: themeColors.primary,
                      '&:hover': {
                        backgroundColor: themeColors.secondary,
                      },
                    }}
                  >
                    Siguiente
                  </Button>
                </Box>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: themeColors.primary,
                    '&:hover': {
                      backgroundColor: themeColors.secondary,
                    },
                  }}
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
              height: '100%',
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
              Registro exitoso
            </Typography>
            <Button
              variant="contained"
              onClick={() => (window.location.href = '/')}
              sx={{
                backgroundColor: themeColors.primary,
                '&:hover': {
                  backgroundColor: themeColors.buttonHover,
                },
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
