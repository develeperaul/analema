import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    show() {
      return http.post<ProfileData>('profile.php');
    },
    update(body: Partial<ProfileDataBody>) {
      return http.post('update_profile.php', jsonFormData(body));
    },
  }
}

export interface ProfileDataBody {
  name: string,
  last_name: string,
  otch: string,
  db: string,
  address: string,
  email: string,
}

export interface ProfileData {
  opt: number,
  name: string,
  phone: string,
  last_name: string,
  otch: string,
  db: string,
  address: string,
  email: string,
  avatar: Avatar,
}

interface Avatar {
  src: string,
  width: number,
  height: number,
  size: number,
}
