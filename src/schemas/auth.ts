import { string } from 'yup';

export const loginSchema = {
  phone: string().required(),
};
