import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    list() {
      return http.post<NotificationItem[]>('push_list.php');
    },
    readMessage(body: ReadMessageBody) {
      return http.post('push_do_readed.php', jsonFormData(body));
    }
  }
}

export interface NotificationItem {
  date: string
  id: string,
  header: string,
  text: string,
  is_readed: string,
}

export interface ReadMessageBody {
  id: string[],
}
