export function jestCreateSpyObj(baseName: string, methodNames: string[]): { [key: string]: jasmine.Spy } {
  const obj: any = {};

  methodNames.forEach((methodName) => {
    obj[methodName] = jasmine.createSpy(baseName, () => null);
  });

  return obj;
}

export function mostRecentCallArgs<T>(spy: jest.SpyInstance<any>): T[] {
  if (spy.mock.calls.length === 0) {
    return null;
  }

  return spy.mock.calls[spy.mock.calls.length - 1];
}
