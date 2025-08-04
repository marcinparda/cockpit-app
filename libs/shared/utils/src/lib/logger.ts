export const logger = {
  debug: (message, ...args) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  warn: (message, ...args) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.warn(`[WARNING] ${message}`, ...args);
    }
  },
  error: (message, ...args) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
};