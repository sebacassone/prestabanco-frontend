/**
 * Interface for UserObject
 * @interface
 * @property {string} rut - The user's RUT
 * @property {string} phone - The user's phone number
 * @property {string} email - The user's email
 * @property {string} birthday - The user's birthday
 * @property {string} name - The user's name
 * @property {string} firstLastName - The user's first last name
 * @property {string} secondLastName - The user's second last name
 * @property {string} status - The user's status
 * @property {string} typeUser - The user's type
 */
interface user {
  rut: string;
  phone: string;
  email: string;
  birthday: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  password: string;
  status: string;
  typeUser: string;
}

export default user;
