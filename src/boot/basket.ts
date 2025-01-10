import { boot } from 'quasar/wrappers';
import { useBasketStore } from 'src/stores/basket';

export default boot(() => {
  const basketStore = useBasketStore();
  basketStore.init();
});
