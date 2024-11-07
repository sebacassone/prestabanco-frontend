export interface LoansReponse {
  idLoan: number;
  amountLoan: number;
  dateConcession: string; // Assuming the date will be in string format based on the pattern provided
  typeLoan: string;
  numberOfPaymentsLoan: number;
  quotaLoan: number;
  stateLoan: string;
  interestLoan: number;
  administrationAmountLoan: number;
  totalAmountLoan: number;
  secureAmountLoan: number;
  maximumAmountPercentageLoan: number;
}

export default LoansReponse;
