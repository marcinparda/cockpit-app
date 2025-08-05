export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.warn(`[WARNING] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (['development'].includes(import.meta.env['MODE'])) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
};
