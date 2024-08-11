import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useFetch from '../hooks/useFetch';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

interface FetchData {
  message: string;
}

const TestComponent = ({ url }: { url: string }) => {
  const { data, loading, error } = useFetch<FetchData>(url);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error: ${error.message}`}</span>;
  return <span>{data?.message}</span>;
};

describe('useFetch', () => {
  it('should return data after a successful fetch', async () => {
    const mockData: FetchData = { message: 'Hello World' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<TestComponent url="https://api.example.com/data" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    render(<TestComponent url="https://api.example.com/error" />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    const errorText = screen.getByText(/Error: Not Found/i);
    expect(errorText).toBeInTheDocument();
  });
});
