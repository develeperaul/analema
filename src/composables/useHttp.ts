import { httpKey } from 'src/boot/api';
import { inject } from 'vue';

export default function() {
  const http = inject(httpKey);
  if(!http) throw new Error('Модуль http не найден');
  return http;
}
