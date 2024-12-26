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
