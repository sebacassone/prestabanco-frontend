import AddressResponse from '../interfaces/ResponseAddress';
import httpClient from '../http-common';
import address from '../interfaces/AddressObject';
import { AxiosResponse } from 'axios';

const create = (data: address): Promise<AxiosResponse<AddressResponse>> => {
  const payload = {
    streetAddress: data.street,
    numberAddress: data.number,
    communeAddress: data.commune,
    regionAddress: data.region,
    countryAddress: data.country,
  };
  return httpClient.post<AddressResponse>(
    '/api/v1/address/register-address',
    payload,
  );
};

export default {
  create,
};
