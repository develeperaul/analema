import type { AxiosInstance } from 'axios';
import { jsonFormData } from 'src/utils/formdata';

export default function(http: AxiosInstance) {
  return {
    upload(body: UploadBody) {
      return http.post<[ UploadedSuccess ]>('upload_file.php', jsonFormData(body));
    },
    show(fileId: number) {
      return http.get<FileRes>('get_file.php', {
        params: {
          id: fileId,
        }
      });
    },
  }
}

export interface UploadedSuccess {
  id: number,
  url: string,
};

export interface FileRes {
  url: {
    ID:                  string;
    TIMESTAMP_X:         string;
    MODULE_ID:           string;
    HEIGHT:              string;
    WIDTH:               string;
    FILE_SIZE:           string;
    CONTENT_TYPE:        string;
    SUBDIR:              string;
    FILE_NAME:           string;
    ORIGINAL_NAME:       string;
    DESCRIPTION:         string;
    HANDLER_ID:          null;
    EXTERNAL_ID:         string;
    VERSION_ORIGINAL_ID: string;
    META:                string;
    SRC:                 string;
  }
}

export interface UploadBody {
  photo?: File,
}
