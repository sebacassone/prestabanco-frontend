import { AxiosResponse } from 'axios';
import httpClient from '../http-common';
import ResponseRequest from '../interfaces/ResponseRequest';
import ResponseRequestUser from '../interfaces/ResponseRequestUser';

const create = (
  data: string,
  idLean: number,
  idUser: number,
): Promise<AxiosResponse<ResponseRequest>> => {
  const payload = {
    stateRequest: data,
    leanRequest: idLean,
    userRequest: idUser,
  };
  return httpClient.post<ResponseRequest>(
    '/api/v1/requests/save-request',
    payload,
  );
};

const getRequests = (
  idUser: number,
): Promise<AxiosResponse<ResponseRequestUser[]>> => {
  return httpClient.get<ResponseRequestUser[]>(
    `/api/v1/requests/get-request/${idUser}`,
  );
};

const updateState = (
  data: string,
  idRequest: number,
): Promise<AxiosResponse<ResponseRequest>> => {
  const payload = {
    stateRequest: data,
  };
  return httpClient.put<ResponseRequest>(
    `/api/v1/requests/update-state-request/${idRequest}`,
    payload,
  );
};

const getAllRequests = (): Promise<AxiosResponse<ResponseRequestUser[]>> => {
  return httpClient.get<ResponseRequestUser[]>(
    '/api/v1/requests/get-all-requests',
  );
};

export default { create, getRequests, updateState, getAllRequests };
