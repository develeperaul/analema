import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<Section[]>('catalog_sec.php');
    },
    showSubSections(sectionId: string | number) {
      return http.get<Section[]>('catalog_subsec.php', {
        params: {
          id: sectionId,
        },
      });
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
    listPag(sectionId: string | number | null, params: PagParams) {
      return http.get<CatalogPag>('catalog_list_p.php', {
        params: {
          id: sectionId,
          nTopCount: 0,
          nPageSize: params.nPageSize,
          nOffset: params.nOffset,
          sort: params.sort,
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

export interface PagParams {
  nPageSize: number,
  nOffset: number,
  sort?: '1' | '2',
}

export type CatalogPag = [
  {
    total: number,
    items: CatalogItem[],
  }
]

export interface Section {
  id: string,
  name: string,
  img: string | null,
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
