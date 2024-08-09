import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useRef } from 'react';

describe('useOnClickOutside', () => {
  it('should call the handler when clicking outside the element', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement('div'));
      useOnClickOutside(ref, handler);
      return ref;
    });

    // Attach the element to the document body
    document.body.appendChild(result.current.current as Node);

    // Simulate clicking outside the element
    fireEvent.mouseDown(document);

    expect(handler).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(result.current.current as Node);
  });

  it('should not call the handler when clicking inside the element', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement('div'));
      useOnClickOutside(ref, handler);
      return ref;
    });

    // Attach the element to the document body
    document.body.appendChild(result.current.current as Node);

    // Simulate clicking inside the element
    fireEvent.mouseDown(result.current.current as Node);

    expect(handler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(result.current.current as Node);
  });
});
