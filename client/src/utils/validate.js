export const isNumber = (num) => {
  if (num === undefined) {
    return false;
  }
  if (num === null) {
    return false;
  }
  if (num === '') {
    return false;
  }
  return true;
};

export const isEmail = (email) => {
  const splittedEmail = email.split('@');
  if (splittedEmail.length !== 2) {
    return false;
  }
  if (splittedEmail[0].length === 0) {
    return false;
  }
  if (splittedEmail[1].length === 0) {
    return false;
  }
  return true;
};
