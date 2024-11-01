interface JobResponse {
  idJob: number;
  typeJob: string;
  activityJob: string;
  userJob: {
    idUser: number;
    rutUser: string;
    nameUser: string;
    firstLastNameUser: string;
    secondLastNameUser: string;
    phoneUser: string;
    emailUser: string;
    birthdayUser: string;
    statusUser: string;
    typeUser: string;
  };
}
export default JobResponse;
