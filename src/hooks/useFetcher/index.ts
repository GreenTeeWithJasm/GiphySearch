import { useCallback, useState } from 'react';
import axios from 'axios';

import { getQueryStringFromQueryParamsList } from './utils';

class FetcherError extends Error {
  statusCode: number;

  constructor({
    message,
    statusCode
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.statusCode = statusCode;
  }

  static isFetcherError = (err: unknown): err is FetcherError =>
    typeof err === 'object' && !!err && 'statusCode' in err;
}

type FetcherResult<T = {}> = {
  statusCode: number;
  response: T | string;
} | null;

export const useFetcher = <T = {}>(url: string) => {
  const [result, setResult] = useState<FetcherResult<T>>();

  const sendRequest = useCallback(
    async (queryParams?: Record<string, string>) => {
      try {
        setResult(null);
        const apiResponse = await axios.get<T>(
          `${url}${getQueryStringFromQueryParamsList(queryParams)}`
        );
        if (apiResponse.status >= 400) {
          throw new FetcherError({
            statusCode: apiResponse.status,
            message: 'Something went wrong'
          });
        }
        setResult({ statusCode: 200, response: apiResponse.data });
      } catch (err) {
        if (FetcherError.isFetcherError(err)) {
          setResult({ statusCode: err.statusCode, response: err.message });
        } else {
          console.error(err);
        }
      }
    },
    [url]
  );

  return {
    result,
    isLoading: result === null,
    sendRequest
  };
};
