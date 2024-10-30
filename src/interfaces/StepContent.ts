import User from './UserObject';
import Address from './AddressObject';
import Job from './JobObject';

/**
 * Interface for StepContentProps
 * @interface
 * @property {number} step - The current step
 * @property {User} user - The user's information
 * @property {Address} address - The user's address
 * @property {Job} job - The user's job
 * @property {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} handleChange - The function that handles the change event
 */
interface StepContentProps {
  step: number;
  user: User;
  address: Address;
  job: Job;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default StepContentProps;
