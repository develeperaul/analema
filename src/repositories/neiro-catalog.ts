import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    showSections() {
      return http.get<SectionItem[]>('neiro_catalog_sections.php');
    },
    showSubSections(sectionId: string | number) {
      return http.get<SubSectionItem[]>('neiro_catalog_subsections.php', {
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
    },
    search(sectionId: string | number, str: string) {
      return http.get<SearchRes>('neiro_search.php', {
        params: {
          id: sectionId,
          name: str,
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

export interface SearchBaseItem {
  name: string,
  section_id: string,
  section_name: string,
  id: string,
}

export interface SearchAltItem {
  section_name: string,
  id: string,
}

export type SearchRes = [ { base: SearchBaseItem[], alt: SearchAltItem[] } ];
