import { AxiosResponse } from 'axios';
import RequestObject from '../interfaces/RequestObject';
import httpClient from '../http-common';
import ResponseRequest from '../interfaces/ResponseRequest';

const create = (
  data: RequestObject,
  idLean: number,
  idUser: number,
): Promise<AxiosResponse<ResponseRequest>> => {
  const payload = {
    typeRequest: data.typeRequest,
    stateRequest: data.stateRequest,
    idLoan: idLean,
    idUser: idUser,
  };
  return httpClient.post<ResponseRequest>(
    '/api/v1/request/create-request',
    payload,
  );
};

export default { create };
