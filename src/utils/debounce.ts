export const debounce = <T>(f: (arg: T) => void, t: number): ((arg: T) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (arg: T) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => f(arg), t);
  };
};
