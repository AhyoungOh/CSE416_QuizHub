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
