import { add } from '../src/index';
import { describe, test, expect } from '@jest/globals';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add('')).toBe(0);
  });
});
