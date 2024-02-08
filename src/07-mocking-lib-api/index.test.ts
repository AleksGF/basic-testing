import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/posts/1';
const mockData = {
  id: 1,
  title: 'title',
  body: 'body',
  userId: 1,
};

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  const throttle = (fn: (arg?: unknown) => unknown | void) => {
    return fn;
  };

  return {
    __esModule: true,
    ...originalModule,
    throttle,
  };
});

jest.mock('axios', () => {
  const originalModule = jest.requireActual<typeof axios>('axios');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn(async () => ({ data: null }));

    jest.spyOn(axios, 'create').mockImplementationOnce((config) => {
      const instance: AxiosInstance = axios.create(config);
      jest.spyOn(instance, 'get').mockImplementation(mockedGet);

      return instance;
    });

    await throttledGetDataFromApi(relativePath);

    expect(mockedGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockedGet = jest.fn(async () => ({ data: mockData }));

    jest.spyOn(axios, 'create').mockImplementationOnce((config) => {
      const instance: AxiosInstance = axios.create(config);
      jest.spyOn(instance, 'get').mockImplementation(mockedGet);

      return instance;
    });

    expect(await throttledGetDataFromApi(relativePath)).toEqual(mockData);
  });
});
