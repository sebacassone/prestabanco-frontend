import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import requestService from '../services/request.service';
import ResponseRequestUser from '../interfaces/ResponseRequestUser';

const ExecutiveView: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<ResponseRequestUser[]>([]);
  const [verCredito, setVerCredito] = useState<number | null>(null);

  useEffect(() => {
    requestService
      .getAllRequests()
      .then((response) => {
        setSolicitudes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, []);

  const handleAceptar = (id: number) => {
    requestService.updateState('Aceptada', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'Aprobada' }
            : solicitud,
        ),
      );
    });
    setVerCredito(null);
  };

  const handleRechazar = (id: number) => {
    requestService.updateState('Rechazada', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'Rechazada' }
            : solicitud,
        ),
      );
    });
    setVerCredito(null);
  };

  return (
    <div>
      <h1>Solicitudes de Crédito</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id de Solicitud</TableCell>
              <TableCell>Tipo de Préstamo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cuota/Ingreso</TableCell>
              <TableCell>Crédito del Cliente</TableCell>
              <TableCell>Evaluación de Antigüedad</TableCell>
              <TableCell>Deuda/Ingreso</TableCell>
              <TableCell>Monto Máximo de Financiación</TableCell>
              <TableCell>Edad del Solicitante</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.idRequest}>
                <TableCell>{solicitud.idRequest}</TableCell>
                <TableCell>{solicitud.typeLoan}</TableCell>
                <TableCell>{solicitud.stateRequest}</TableCell>
                {solicitud.stateRequest === 'En evaluación' ? (
                  <>
                    <TableCell>
                      {solicitud.evaluations?.quotaIncomeRatio ? 'Sí' : 'No'}
                    </TableCell>
                    <TableCell>
                      {solicitud.evaluations?.customerCredit ? 'Sí' : 'No'}
                    </TableCell>
                    <TableCell>
                      {solicitud.evaluations?.seniorityEvaluation ? 'Sí' : 'No'}
                    </TableCell>
                    <TableCell>
                      {solicitud.evaluations?.debtIncomeRatio ? 'Sí' : 'No'}
                    </TableCell>
                    <TableCell>
                      {solicitud.evaluations?.maximumFinancingAmount
                        ? 'Sí'
                        : 'No'}
                    </TableCell>
                    <TableCell>
                      {solicitud.evaluations?.ageApplicant ? 'Sí' : 'No'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAceptar(solicitud.idRequest)}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRechazar(solicitud.idRequest)}
                        style={{ marginLeft: '10px' }}
                      >
                        Rechazar
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell colSpan={6}></TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {verCredito && (
        <Dialog
          open={true}
          onClose={() => setVerCredito(null)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Detalle del Crédito</DialogTitle>
          <DialogContent>
            {/* Aquí puedes agregar más información sobre el crédito */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleAceptar(verCredito)} color="primary">
              Aceptar Crédito
            </Button>
            <Button
              onClick={() => handleRechazar(verCredito)}
              color="secondary"
            >
              Rechazar Crédito
            </Button>
            <Button onClick={() => setVerCredito(null)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ExecutiveView;
