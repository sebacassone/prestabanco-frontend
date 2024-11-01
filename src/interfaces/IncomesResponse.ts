interface IncomesResponse {
  idIncome: number;
  amountIncome: number;
  dateIncome: string;
  jobIncome: {
    idJob: number;
    typeJob: string;
    seniorityJob: string;
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
  };
}

export default IncomesResponse;
