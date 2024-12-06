import httpClient from '../http-common';
import { AxiosResponse } from 'axios';
import EvaluationsResponse from '../interfaces/EvaluationsResponse';

const makeEvaluation = (
  idUser: number,
  quotaLoan: number,
  maximumAmount: number,
  typeLoan: string,
): Promise<AxiosResponse<EvaluationsResponse>> => {
  const payload = {
    idUser: idUser,
    quotaLoan: parseFloat(quotaLoan.toString()),
    maximumAmount: parseFloat(maximumAmount.toString()),
    typeLoan: typeLoan,
  };
  console.log('Payload:', payload);
  return httpClient.post<EvaluationsResponse>(
    '/api/v1/evaluations/make-evaluation',
    payload,
  );
};

export default { makeEvaluation };
