import { AxiosResponse } from 'axios';
import httpClient from '../http-common';
import income from '../interfaces/IncomesObject';
import IncomesResponse from '../interfaces/IncomesResponse';

const create = (
  data: income[],
  idJob: number,
): Promise<AxiosResponse<IncomesResponse>> => {
  const payload = data.map((income) => {
    return {
      amountIncome: income.amount,
      dateIncome: income.date,
      jobIncome: idJob,
    };
  });
  return httpClient.post<IncomesResponse>(
    '/api/v1/incomes/register-incomes',
    payload,
  );
};

export default {
  create,
};
