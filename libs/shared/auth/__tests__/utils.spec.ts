/**
 * Unit tests for utils
 */
import * as utils from '../src/lib/utils';

describe('utils', () => {
  it('should export functions', () => {
    expect(typeof utils.buildApiUrl).toBe('function');
    expect(typeof utils.formatAuthError).toBe('function');
  });

  // Add more tests for each utility
});
