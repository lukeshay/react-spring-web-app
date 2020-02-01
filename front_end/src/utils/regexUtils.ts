export const validEmail = (email: string): boolean =>
  email !== null &&
  email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null;

export const containsLowercase = (str: string): boolean =>
  str !== null && str.match(/[a-z]/g) !== null;

export const containsUppercase = (str: string): boolean =>
  str !== null && str.match(/[A-Z]/g) !== null;

export const containsNumber = (str: string): boolean =>
  str !== null && str.match(/[0-9]/g) !== null;

export const containsSpecialCharacter = (str: string): boolean =>
  str !== null && str.match(/[!@#$%^&*)(+=._-]/g) !== null;

export const containsOnlyNumbers = (str: string): boolean =>
  str !== null &&
  !containsLowercase(str) &&
  !containsUppercase(str) &&
  !containsSpecialCharacter(str);
