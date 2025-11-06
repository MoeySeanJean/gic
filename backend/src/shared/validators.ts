import validator from 'validator';

export const isValidEmployeeId = (id: string) => /^UI[a-zA-Z0-9]{7}$/.test(id);
export const isValidPhone = (phone: string) => /^[89]\d{7}$/.test(phone);
export const isValidEmail = (email: string) => validator.isEmail(email);
export const isValidName = (name: string) => typeof name === 'string' && name.length >= 6 && name.length <= 10;
export const isValidDescription = (description: string) => typeof description === 'string' && description.length <= 256;
export const isValidStartDate = (startDate: string) => !isNaN(Date.parse(startDate));
