import validator from 'validator';

export const isValidEmployeeId = (id: string) => /^UI[a-zA-Z0-9]{7}$/.test(id);
export const isValidPhone = (p: string) => /^[89]\d{7}$/.test(p);
export const isValidEmail = (e: string) => validator.isEmail(e);
export const isValidName = (n: string) => typeof n === 'string' && n.length >= 6 && n.length <= 10;
