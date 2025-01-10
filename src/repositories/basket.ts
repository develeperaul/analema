import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    show(ids: string[]) {
      return http.get('basket.php', {
        params: {
          goods: ids,
        }
      });
    }
  }
}
