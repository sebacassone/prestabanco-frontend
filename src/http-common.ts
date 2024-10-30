import axios from 'axios';

/**
 * This file is used to create a reusable axios instance
 * that can be used to make HTTP requests to the backend server.
 */

const payrollBackendServer: string = import.meta.env
  .VITE_PAYROLL_BACKEND_SERVER;
const payrollBackendPort: number = import.meta.env.VITE_PAYROLL_BACKEND_PORT;

console.log(payrollBackendServer);
console.log(payrollBackendPort);

export default axios.create({
  baseURL: `http://${payrollBackendServer}:${payrollBackendPort}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
