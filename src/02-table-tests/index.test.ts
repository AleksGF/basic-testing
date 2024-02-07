import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: '2', b: 2, action: Action.Add, expected: null },
  { a: 3, b: undefined, action: Action.Add, expected: null },
];

for (let i = 10; i < 135; i += 3) {
  for (let j = 1; j <= 5; j++) {
    testCases.push({ a: i, b: j, action: Action.Add, expected: i + j });
    testCases.push({ a: i, b: j, action: Action.Subtract, expected: i - j });
    testCases.push({ a: i, b: j, action: Action.Multiply, expected: i * j });
    testCases.push({ a: i * j, b: j, action: Action.Divide, expected: i });
    testCases.push({
      a: i,
      b: j,
      action: Action.Exponentiate,
      expected: i ** j,
    });
  }
}

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
