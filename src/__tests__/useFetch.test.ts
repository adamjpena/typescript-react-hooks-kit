import { renderHook } from '@testing-library/react-hooks';
import useFetch from '../hooks/useFetch';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('useFetch', () => {
  it('should return data after a successful fetch', async () => {
    const mockData = { message: 'Hello World' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<{ message: string }>('https://api.example.com/data'),
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/error'),
    );

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(new Error('Error: Not Found'));
  });
});
