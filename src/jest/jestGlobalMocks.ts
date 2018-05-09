const mockStorage = () => {
  let storage = {};

  return {
    clear: () => storage = {},
    getItem: (key) => key in storage ? storage[key] : null,
    removeItem: (key) => delete storage[key],
    setItem: (key, value) => storage[key] = value || ''
  };
};

Object.defineProperty(window, 'localStorage', { value: mockStorage() });
Object.defineProperty(window, 'sessionStorage', { value: mockStorage() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
Object.defineProperty(window, 'scrollTo', { value: () => null });
