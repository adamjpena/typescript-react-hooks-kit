import { fireEvent, render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import useOnClickOutside from '../hooks/useOnClickOutside';

const TestComponent = ({ handler }: { handler: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handler);

  return (
    <div>
      <div ref={ref}>Inside</div>
      <button type="button">Outside</button>
    </div>
  );
};

describe('useOnClickOutside', () => {
  it('calls the handler for outside clicks', () => {
    const handler = vi.fn();

    render(<TestComponent handler={handler} />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler for inside clicks', () => {
    const handler = vi.fn();

    render(<TestComponent handler={handler} />);

    fireEvent.mouseDown(screen.getByText('Inside'));

    expect(handler).not.toHaveBeenCalled();
  });
});
