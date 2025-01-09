import { boot } from 'quasar/wrappers';
import { useFavoritesStore } from 'src/stores/favorites';

export default boot(() => {
  const favoritesStore = useFavoritesStore();
  favoritesStore.init();
});
