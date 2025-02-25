import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    registr(body: RegistrTokenBody) {
      return http.post('fcm.php', jsonFormData(body));
    },
  };
};

interface RegistrTokenBody {
  token_fcm: string,
}
