import httpClient from '../http-common';

const downloadDocument = (idDocument: number) =>
  httpClient.get(`/api/v1/documents/download/${idDocument}`, {
    responseType: 'blob', // Importante para manejar archivos binarios
  });

const getDocumentsByRequestId = (idRequest: number) =>
  httpClient.get(`/api/v1/documents/get-document-by-id-request/${idRequest}`);

const uploadDocuments = (idRequest: number, formData: FormData) => {
  httpClient.post(`/api/v1/documents/upload/${idRequest}`, formData);
};

export default { downloadDocument, getDocumentsByRequestId, uploadDocuments };
