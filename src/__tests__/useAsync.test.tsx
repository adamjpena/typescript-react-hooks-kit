import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import useAsync from '../hooks/useAsync';

describe('useAsync', () => {
  it('should return data after a successful async operation', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('Success');

    await act(async () => {
      render(<TestComponent asyncFunction={asyncFunction} />);
    });

    await act(async () => {
      await asyncFunction();
    });

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('should handle errors in async operation', async () => {
    const asyncFunction = jest.fn().mockRejectedValue(new Error('Failure'));

    await act(async () => {
      render(<TestComponent asyncFunction={asyncFunction} />);
    });

    await act(async () => {
      try {
        await asyncFunction();
      } catch {}
    });

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Error: Failure')).toBeInTheDocument();
  });
});

const TestComponent = ({
  asyncFunction,
}: {
  asyncFunction: () => Promise<string>;
}) => {
  const { loading, error, value } = useAsync(asyncFunction);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{`Error: ${error.message}`}</span>;
  }

  return <span>{value}</span>;
};
