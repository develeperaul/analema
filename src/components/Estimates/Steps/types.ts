import { SearchAltItem, SearchBaseItem } from 'src/repositories/neiro-catalog';

export type ActiveProduct = (SearchBaseItem & { type: 'base' }) | (SearchAltItem & { type: 'alt' });
