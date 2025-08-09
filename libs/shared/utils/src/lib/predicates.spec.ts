import { describe, it, expect } from 'vitest';
import {
  isString,
  isNonEmptyString,
  isEmptyOrWhitespaceString,
  isMeaningfulString,
} from './predicates';

describe('predicates', () => {
  describe('isString', () => {
    it('should return true for string values', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString('123')).toBe(true);
      expect(isString('   ')).toBe(true);
    });

    it('should return false for non-string values', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString(false)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(
        isString(function test() {
          return 'test';
        }),
      ).toBe(false);
      expect(isString(Symbol('test'))).toBe(false);
    });

    it('should work as a type guard', () => {
      const value: unknown = 'hello';
      if (isString(value)) {
        // TypeScript should infer value as string here
        expect(value.toUpperCase()).toBe('HELLO');
      }
    });
  });

  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString('a')).toBe(true);
      expect(isNonEmptyString('   ')).toBe(true); // whitespace is not empty
      expect(isNonEmptyString('123')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
    });

    it('should return false for non-string values', () => {
      expect(isNonEmptyString(123)).toBe(false);
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString([])).toBe(false);
      expect(isNonEmptyString({})).toBe(false);
    });

    it('should work as a type guard', () => {
      const value: unknown = 'hello';
      if (isNonEmptyString(value)) {
        // TypeScript should infer value as string here
        expect(value.charAt(0)).toBe('h');
      }
    });
  });

  describe('isEmptyOrWhitespaceString', () => {
    it('should return true for empty strings', () => {
      expect(isEmptyOrWhitespaceString('')).toBe(true);
    });

    it('should return true for whitespace-only strings', () => {
      expect(isEmptyOrWhitespaceString(' ')).toBe(true);
      expect(isEmptyOrWhitespaceString('   ')).toBe(true);
      expect(isEmptyOrWhitespaceString('\t')).toBe(true);
      expect(isEmptyOrWhitespaceString('\n')).toBe(true);
      expect(isEmptyOrWhitespaceString('\r\n')).toBe(true);
      expect(isEmptyOrWhitespaceString(' \t\n ')).toBe(true);
    });

    it('should return false for strings with meaningful content', () => {
      expect(isEmptyOrWhitespaceString('hello')).toBe(false);
      expect(isEmptyOrWhitespaceString(' hello ')).toBe(false);
      expect(isEmptyOrWhitespaceString('a')).toBe(false);
      expect(isEmptyOrWhitespaceString('123')).toBe(false);
    });

    it('should return false for non-string values', () => {
      expect(isEmptyOrWhitespaceString(123)).toBe(false);
      expect(isEmptyOrWhitespaceString(null)).toBe(false);
      expect(isEmptyOrWhitespaceString(undefined)).toBe(false);
      expect(isEmptyOrWhitespaceString([])).toBe(false);
      expect(isEmptyOrWhitespaceString({})).toBe(false);
    });
  });

  describe('isMeaningfulString', () => {
    it('should return true for strings with meaningful content', () => {
      expect(isMeaningfulString('hello')).toBe(true);
      expect(isMeaningfulString(' hello ')).toBe(true);
      expect(isMeaningfulString('a')).toBe(true);
      expect(isMeaningfulString('123')).toBe(true);
      expect(isMeaningfulString('\thello\n')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isMeaningfulString('')).toBe(false);
    });

    it('should return false for whitespace-only strings', () => {
      expect(isMeaningfulString(' ')).toBe(false);
      expect(isMeaningfulString('   ')).toBe(false);
      expect(isMeaningfulString('\t')).toBe(false);
      expect(isMeaningfulString('\n')).toBe(false);
      expect(isMeaningfulString('\r\n')).toBe(false);
      expect(isMeaningfulString(' \t\n ')).toBe(false);
    });

    it('should return false for non-string values', () => {
      expect(isMeaningfulString(123)).toBe(false);
      expect(isMeaningfulString(null)).toBe(false);
      expect(isMeaningfulString(undefined)).toBe(false);
      expect(isMeaningfulString([])).toBe(false);
      expect(isMeaningfulString({})).toBe(false);
    });

    it('should work as a type guard', () => {
      const value: unknown = ' hello ';
      if (isMeaningfulString(value)) {
        // TypeScript should infer value as string here
        expect(value.trim().toUpperCase()).toBe('HELLO');
      }
    });
  });
});
