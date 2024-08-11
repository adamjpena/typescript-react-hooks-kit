import React from 'react';
import { render, screen } from '@testing-library/react';
import useMediaQuery from '../hooks/useMediaQuery';

const TestComponent = ({ query }: { query: string }) => {
  const matches = useMediaQuery(query);
  return (
    <span data-testid="media-query-result">
      {matches ? 'Matched' : 'Not Matched'}
    </span>
  );
};

describe('useMediaQuery', () => {
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 1024px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it('should return true when the media query matches', () => {
    render(<TestComponent query="(min-width: 1024px)" />);
    expect(screen.getByTestId('media-query-result').textContent).toBe(
      'Matched',
    );
  });

  it('should return false when the media query does not match', () => {
    (global.matchMedia as jest.Mock).mockImplementation((query) => ({
      matches: query !== '(min-width: 1024px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(<TestComponent query="(min-width: 1024px)" />);
    expect(screen.getByTestId('media-query-result').textContent).toBe(
      'Not Matched',
    );
  });
});
