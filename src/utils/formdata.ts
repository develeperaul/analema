export function jsonFormData<T extends Record<string, any>>(json: T) {
  const formData = new FormData();
  for(let key in json) {
    formData.append(key, json[key]);
  }
  return formData;
}
