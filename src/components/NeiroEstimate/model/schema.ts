import { string } from 'yup';

export const schema = {
  neiro_add_metall: string().required().label('Металл'),
  neiro_add_brilliant: string().required().label('Бриллианты'),
  neiro_add_proba: string().required().label('Проба'),
  neiro_add_value: string().required('Обязательное поле'),
};
