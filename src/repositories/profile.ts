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

export type OnOff = '10' | '11';

export interface ProfileDataBody {
  name: string,
  last_name: string,
  otch: string,
  db: string,
  address: string,
  email: string,
  uv_actions: OnOff,
  uv_zak: OnOff,
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
  uv_actions: OnOff,
  uv_zak: OnOff,
}

interface Avatar {
  src: string,
  width: number,
  height: number,
  size: number,
}
