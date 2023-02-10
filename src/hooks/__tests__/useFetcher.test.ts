import { act, renderHook, waitFor } from '@testing-library/react';

import { getQueryStringFromQueryParamsList } from '../useFetcher/utils';
import { useFetcher } from '../useFetcher';

jest.mock('axios', () => ({
  get: async () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ statusCode: 200, data: { result: 'Successful result' } });
      }, 500);
    })
}));

describe('[hooks/useFetcher] utils getQueryStringFromQueryParamsList', () => {
  it('Should return valid query string from a valid record', () => {
    const expectedOutput = `?param_one=1&param_two=2`;

    const output = getQueryStringFromQueryParamsList({
      param_one: '1',
      param_two: '2'
    });

    expect(output).toBe(expectedOutput);
  });

  it('Should return an empty string if the record is undefined, or null, or is empty', () => {
    const nullOutput = getQueryStringFromQueryParamsList(null);

    expect(nullOutput).toBe('');

    const undefinedOutput = getQueryStringFromQueryParamsList();

    expect(undefinedOutput).toBe('');

    const emptyRecordOutput = getQueryStringFromQueryParamsList({});

    expect(emptyRecordOutput).toBe('');
  });

  it('Should skip the attribute if it is not a string or a number', () => {
    const expectedOutput = '?param_one=1&param_three=3';

    const output = getQueryStringFromQueryParamsList({
      param_one: '1',
      param_two: undefined,
      param_three: 3,
      param_four: null,
      param_five: NaN,
      param_six: ['one', 2]
    });

    expect(output).toBe(expectedOutput);
  });
});

describe('[useFetcher]', () => {
  it('Should send request and update the state when result returns. The loading should be try while there is no result', async () => {
    const { result } = renderHook(() => useFetcher('http://some.test.api'));

    expect(result.current.result).toBe(undefined);
    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.sendRequest();
    });

    await waitFor(() => expect(result.current.result).toBe(null));
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    await waitFor(() =>
      expect(JSON.stringify(result.current.result)).toBe(
        '{"statusCode":200,"response":{"result":"Successful result"}}'
      )
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
