export const phoneTest = [
  'phone',
  'Введите номер в формате +7(111)111-11-11',
  (value?: string) => {
    if(!value) return true;
    const res = /^\+7\s\([0-9]{3}\)\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(value);
    return res;
  },
] as const;

export const emailTest = [
  'custom-email',
  'Пожалуйста, укажите корректный E-mail',
  (value?: string) => {
    if(!value) return true;
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    return res;
  },
] as const;

export const dateTest = [
  'custom-date',
  'Пожалуйста, укажите корректную дату',
  (value?: string) => {
    if(!value) return true;

    const [dayStr, monthStr, yearStr] = value.split('.');

    if(!dayStr || !monthStr || !yearStr) return false;

    const day = parseInt(dayStr);
    const month = parseInt(monthStr);
    const year = parseInt(yearStr);

    if(
      isNaN(day) || day <= 0 ||
      isNaN(month) || month <= 0 || month > 12 ||
      isNaN(year) || year < 1000
    ) {
      return false;
    }

    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthInd = month - 1;

    let daysCount = daysInMonths[monthInd];

    if(monthInd === 1 && isVesokosYear(year)) daysCount = 29;
    if(day > daysCount) return false;
    return true;
  },
] as const;

function isVesokosYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
