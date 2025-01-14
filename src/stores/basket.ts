import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basketStore', () => {
  const ids = ref<string[]>([]);

  const count = computed(() => {
    return ids.value.length;
  });

  function has(id: string) {
    return ids.value.findIndex(i => i === id) !== -1;
  }

  function add(id: string) {
    ids.value.unshift(id);
  }

  function remove(id: string) {
    ids.value = ids.value.filter(i => i !== id);
  }

  function removeSync(id: string) {
    remove(id);
    syncStorage();
  }

  function clearSync() {
    ids.value = [];
    syncStorage();
  }

  function toggle(id: string) {
    if(has(id)) {
      remove(id);
    } else {
      add(id);
    }
    syncStorage();
  }

  function syncStorage() {
    localStorage.setItem('basket', JSON.stringify(ids.value));
  }

  function init() {
    const res = localStorage.getItem('basket');
    if(res) {
      try {
        ids.value = JSON.parse(res);
      } catch(e) {
        localStorage.removeItem('basket');
      }
    }
  }

  return {
    ids,
    count,
    init,
    syncStorage,
    has,
    toggle,
    removeSync,
    clearSync,
  }
});
