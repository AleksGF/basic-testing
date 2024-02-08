import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  const values: unknown[] = [
    1,
    'foo',
    true,
    {},
    undefined,
    NaN,
    null,
    0,
    +0,
    -0,
    Infinity,
    -Infinity,
    [],
    [1, 2, 3],
    new Set([1, 2, 3]),
    new Map(),
  ];

  test('should resolve provided value', async () => {
    for (const value of values) {
      expect(await resolveValue(value)).toEqual(value);
    }
  });
});

describe('throwError', () => {
  const msg = 'Error message';

  test('should throw error with provided message', () => {
    expect(() => {
      throwError(msg);
    }).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
