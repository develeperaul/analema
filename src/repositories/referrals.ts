import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    showBalance() {
      return http.get<RefCodeBalance>('get_refcode.php', {
        params: {
          token: true,
        }
      });
    },
    showNewFriends() {
      return http.get<FriendsNewItem[]>('my_new_friends.php', {
        params: {
          token: true,
        }
      });
    },
    showActiveFriends() {
      return http.get<FriendsActiveItem[]>('my_active_friends.php', {
        params: {
          token: true,
        }
      });
    },
    outputMoney(body: OutputMoneyBody) {
      return http.post('get_money.php', jsonFormData(body));
    }
  }
}

export interface RefCodeBalance {
  balance: string,
  code: string,
}

export interface FriendsNewItem {
  login: string,
  status: string,
}

export interface FriendsActiveItem {
  id: string,
  date: string,
  summ: string,
  login: string,
  bitrix_user_id: number
}

export interface OutputMoneyBody {
  sum: string | number,
  card: string,
}
