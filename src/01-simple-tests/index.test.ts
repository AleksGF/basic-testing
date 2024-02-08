import { expect, test } from '@jest/globals';
import { simpleCalculator, Action } from './index';

const numbers = new Array(100)
  .fill(0)
  .map((_, i) => (i % 2 === 0 ? i + 3 : i * 3));

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i] ?? 0;
      const result = simpleCalculator({
        a: number,
        b: i,
        action: Action.Add,
      });
      expect(result).toBe(number + i);
    }
  });

  test('should subtract two numbers', () => {
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i] ?? 0;
      const result = simpleCalculator({
        a: number,
        b: i,
        action: Action.Subtract,
      });
      expect(result).toBe(number - i);
    }
  });

  test('should multiply two numbers', () => {
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i] ?? 0;
      const result = simpleCalculator({
        a: number,
        b: i,
        action: Action.Multiply,
      });
      expect(result).toBe(number * i);
    }
  });

  test('should divide two numbers', () => {
    for (let i = 0; i < numbers.length; i++) {
      const number = (numbers[i] ?? 0) * (i + 1);
      const result = simpleCalculator({
        a: number,
        b: i + 1,
        action: Action.Divide,
      });
      expect(result).toBe(number / (i + 1));
    }
  });

  test('should exponentiate two numbers', () => {
    for (let i = 0; i < numbers.length; i++) {
      for (let exp = 0; exp <= 5; exp++) {
        const number = numbers[i] ?? 0;
        const result = simpleCalculator({
          a: number,
          b: exp,
          action: Action.Exponentiate,
        });
        expect(result).toBe(number ** exp);
      }
    }
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: true, b: 2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: undefined, b: 2, action: Action.Add }),
    ).toBeNull();
  });
});
