// utils/customError.js
export const createError = (message, status = 400) => {
  const err = new Error(message);
  err.status = status;
  return err;
};
