import { isString } from 'util';

export function handleGraphQLValidationError(error: any, dataKey: string, modelKey: string): any {
  let errors: string[];

  if (Array.isArray(error) && error.every((e) => isString(e))) {
    errors = error;
  } else if (error.message) {
    errors = [error.message];
  } else {
    errors = [error];
  }

  return {
    data: {
      [dataKey]: {
        [modelKey]: null,
        errors: {
          attribute: 'Base',
          messages: errors
        }
      }
    }
  };
}
