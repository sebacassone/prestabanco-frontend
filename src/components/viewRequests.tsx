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
  Box,
} from '@mui/material';
import ClientView from './ClientView';
import requestService from '../services/request.service';
import ResponseRequestUser from '../interfaces/ResponseRequestUser';
import evaluationService from '../services/evaluation.service';
import loanService from '../services/loan.service';
import LoansReponse from '../interfaces/LoansResponse';

const ViewRequests: React.FC = () => {
  const [idUser, setIdUser] = useState<number>(0);
  const [solicitudes, setSolicitudes] = useState<ResponseRequestUser[]>([]);
  const [documentos, setDocumentos] = useState<{
    [key: number]: { [key: string]: File | null };
  }>({});
  const [verCredito, setVerCredito] = useState<number | null>(null);
  const [, setLoan] = useState<LoansReponse[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIdUser(JSON.parse(storedUser).idUser);
    }
  }, []);

  useEffect(() => {
    if (idUser !== 0) {
      requestService.getRequests(idUser).then((response) => {
        setSolicitudes(response.data);
        response.data.forEach((solicitud) => {
          console.log('Solicitud:', solicitud);
          loanService.getLoans(solicitud.idRequest).then((response) => {
            setLoan(response.data);
          });
        });
      });
    }
  }, [idUser]);

  const handleFileChange = (
    id: number,
    tipo: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setDocumentos((prevDocs) => ({
      ...prevDocs,
      [id]: {
        ...prevDocs[id],
        [tipo]: file,
      },
    }));
  };

  const handleEnviar = (id: number) => {
    console.log('Documentos enviados:', documentos[id]);

    if (documentos[id]) {
      const formData = new FormData();
      Object.entries(documentos[id]).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Update the state to 'En evaluación' and make the evaluation
      requestService.updateState('En evaluación', id).then((response) => {
        console.log('Solicitud enviada:', response.data);
        setSolicitudes((prevSolicitudes) =>
          prevSolicitudes.map((solicitud) =>
            solicitud.idRequest === id
              ? { ...solicitud, stateRequest: 'En evaluación' }
              : solicitud,
          ),
        );
      });

      // Make the evaluation
      const solicitud = solicitudes.find((sol) => sol.idRequest === id);
      if (solicitud) {
        evaluationService
          .makeEvaluation(
            idUser,
            solicitud.loanRequest?.quotaLoan ?? 0,
            solicitud.loanRequest?.maximumAmountPercentageLoan ?? 0,
            solicitud.typeLoan,
          )
          .then((response) => {
            console.log('Evaluación realizada:', response.data);
          })
          .catch((error) => {
            console.error('Error al realizar la evaluación:', error);
          });
      }
    }
  };

  const handleAceptar = (id: number) => {
    requestService.updateState('Aceptada', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'Aprobado' }
            : solicitud,
        ),
      );
    });

    setVerCredito(null);
  };

  const handleCancelar = (id: number) => {
    requestService.updateState('Aceptada', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'Cancelado por el cliente' }
            : solicitud,
        ),
      );
    });

    setVerCredito(null);
  };

  return (
    <div>
      <ClientView />
      <h1>Solicitudes de Crédito</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id de Solicitud</TableCell>
              <TableCell>Tipo de Préstamo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.idRequest}>
                <TableCell>{solicitud.idRequest}</TableCell>
                <TableCell>{solicitud.typeLoan}</TableCell>
                <TableCell>{solicitud.stateRequest}</TableCell>
                <TableCell>
                  {solicitud.stateRequest === 'Pendiente de Documentación' && (
                    <Box display="flex" justifyContent="space-between">
                      <div>
                        {solicitud.documentsRequired?.map((faltante, index) => (
                          <div
                            key={`${solicitud.idRequest}-${faltante}-${index}`}
                          >
                            <label>{faltante}</label>
                            <input
                              type="file"
                              onChange={(e) =>
                                handleFileChange(
                                  solicitud.idRequest,
                                  faltante,
                                  e,
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEnviar(solicitud.idRequest)}
                      >
                        Enviar
                      </Button>
                    </Box>
                  )}
                  {solicitud.stateRequest === 'Preaprobada' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setVerCredito(solicitud.idRequest)}
                    >
                      Ver Crédito
                    </Button>
                  )}
                </TableCell>
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
              onClick={() => handleCancelar(verCredito)}
              color="secondary"
            >
              Cancelar Crédito
            </Button>
            <Button onClick={() => setVerCredito(null)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ViewRequests;
