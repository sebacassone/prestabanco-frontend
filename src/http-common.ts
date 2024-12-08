import axios from 'axios';

/**
 * This file is used to create a reusable axios instance
 * that can be used to make HTTP requests to the backend server.
 */

const payrollBackendServer: string = import.meta.env
  .VITE_PAYROLL_BACKEND_SERVER;

console.log(payrollBackendServer);

export default axios.create({
  baseURL: `http://${payrollBackendServer}`,
});
