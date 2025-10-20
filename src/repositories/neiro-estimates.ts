import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    create(body: EstimateCreateBody) {
      return http.post<EstimateCreateRes>('online_selling_neiro.php', jsonFormData(body));
    },
    create2(body: EstimateCreateBody2) {
      return http.post<EstimateCreateRes>('online_selling_neiro.php', jsonFormData(body));
    },
    createWeb(body: EstimateCreateBody) {
      return http.post<EstimateCreateRes>('online_selling_neiro_web.php', jsonFormData(body));
    },
    createWeb2(body: EstimateCreateBody2) {
      return http.post<EstimateCreateRes>('online_selling_neiro_web.php', jsonFormData(body));
    },
    finish(body: EstimateFinishBody) {
      return http.post<void>('online_selling_neiro_result.php', jsonFormData(body));
    },
    showRobotMessage(params: { type: number | string }) {
      return http.get<[ RobotMessage ]>('phazes.php', {
        params: {
          type: params.type,
        },
      });
    },
    assessPhotos(body: AssessPhotosBody) {
      return http.post<AssessSuccessRes>('assessment.php', jsonFormData(body));
    },
  }
}

export interface EstimateFinishBody {
  id: string | number,
  next_step: EstimateNextStep,
  comment?: string,
}

export type EstimateNextStep = '1' | '2' | '3';

export interface EstimateCreateBody {
  files: number[],
  section: string,
  desc: string,
  neiro_el: string,
  neiro_add_type: string,
  neiro_add_value: string,
  recall: string,
  rewhatsapp: string,
  phone?: string,
}
export interface EstimateCreateBody2 {
  neiro_el: string,
  neiro_add_type: string,
  neiro_add_value: string,
  recall: string,
  rewhatsapp: string,
  free_flow: string,
  images: string[],
  neiro_add_metall: string,
  neiro_add_brilliant: string,
  neiro_add_proba: string,
  phone?: string,
}

export interface EstimateCreateRes {
  id: number,
  price: number | false,
}

export type RobotMessage = { text: string };

export type AssessPhotosBody = {
  images: string[],
};

export interface AssessSuccessResItem {
  id?: number,
  debug: string,
  section_id: string,
  section_level: string,
  sostoyanie: string,
  neiro_el: number,
  uvelirka: 1 | 0,
  moneta: 1 | 0,
  name: string,
  price: string,
};

export type AssessSuccessRes = [ AssessSuccessResItem? ];
