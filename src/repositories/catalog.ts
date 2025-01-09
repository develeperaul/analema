import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<Section[]>('catalog_sec.php');
    },
    show(id: string | number) {
      return http.get<[ CatalogShowed ]>('catalog_element.php', {
        params: {
          id,
        }
      });
    },
    list(sectionId: string | number) {
      return http.get<CatalogItem[]>('catalog_list.php', {
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

export interface CatalogItem {
  id: string,
  id_tp: number,
  img: string | null,
  name: string,
  price: string,
}

export interface CatalogShowed {
  gallery: string[],
  id: string,
  id_tp: number,
  name: string,
  img: string | null,
  price: string,
  prop1: string | null,
  prop2: string | null,
  prop3: string | null,
  prop4: string | null,
  prop5: string | null,
  prop6: string | null,
}
