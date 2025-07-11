import type { UploadedSuccess } from 'src/repositories/files';
import type { SearchBaseItem } from 'src/repositories/neiro-catalog';


export interface NeiroForm {
  uploadedFiles: UploadedSuccess[],
  activeProduct: SearchBaseItem | null,
  freeFlow: string,
  rewhatsapp: string,
  recall: string,
  neiro_add_value: string,
};
