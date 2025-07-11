import type { UploadedSuccess } from 'src/repositories/files';
import type { SearchBaseItem } from 'src/repositories/neiro-catalog';


export interface NeiroForm {
  uploadedFiles: UploadedSuccess[],
  activeProduct: SearchBaseItem | null,
  freeFlow: string,
  rewhatsapp: string,
  recall: string,
  neiro_add_value: string,
  neiro_add_metall: string,
  neiro_add_brilliant: string,
  neiro_add_proba: string,
};
