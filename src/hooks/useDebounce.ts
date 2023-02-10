import { useRef } from 'react';

type UseDebounceTimeout = number;

type UseDebounceReturnType = {
  debounce: (callback: () => void) => void | Promise<void>;
  cleanCallback: (callback: () => void) => void;
};

export const useDebounce = (
  timeout: UseDebounceTimeout
): UseDebounceReturnType => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (callback: () => void): void => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback();
    }, timeout);
  };

  const cleanCallback = (callback: () => void): void => {
    timer.current && clearTimeout(timer.current);
    callback();
  };

  return { debounce, cleanCallback };
};
