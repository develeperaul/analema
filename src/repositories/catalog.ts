import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<Section[]>('catalog_sec.php');
    },
    show(id: string | number) {
      return http.get('catalog_element.php', {
        params: {
          id,
        }
      });
    },
    list(sectionId: string | number) {
      return http.get('catalog_element.php', {
        params: {
          id: sectionId,
        }
      });
    }
  }
}

export interface Section {
  id: string,
  name: string,
}
