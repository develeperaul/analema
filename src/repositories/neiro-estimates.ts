import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    create(body: EstimateCreateBody) {
      return http.post<EstimateCreateRes>('online_selling_neiro.php', jsonFormData(body));
    },
    finish(body: EstimateFinishBody) {
      return http.post<void>('online_selling_neiro_result.php', jsonFormData(body));
    }
  }
}

export interface EstimateFinishBody {
  id: string | number,
  next_step: EstimateNextStep,
}

export type EstimateNextStep = '1' | '2' | '3';

export interface EstimateCreateBody {
  files: number[],
  section: string,
  desc: string,
  neiro_el: string,
  neiro_add_type: string,
  neiro_add_value: string,
}

export interface EstimateCreateRes {
  id: number,
  price: number | false,
}
