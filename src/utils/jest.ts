export const timer = (timeout: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
