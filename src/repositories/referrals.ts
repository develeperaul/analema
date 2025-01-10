import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showBalance() {
      return http.get<RefCodeBalance>('get_refcode.php', {
        params: {
          token: true,
        }
      });
    },
  }
}

export interface RefCodeBalance {
  balance: string,
  code: string,
}
