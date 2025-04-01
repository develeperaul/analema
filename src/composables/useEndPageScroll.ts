import { onMounted, onUnmounted, type Ref } from 'vue';
//@ts-ignore
import { throttle } from 'throttle-debounce';

export function useEndPageScroll(fn: (...args: any) => any, margin: number = 200, disabled: Ref<boolean>, pending: Ref<boolean>) {
  const _watchScroll = throttle(300, watchScroll);

  onMounted(() => {
    window.addEventListener('scroll', _watchScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', _watchScroll);
  });

  function watchScroll() {
    if(pxToTheBottom() <= margin && !disabled.value && !pending.value) {
      fn();
    }
  }

  function pxToTheBottom() {
    const wh = window.innerHeight;
    const sh = document.body.scrollHeight;
    const y = window.scrollY;
    return sh - y - wh;
  }
}
