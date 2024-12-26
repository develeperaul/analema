import { string } from 'yup';

export const createEstimateSchema = {
  desc: string().required(),
};
