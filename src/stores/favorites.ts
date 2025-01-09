import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const ids = ref<string[]>([]);

  function has(id: string) {
    return ids.value.findIndex(i => i === id) !== -1;
  }

  function add(id: string) {
    ids.value.unshift(id);
  }

  function remove(id: string) {
    ids.value = ids.value.filter(i => i !== id);
  }

  function syncStorage() {
    localStorage.setItem('favorites', JSON.stringify(ids.value));
  }

  function init() {
    const res = localStorage.getItem('favorites');
    if(res) {
      try {
        ids.value = JSON.parse(res);
      } catch(e) {
        localStorage.removeItem('favorites');
      }
    }
  }

  function toggle(id: string) {
    if(has(id)) {
      remove(id);
    } else {
      add(id);
    }
    syncStorage();
  }

  return {
    ids,
    has,
    toggle,
    init,
  }
});
