import { renderHook } from '@testing-library/react';

import { useDebounce } from '../useDebounce';
import { timer } from '../../utils/jest';

describe('[hooks/useDebounce]', () => {
  const timeout = 500;
  let callbackFired: boolean = false;
  const mockCallback = () => {
    callbackFired = true;
  };

  beforeEach(() => {
    callbackFired = false;
  });

  it("The debounce doesn't fires the callback immediately, but only after the timeout", async () => {
    const { result } = renderHook(() => useDebounce(timeout));

    result.current.debounce(mockCallback);

    expect(callbackFired).toBeFalsy();

    await timer(timeout);

    expect(callbackFired).toBeTruthy();
  });

  it('The debounce resets the timer and starts from the beginning if called before the timeout ends', async () => {
    const halfTimeout = timeout / 2;

    const { result } = renderHook(() => useDebounce(timeout));

    result.current.debounce(mockCallback);

    expect(callbackFired).toBeFalsy();
    await timer(halfTimeout);
    expect(callbackFired).toBeFalsy();

    result.current.debounce(mockCallback);

    await timer(halfTimeout);
    expect(callbackFired).toBeFalsy();
    await timer(halfTimeout);
    expect(callbackFired).toBeTruthy();
  });
});
