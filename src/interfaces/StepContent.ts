import User from './UserObject';
import Address from './AddressObject';
import Job from './JobObject';

interface StepContentProps {
  step: number;
  user: User;
  address: Address;
  job: Job;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default StepContentProps;