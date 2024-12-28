import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<Section[]>('online_sections.php');
    },
    create(body: EstimateBody) {
      return http.post<CreateEstimateSuccess>('online_selling.php', jsonFormData(body));
    },
    list(body: EstimateListParams = {}) {
      return http.post<EstimateListItem[]>('my_ocenki.php', jsonFormData(body));
    },
    show(id: string | number) {
      return http.get<[ EstimateListItem ]>('online_status.php', {
        params: {
          id,
        }
      })
    },
    sendEvent(body: SendEventBody) {
      return http.post('online_event.php', jsonFormData(body));
    }
  }
}

export interface Section {
  id: string,
  name: string,
}

export interface EstimateBody {
  files: number[],
  section: string,
  desc: string,
}

export interface CreateEstimateSuccess {
  id: number,
}

export interface EstimateListParams {
  status?: Status,
}

export type Status = '1' | '2' | '3';

export interface EstimateListItem {
  id: string,
  comment: string,
  date: string,
  desc: string,
  gallery: string[],
  price: string,
  status: string,
}

export type EventType = '1' | '2' | '3';

export interface SendEventBody {
  id: string,
  event: EventType,
}
