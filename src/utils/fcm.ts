export function set(value: string) {
  localStorage.setItem('pushToken', value);
}

export function get() {
  return localStorage.getItem('pushToken');
}

export function remove() {
  localStorage.removeItem('pushToken');
}
