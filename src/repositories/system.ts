import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    version() {
      return http.get<VersionRes>('version.php');
    }
  }
}

export type VersionRes = [ { min_version: string } ];
