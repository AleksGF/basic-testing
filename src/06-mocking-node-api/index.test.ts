import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

const callback = jest.fn();
const timeout = 1000;
const interval = 20;

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2 - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(timeout / interval);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'testFile.txt';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    expect(path.join).not.toHaveBeenCalled();

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalled();
    expect(path.join).toHaveBeenCalledTimes(1);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValueOnce(false);

    expect(await readFileAsynchronously(pathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from('test'));

    expect(await readFileAsynchronously(pathToFile)).toBe('test');
  });
});
