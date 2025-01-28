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
    },
    showProducts(ids: string[]) {
      return http.get<CatalogItem[]>('show-products.php', {
        params: {
          goods: ids,
        },
      });
    },
    showPopular() {
      return http.get<PopularProduct[]>('show-popular.php');
    },
    showPersonalSet() {
      return http.get<PersonalSetItem[]>('show-liked.php');
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

export type CatalogShowedProp = string | null;

export interface CatalogShowed {
  gallery: string[],
  id: string,
  id_tp: number,
  name: string,
  img: string | null,
  price: string,
  detail_text: string,
  properties: [ Record<string, CatalogShowedProp> ],
}

export type PopularProduct = Pick<CatalogItem, 'id' | 'img' | 'name' | 'price'>;

export type PersonalSetItem = Omit<CatalogItem, 'id_tp'>;
