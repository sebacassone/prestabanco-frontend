import { AxiosResponse } from 'axios';
import httpClient from '../http-common';
import user from '../interfaces/UserObject';
import ResponseUser from '../interfaces/ResponseUser';
import UserResponse from '../interfaces/ResponseUser';

const create = (
  data: user,
  idAddress: number,
): Promise<AxiosResponse<ResponseUser>> => {
  const payload = {
    rutUser: data.rut,
    phoneUser: data.phone,
    emailUser: data.email,
    birthdayUser: data.birthday,
    nameUser: data.name,
    firstLastnameUser: data.firstLastName,
    secondLastNameUser: data.secondLastName,
    passwordUser: data.password,
    statusUser: data.status,
    typeUser: data.typeUser,
    idAddress: idAddress,
  };
  console.log(payload);
  return httpClient.post<UserResponse>('/api/v1/user/register-user', payload);
};

const login = (data: any): Promise<AxiosResponse<ResponseUser>> => {
  const payload = {
    rutUser: data.rut,
    passwordUser: data.password,
  };
  return httpClient.post<UserResponse>('/api/v1/user/login', payload);
};

export default {
  create,
  login,
};
