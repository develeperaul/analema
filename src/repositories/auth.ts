import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    sendCode(body: SendCodeBody) {
      return http.post('auth.php', jsonFormData(body));
    },
    verifyCode(body: VerifyCodeBody) {
      return http.post('token.php', jsonFormData(body));
    },
  }
}

export interface SendCodeBody {
  phone: string,
}

export interface VerifyCodeBody {
  phone: string,
  kod: string,
}
