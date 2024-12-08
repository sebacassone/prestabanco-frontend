interface DocumentsEntity {
  idDocument: number;
  idRequest: number;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
export default DocumentsEntity;
