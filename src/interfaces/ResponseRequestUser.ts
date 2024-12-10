import EvaluationsResponse from './EvaluationsResponse';
import LoansReponse from './LoansResponse';

interface ResponseRequestUser {
  idRequest: number;
  stateRequest: string;
  typeLoan: string;
  documentsRequired?: string[];
  evaluation?: EvaluationsResponse;
  loan?: LoansReponse;
}

export default ResponseRequestUser;
