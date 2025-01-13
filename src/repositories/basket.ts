import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    show(ids: string[]) {
      return http.get<BasketItem[]>('basket.php', {
        params: {
          goods: ids,
        }
      });
    }
  }
}

export interface BasketItem {
  id: string,
  img: string | null,
  name: string,
  price: string,
}
