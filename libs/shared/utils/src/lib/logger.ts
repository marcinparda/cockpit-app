import { environments } from './environments/environments';

export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (['development'].includes(environments.mode)) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (['development'].includes(environments.mode)) {
      console.warn(`[WARNING] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (['development'].includes(environments.mode)) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
};
