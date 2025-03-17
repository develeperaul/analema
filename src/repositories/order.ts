import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    create(body: OrderCreateBody) {
      return http.post<OrderCreateSuccess>('create_order.php', jsonFormData(body));
    },
    showPoints() {
      return http.get<Point[]>('points.php');
    },
    list() {
      return http.get<OrderListItem[]>('order_list.php', {
        params: {
          token: true,
        }
      });
    },
    showCities() {
      return http.get<CityItem[]>('citylist.php');
    },
    showBranches(cityId: string | number) {
      return http.get<BranchItem[]>('filials.php', {
        params: {
          id: cityId,
        }
      });
    }
  }
}

export interface OrderListItem {
  name: string,
  id: string,
  img: string,
  price1: string,
  order_id: string,
  order_date: {
    date: string,
    timezone_type: number,
    timezone: string
  },
  payment_url: string,
  kol: string,
  summ: string,
  status: string,
  status_code: string,
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

export type OrderCreateSuccess = ({ payment_url: string })[];

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


export interface CityItem {
  id: string,
  name: string,
}

export interface BranchItem {
  id: string,
  name: string,
}
