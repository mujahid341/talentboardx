export const logError = (err) => {
  console.error(`[${new Date().toISOString()}]`, err.stack || err.message || err);
};
