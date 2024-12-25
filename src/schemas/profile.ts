import { string } from 'yup';

export const profileSchema = {
  name: string().required(),
  last_name: string().required(),
  otch: string(),
  db: string(),
  email: string().email(),
};
