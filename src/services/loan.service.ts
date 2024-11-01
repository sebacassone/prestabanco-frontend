import httpClient from '../http-common';
import LeanState from '../interfaces/LoanObject';
import { formatDate } from '../utils/functions/ValidateDate';

const calculate = (data: LeanState) => {
  data.dateConcession = formatDate(data.dateConcession);
  console.log('Data:', data);
  return httpClient.post('/api/v1/loans/calculate-loan', data);
};

const save = (data: LeanState) => {
  return httpClient.post('/api/v1/loans/save-loan', data);
};

export default { calculate, save };
