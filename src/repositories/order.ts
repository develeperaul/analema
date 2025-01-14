import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    create(body: OrderCreateBody) {
      return http.post('create_order.php', jsonFormData(body));
    },
    showPoints() {
      return http.get<Point[]>('points.php');
    },
  }
}

export interface OrderCreateBody {
  name: string,
  last_name: string,
  phone: string,
  email: string,
  delivery: '2' |'3',
  payment: '2' |'5',
  point: string,
  address: string,
  date: string,
  time: string,
  tovars: Product[],
}

export interface Product {
  id: string,
  kol: number,
}

export interface Point {
  id: string,
  address: string,
  city: string,
  geo: string,
}
