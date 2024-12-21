import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    update(body: Partial<ProfileData>) {
      return http.post('update_profile.php', jsonFormData(body));
    },
  }
}

export interface ProfileData {
  name: string,
  last_name: string,
  otch: string,
  db: string,
  address: string,
  email: string,
  avatar: File,
}
