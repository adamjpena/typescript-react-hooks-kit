import { renderHook } from '@testing-library/react-hooks';
import useAsync from '../hooks/useAsync';

describe('useAsync', () => {
  it('should return data after a successful async operation', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('Success');
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.value).toBe('Success');
    expect(result.current.error).toBe(null);
  });

  it('should handle errors in async operation', async () => {
    const asyncFunction = jest.fn().mockRejectedValue(new Error('Failure'));
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.value).toBe(null);
    expect(result.current.error?.message).toBe('Failure');
  });
});
