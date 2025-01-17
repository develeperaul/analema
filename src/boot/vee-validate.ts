import { boot } from 'quasar/wrappers';
import { ru as yupRu } from 'yup-locales';
import { setLocale as yupLocale } from 'yup';
import { defineRule } from 'vee-validate';
import { required, min } from '@vee-validate/rules';

export default boot(() => {
  yupLocale({
    ...yupRu,
    mixed: { required: '${path} - обязательное поле' },
  });

  defineRule('required', required);
  defineRule('min', min);
});
