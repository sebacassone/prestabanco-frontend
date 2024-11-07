import EvaluationsResponse from './EvaluationsResponse';
import LoansReponse from './LoansResponse';

interface ResponseRequestUser {
  idRequest: number;
  stateRequest: string;
  typeLoan: string;
  documentsRequired?: string[];
  evaluations?: EvaluationsResponse;
  loanRequest?: LoansReponse;
}

export default ResponseRequestUser;
