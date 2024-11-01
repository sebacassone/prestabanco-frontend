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
  SelectChangeEvent,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Usar un icono de Material UI
import LoanState from '../interfaces/LoanObject';
import loanServices from '../services/loan.service';
import ClientView from './ClientView';

const CreditSimulator: React.FC = () => {
  const [idUser, setIdUser] = useState<number>(0);

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
  });

  const [showResults, setShowResults] = useState(false);
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
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]:
        name === 'amountLoan' ||
        name === 'numberOfPaymentsLoan' ||
        name === 'quotaLoan' ||
        name === 'interestRate' ||
        name === 'administrationAmountLoan' ||
        name === 'totalAmoutLoan' ||
        name === 'secureAmountLoan'
          ? value === ''
            ? 0
            : parseFloat(value)
          : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name!]: value,
    }));
  };

  const handleSimulate = () => {
    // Lógica para simular el crédito
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

  const handleRequestLoan = async () => {
    // Lógica para solicitar el crédito
    console.log('Solicitar crédito con los siguientes datos:', loan);
    const loanResponse = await loanServices.save(loan);
    console.log('Respuesta de la solicitud:', loanResponse);
  };

  // Quiero obtener el usuario del localstorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIdUser(JSON.parse(storedUser).idUser);
    }
  });

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
                value={loan.amountLoan}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                fullWidth
                helperText="Entre $50.000 y $40.000.000"
              />
              <TextField
                label="Número de cuotas"
                name="numberOfPaymentsLoan"
                value={loan.numberOfPaymentsLoan}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                fullWidth
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
              />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Tipo de Préstamo</InputLabel>
                <Select
                  name="typeLoan"
                  value={loan.typeLoan}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
                  <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
                  <MenuItem value="Propiedades Comerciales">
                    Propiedades Comerciales
                  </MenuItem>
                  <MenuItem value="Remodelación">Remodelación</MenuItem>
                </Select>
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
