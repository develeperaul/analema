import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<SectionItem[]>('neiro_catalog_sections.php');
    },
    showSubSections(sectionId: string | number) {
      return http.get<SubSectionItem[]>('neiro_catalog_sections.php', {
        params: {
          id: sectionId,
        }
      });
    },
    list(sectionId: string | number) {
      return http.get<CatalogItem[]>('neiro_catalog_elements.php', {
        params: {
          id: sectionId,
        }
      });
    }
  }
}

export interface SectionItem {
  id: string,
  name: string,
  additional: string | null,
}

export interface SubSectionItem {
  id: string,
  name: string,
}

export interface CatalogItem {
  id: string,
  name: string,
}
