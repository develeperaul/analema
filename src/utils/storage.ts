export function clearUserData() {
  localStorage.removeItem('token');
  localStorage.removeItem('basket');
  localStorage.removeItem('favorites');
}
