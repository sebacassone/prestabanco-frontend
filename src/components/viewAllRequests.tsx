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
  Typography,
} from '@mui/material';
import requestService from '../services/request.service';
import ResponseRequestUser from '../interfaces/ResponseRequestUser';
import ExecutiveView from './ExecutiveView';
import documentService from '../services/document.service';

const ViewAllRequests: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<ResponseRequestUser[]>([]);
  const [verCredito, setVerCredito] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [openDocsDialog, setOpenDocsDialog] = useState(false);
  const [docsForRequest, setDocsForRequest] = useState<
    { id: number; name: string; url: string }[]
  >([]);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      console.log('Fetching requests...');
      const response = await requestService.getAllRequests();
      console.log('Response received:', response);
      setSolicitudes(response.data);
      console.log('Solicitudes:', response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleStateUpdate = async (id: number, newState: string) => {
    setIsLoading(true);
    try {
      await requestService.updateState(newState, id);
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.idRequest === id
            ? { ...solicitud, stateRequest: newState }
            : solicitud,
        ),
      );
    } catch (error) {
      console.error('Error updating request:', error);
    } finally {
      setIsLoading(false);
      setVerCredito(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleFileUpload = async (id: number) => {
    if (!selectedFiles) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file);
    });

    try {
      await documentService.uploadDocuments(id, formData);
      alert('Documentos subidos con éxito');
      await handleStateUpdate(id, 'Aprobado');
    } catch (error) {
      alert('Error al subir documentos');
      console.error('Error uploading document:', error);
    } finally {
      setSelectedFiles(null);
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

      // Limpiar recursos
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
  };

  return (
    <div>
      <ExecutiveView />
      <h1>Solicitudes de Crédito</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id de Solicitud</TableCell>
              <TableCell>Tipo de Préstamo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Documentos</TableCell>
              <TableCell>Cuota/Ingreso</TableCell>
              <TableCell>Historial Crediticio del Cliente</TableCell>
              <TableCell>Evaluación de Antigüedad</TableCell>
              <TableCell>Deuda/Ingreso</TableCell>
              <TableCell>Monto Máximo de Financiación</TableCell>
              <TableCell>Edad del Solicitante</TableCell>
              <TableCell>Capacidad de Ahorro</TableCell>
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
                  {[
                    'En evaluación',
                    'Pre-Aprobada',
                    'Aprobada',
                    'En Desembolso',
                    'Solicitud Aprobada y Desembolsada',
                  ].includes(solicitud.stateRequest) && (
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDocuments(solicitud.idRequest)}
                    >
                      Ver Documentos
                    </Button>
                  )}
                  {solicitud.stateRequest === 'En Aprobación Final' && (
                    <>
                      <input type="file" multiple onChange={handleFileChange} />
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.quotaIncomeRatio ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.customerCredit ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.seniorityEvaluation ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.debtIncomeRatio ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.maximumFinancingAmount ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>
                  {solicitud.evaluation?.ageApplicant ? 'Sí' : 'No'}
                </TableCell>
                <TableCell>Sí</TableCell>
                <TableCell>
                  {solicitud.stateRequest === 'En evaluación' ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleStateUpdate(solicitud.idRequest, 'Preaprobada')
                        }
                        disabled={isLoading}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleStateUpdate(solicitud.idRequest, 'Rechazada')
                        }
                        disabled={isLoading}
                        style={{ marginLeft: '10px' }}
                      >
                        Rechazar
                      </Button>
                    </>
                  ) : solicitud.stateRequest === 'En Aprobación Final' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFileUpload(solicitud.idRequest)}
                      disabled={isLoading}
                    >
                      Enviar
                    </Button>
                  ) : solicitud.stateRequest === 'Aprobado' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleStateUpdate(solicitud.idRequest, 'En Desembolso')
                      }
                      disabled={isLoading}
                    >
                      En Desembolso
                    </Button>
                  ) : solicitud.stateRequest === 'En Desembolso' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleStateUpdate(
                          solicitud.idRequest,
                          'Solicitud Aprobada y Desembolsada',
                        )
                      }
                      disabled={isLoading}
                    >
                      Completar Desembolso
                    </Button>
                  ) : null}
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
            <Button
              onClick={() => handleStateUpdate(verCredito, 'Aprobado')}
              color="primary"
            >
              Aceptar Crédito
            </Button>
            <Button
              onClick={() => handleStateUpdate(verCredito, 'Rechazada')}
              color="secondary"
            >
              Rechazar Crédito
            </Button>
            <Button onClick={() => setVerCredito(null)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
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
          <Button onClick={() => setOpenDocsDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewAllRequests;
