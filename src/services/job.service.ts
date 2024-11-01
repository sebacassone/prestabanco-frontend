import { AxiosResponse } from 'axios';
import httpClient from '../http-common';
import Job from '../interfaces/JobObject';
import ResponseJob from '../interfaces/ResponseJob';

const create = (
  data: Job,
  idUser: number,
): Promise<AxiosResponse<ResponseJob>> => {
  const payload = {
    typeJob: data.activity,
    seniorityJob: data.seniorityJob,
    userJob: idUser,
  };
  return httpClient.post<ResponseJob>('/api/v1/jobs/register-job', payload);
};

export default {
  create,
};
