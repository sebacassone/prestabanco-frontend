import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoanState from '../interfaces/LoanObject';
import loanServices from '../services/loan.service';
import ClientView from './ClientView';
import requestService from '../services/request.service';

const CreditSimulator: React.FC = () => {
  const [requestSuccess, setRequestSuccess] = useState(false);
  // Definir el estado para los datos del préstamo
  const [loan, setLoan] = useState<LoanState>({
    amountLoan: 0,
    typeLoan: '',
    dateConcession: '',
    numberOfPaymentsLoan: 0,
    quotaLoan: 0,
    stateLoan: '',
    interestLoan: 0,
    administrationAmountLoan: 0,
    totalAmountLoan: 0,
    secureAmountLoan: 0,
    maximumAmountPercentageLoan: 0,
  });

  // Definir estado para los errores
  const [errors, setErrors] = useState({
    amountLoan: false,
    numberOfPaymentsLoan: false,
    maximumAmountPercentageLoan: false,
    typeLoan: false,
    dateConcession: false,
  });

  // Definir estado para el usuario (idUser)
  const [idUser, setIdUser] = useState<number>(0);

  // Estado para mostrar u ocultar resultados
  const [showResults, setShowResults] = useState(false);

  // Estado para los resultados de la simulación
  const [simulationResult, setSimulationResult] = useState<LoanState>({
    amountLoan: 0,
    typeLoan: '',
    dateConcession: '',
    numberOfPaymentsLoan: 0,
    quotaLoan: 0,
    stateLoan: '',
    interestLoan: 0,
    administrationAmountLoan: 0,
    totalAmountLoan: 0,
    secureAmountLoan: 0,
    maximumAmountPercentageLoan: 0,
  });

  // Función para manejar cambios en campos de texto
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'dateConcession') {
      setLoan((prevLoan) => ({
        ...prevLoan,
        [name]: value,
      }));
      return;
    }

    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]:
        name === 'amountLoan' ||
        name === 'numberOfPaymentsLoan' ||
        name === 'quotaLoan' ||
        name === 'interestLoan' ||
        name === 'administrationAmountLoan' ||
        name === 'totalAmountLoan' ||
        name === 'secureAmountLoan' ||
        name === 'maximumAmountPercentageLoan'
          ? value === ''
            ? ''
            : parseFloat(value.replace(/[^\d]/g, '').replace(/^0+/, '')) // Convierte solo los números válidos
          : value.replace(/^0+/, ''),
    }));
  };

  // Función para manejar cambios en los campos del select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  // Función para simular el crédito
  const handleSimulate = () => {
    // Validar el formulario antes de proceder con la simulación
    if (!validateForm()) {
      console.log('Formulario inválido');
      return; // Si no es válido, no continuar
    }

    console.log('Simular crédito con los siguientes datos:', loan);
    loanServices
      .calculate(loan)
      .then((response: any) => {
        console.log('Respuesta de la simulación:', response.data);
        setSimulationResult(response.data);
        setShowResults(true);
      })
      .catch((error: any) => {
        console.error('Error al simular el crédito:', error);
      });
  };

  // Función para realizar la solicitud del crédito
  const handleRequestLoan = async () => {
    console.log(
      'Solicitar crédito con los siguientes datos:',
      simulationResult,
    );
    const loanResponse = await loanServices.save(simulationResult);
    console.log('Respuesta de la solicitud:', loanResponse);
    await requestService.create(
      'Pendiente de Documentación',
      loanResponse.data.idLoan,
      idUser,
    );
    setRequestSuccess(true);
  };

  // Obtener el usuario desde el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIdUser(JSON.parse(storedUser).idUser);
    }
  }, []); // Dependencias vacías para que solo se ejecute una vez al montar

  // Función para validar el formulario
  const validateForm = (): boolean => {
    const newErrors = {
      amountLoan:
        loan.amountLoan < 50000 ||
        loan.amountLoan > 40000000 ||
        isNaN(loan.amountLoan) ||
        !Number.isInteger(Number(loan.amountLoan)),
      numberOfPaymentsLoan:
        loan.numberOfPaymentsLoan <= 0 ||
        loan.numberOfPaymentsLoan > 100 ||
        isNaN(loan.numberOfPaymentsLoan) ||
        !Number.isInteger(Number(loan.numberOfPaymentsLoan)),
      maximumAmountPercentageLoan:
        loan.maximumAmountPercentageLoan < 0 ||
        loan.maximumAmountPercentageLoan > 100 ||
        isNaN(loan.maximumAmountPercentageLoan) ||
        !Number.isInteger(Number(loan.maximumAmountPercentageLoan)),
      typeLoan: loan.typeLoan === '',
      dateConcession:
        loan.dateConcession === '' ||
        new Date(loan.dateConcession) <= new Date(),
    };
    console.log('Errores:', newErrors);

    setErrors(newErrors);

    // Si no hay errores, permitir continuar
    return Object.values(newErrors).every((error) => !error);
  };

  if (requestSuccess) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          ¡Solicitud hecha con éxito!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/intranet')}
        >
          Ir a Intranet
        </Button>
      </Box>
    );
  }

  return (
    <>
      <ClientView />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '35rem',
          height: 'auto',
          width: '40%',
          padding: 3,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
            borderColor: 'black',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 2,
            padding: 3,
            width: '100%',
            ...(showResults && { maxHeight: '50px', overflow: 'hidden' }), // Estilo para minimizar
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => setShowResults(!showResults)} // Cambiar entre mostrar y minimizar
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountCircleIcon sx={{ fontSize: 40, marginRight: 1 }} />
              <Typography variant="h5">1. Datos del crédito</Typography>
            </Box>
            <Typography variant="h5">{showResults ? '+' : '-'}</Typography>{' '}
            {/* Indicador de minimizado */}
          </Box>
          {!showResults && (
            <>
              <TextField
                label="Monto"
                name="amountLoan"
                value={loan.amountLoan === 0 ? '' : loan.amountLoan}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                fullWidth
                type="number"
                error={errors.amountLoan}
                helperText={
                  errors.amountLoan
                    ? 'Debe ser un valor entre $50.000 y $40.000.000'
                    : 'Entre $50.000 y $40.000.000'
                }
              />
              <TextField
                label="Número de cuotas"
                name="numberOfPaymentsLoan"
                value={
                  loan.numberOfPaymentsLoan === 0
                    ? ''
                    : loan.numberOfPaymentsLoan
                }
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                fullWidth
                type="number"
                error={errors.numberOfPaymentsLoan}
                helperText={
                  errors.numberOfPaymentsLoan
                    ? 'Debe ser un valor entre 1 y 100'
                    : 'Entre 1 y 100'
                }
              />
              <TextField
                label="Porcentaje de Financiamiento"
                name="maximumAmountPercentageLoan"
                value={
                  loan.maximumAmountPercentageLoan === 0
                    ? ''
                    : loan.maximumAmountPercentageLoan
                }
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                type="number"
                error={errors.maximumAmountPercentageLoan}
                helperText={
                  errors.maximumAmountPercentageLoan
                    ? 'Debe ser un valor entre 0 y 100'
                    : ''
                }
              />
              <TextField
                label="Fecha de primer vencimiento"
                name="dateConcession"
                type="date"
                value={loan.dateConcession}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{
                  min: new Date().toISOString().split('T')[0], // solo fechas futuras
                }}
              />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Tipo de Préstamo</InputLabel>
                <Select
                  name="typeLoan"
                  value={loan.typeLoan}
                  onChange={handleSelectChange}
                  error={errors.typeLoan}
                >
                  <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
                  <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
                  <MenuItem value="Propiedades Comerciales">
                    Propiedades Comerciales
                  </MenuItem>
                  <MenuItem value="Remodelación">Remodelación</MenuItem>
                </Select>
                {errors.typeLoan && (
                  <Typography color="error" variant="body2">
                    Seleccione un tipo de préstamo
                  </Typography>
                )}
              </FormControl>
              <Typography variant="body2" sx={{ marginBottom: 3 }}>
                *Los seguros asociados al crédito son voluntarios y puedes
                deshabilitarlos aquí.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSimulate}
              >
                Simula tu crédito
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 2,
            padding: 3,
            width: '100%',
            opacity: showResults ? 1 : 0.5,
            pointerEvents: showResults ? 'auto' : 'none',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            2. Resultados de la simulación
          </Typography>
          {simulationResult ? (
            <>
              <Typography variant="body1">
                <strong>Valor de la cuota:</strong> {simulationResult.quotaLoan}
              </Typography>
              <Typography variant="body1">
                <strong>Cantidad de Cuotas:</strong>{' '}
                {simulationResult.numberOfPaymentsLoan}
              </Typography>
              <Typography variant="body1">
                <strong>Costos Administrativos:</strong>{' '}
                {simulationResult.administrationAmountLoan}
              </Typography>
              <Typography variant="body1">
                <strong>Seguro de incendio:</strong> {'20.000'}
              </Typography>
              <Typography variant="body1">
                <strong>Tasa interés mensual:</strong>{' '}
                {simulationResult.interestLoan}
              </Typography>
              <Typography variant="body1">
                <strong>Costo total del crédito:</strong>{' '}
                {simulationResult.totalAmountLoan}
              </Typography>
              <Typography variant="body1">
                <strong>Primer vencimiento:</strong>{' '}
                {simulationResult.dateConcession}
              </Typography>
              <Typography variant="body1">
                <strong>Seguros:</strong> {simulationResult.secureAmountLoan}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleRequestLoan}
                sx={{ marginTop: 3 }}
              >
                Realizar solicitud
              </Button>
            </>
          ) : (
            <Typography variant="body1">No disponible</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CreditSimulator;
