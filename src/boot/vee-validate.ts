import { boot } from 'quasar/wrappers';
import { ru as yupRu } from 'yup-locales';
import { setLocale as yupLocale } from 'yup';

export default boot(() => {
  yupLocale({
    ...yupRu,
    mixed: { required: '${path} - обязательное поле' },
  });
});
