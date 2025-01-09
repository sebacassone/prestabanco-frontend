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
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import ClientView from '../ClientView';
import requestService from '../../../services/request.service';
import documentService from '../../../services/document.service';
import evaluationService from '../../../services/evaluation.service';
import ResponseRequestUser from '../../../interfaces/ResponseRequestUser';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { themeColors } from '../../../assets/theme';

const ViewRequests: React.FC = () => {
  const [idUser, setIdUser] = useState<number>(0);
  const [solicitudes, setSolicitudes] = useState<ResponseRequestUser[]>([]);
  const [verCredito, setVerCredito] = useState<ResponseRequestUser | null>(
    null,
  );
  const [documentos, setDocumentos] = useState<{
    [key: number]: { [key: string]: File | null };
  }>({});
  const [openDocsDialog, setOpenDocsDialog] = useState(false);
  const [docsForRequest, setDocsForRequest] = useState<
    { id: number; name: string; url: string }[]
  >([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIdUser(JSON.parse(storedUser).idUser);
    }
  }, []);

  useEffect(() => {
    if (idUser !== 0) {
      requestService.getRequests(idUser).then((response) => {
        console.log(response.data);
        setSolicitudes(response.data);
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

  const handleDownloadDocument = async (idDocument: number) => {
    try {
      const response = await documentService.downloadDocument(idDocument);

      // Crear una URL para descargar el archivo
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal para descargar
      const link = document.createElement('a');
      link.href = url;
      link.download =
        response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || 'document';
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
  };

  const handleEnviar = async (id: number) => {
    if (documentos[id] && Object.values(documentos[id]).some((file) => file)) {
      const formData = new FormData();
      Object.entries(documentos[id]).forEach(([, value]) => {
        if (value) {
          formData.append('files', value); // Nota: 'files' debe coincidir con @RequestParam en el backend
        }
      });

      const solicitud = solicitudes.find((sol) => sol.idRequest === id);
      console.log('solicitud ', solicitud);
      if (solicitud) {
        try {
          const evalResponse = await evaluationService.makeEvaluation(
            idUser,
            solicitud.leanRequest?.quotaLoan ?? 0,
            solicitud.leanRequest?.maximumAmountPercentageLoan ?? 0,
            solicitud.typeLoan,
          );

          await requestService.updateState(
            'En evaluación',
            id,
            evalResponse.data.idEvaluation,
          );
          setSolicitudes((prevSolicitudes) =>
            prevSolicitudes.map((solicitud) =>
              solicitud.idRequest === id
                ? {
                    ...solicitud,
                    stateRequest: 'En evaluación',
                  }
                : solicitud,
            ),
          );
          setSnackbarMessage('Documentos enviados con éxito');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        } catch (error) {
          console.error(
            'Error al realizar la evaluación o actualizar el estado:',
            error,
          );
          setSnackbarMessage('Error al enviar documentos');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }

      try {
        await documentService.uploadDocuments(id, formData);
        alert('Documentos subidos con éxito');
      } catch (error) {
        console.error('Error al subir documentos:', error);
        alert('Error al subir documentos');
      }
    } else {
      setSnackbarMessage('No se ha subido ningún archivo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleViewDocuments = async (id: number) => {
    try {
      const response = await documentService.getDocumentsByRequestId(id);
      const documents = response.data.map((doc: any) => ({
        id: doc.idDocument,
        name: doc.fileName,
        url: `/api/v1/documents/download/${doc.idDocument}`,
      }));
      console.log(documents);
      setDocsForRequest(documents);
      setOpenDocsDialog(true);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  const handleAceptar = (id: number) => {
    requestService.updateState('En Aprobación Final', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'En Aprobación Final' }
            : solicitud,
        ),
      );
      setSnackbarMessage('Solicitud aprobada con éxito');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    });
  };

  const handleCancelar = (id: number) => {
    requestService.updateState('Cancelado por el cliente', id).then(() => {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: 'Cancelado por el cliente' }
            : solicitud,
        ),
      );
      setSnackbarMessage('Solicitud cancelada');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <ClientView />
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3, color: themeColors.primary, marginTop: '2rem' }}
      >
        Solicitudes de Crédito
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id de Solicitud</TableCell>
              <TableCell>Tipo de Préstamo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
              <TableCell>Subir Documentos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.idRequest}>
                <TableCell>{solicitud.idRequest}</TableCell>
                <TableCell>{solicitud.typeLoan}</TableCell>
                <TableCell>{solicitud.stateRequest}</TableCell>
                <TableCell>
                  {[
                    'Preaprobada',
                    'Aprobado',
                    'En Desembolso',
                    'Solicitud Aprobada y Desembolsada',
                  ].includes(solicitud.stateRequest) && (
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDocuments(solicitud.idRequest)}
                      startIcon={<DownloadIcon />}
                      sx={{
                        marginTop: 2,
                        borderColor: themeColors.primary,
                        color: themeColors.primary,
                        '&:hover': {
                          borderColor: themeColors.secondary,
                          color: themeColors.secondary,
                        },
                      }}
                    >
                      Ver Documentos
                    </Button>
                  )}
                  {solicitud.stateRequest === 'Preaprobada' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setVerCredito(solicitud)}
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        marginTop: 2,
                        backgroundColor: themeColors.primary,
                        '&:hover': {
                          backgroundColor: themeColors.secondary,
                        },
                      }}
                    >
                      Ver Crédito
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {solicitud.stateRequest === 'Pendiente de Documentación' && (
                    <Box display="flex" flexDirection="column">
                      {solicitud.documentsRequired?.map(
                        (faltante: string, index: number) => (
                          <div key={index}>
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
                        ),
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEnviar(solicitud.idRequest)}
                        startIcon={<UploadFileIcon />}
                        sx={{
                          marginTop: 2,
                          backgroundColor: themeColors.primary,
                          '&:hover': {
                            backgroundColor: themeColors.secondary,
                          },
                        }}
                      >
                        Enviar
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDocsDialog}
        onClose={() => setOpenDocsDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Documentos de la Solicitud</DialogTitle>
        <DialogContent>
          {docsForRequest.length > 0 ? (
            <ul>
              {docsForRequest.map((doc) => (
                <li key={doc.id}>
                  <Button
                    variant="text"
                    onClick={() => handleDownloadDocument(doc.id)}
                    startIcon={<DownloadIcon />}
                    sx={{
                      color: themeColors.primary,
                      '&:hover': {
                        color: themeColors.secondary,
                      },
                    }}
                  >
                    {doc.name}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No hay documentos disponibles.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDocsDialog(false)}
            sx={{
              color: themeColors.primary,
              '&:hover': {
                color: themeColors.secondary,
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {verCredito && (
        <Dialog
          open={true}
          onClose={() => setVerCredito(null)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Detalle del Crédito</DialogTitle>
          <DialogContent>
            {verCredito.leanRequest && (
              <>
                <Typography variant="h6">Información del Préstamo</Typography>
                <Typography>
                  ID del Préstamo: {verCredito.leanRequest.idLoan}
                </Typography>
                <Typography>
                  Monto del Préstamo: {verCredito.leanRequest.amountLoan}
                </Typography>
                <Typography>
                  Fecha de Concesión: {verCredito.leanRequest.dateConcession}
                </Typography>
                <Typography>
                  Interés del Préstamo: {verCredito.leanRequest.interestLoan}
                </Typography>
                <Typography>
                  Porcentaje Máximo de Financiamiento:{' '}
                  {verCredito.leanRequest.maximumAmountPercentageLoan}
                </Typography>
                <Typography>
                  Número de Pagos: {verCredito.leanRequest.numberOfPaymentsLoan}
                </Typography>
                <Typography>
                  Cuota del Préstamo: {verCredito.leanRequest.quotaLoan}
                </Typography>
                <Typography>
                  Monto Total del Préstamo:{' '}
                  {verCredito.leanRequest.totalAmountLoan}
                </Typography>
                <Typography>
                  Monto del Seguro: {verCredito.leanRequest.secureAmountLoan}
                </Typography>
                <Typography>
                  Monto de Administración:{' '}
                  {verCredito.leanRequest.administrationAmountLoan}
                </Typography>
                <Typography>
                  Tipo de Préstamo: {verCredito.leanRequest.typeLoan}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAceptar(verCredito.idRequest)}
              color="primary"
              variant="contained"
            >
              Aceptar Crédito
            </Button>
            <Button
              onClick={() => handleCancelar(verCredito.idRequest)}
              color="secondary"
              variant="contained"
            >
              Cancelar Crédito
            </Button>
            <Button onClick={() => setVerCredito(null)} variant="outlined">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewRequests;
