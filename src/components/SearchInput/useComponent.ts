import { useCallback, useEffect, useRef, useState } from 'react';

import { useFetcher } from '../../hooks/useFetcher';
import { GifsApiResponse } from '../../types/gifs';
import { useDebounce } from '../../hooks/useDebounce';
import { useGalleryStore } from '../../stores';
import { GalleryModes } from '../../stores/useGaleryStore';

const isSuccessfulResponse = (
  response: unknown,
  statusCode?: number
): response is GifsApiResponse => !!response && statusCode === 200;

export const useComponent = () => {
  const [query, setQuery] = useState<string>('');
  const lastFetchedQuery = useRef<string>('');

  const { sendRequest, result } = useFetcher<GifsApiResponse>(
    `https://api.giphy.com/v1/gifs/search`
  );
  const { debounce, cleanCallback } = useDebounce(500);

  const setGifs = useGalleryStore(store => store.setGifs);

  const getGifsFromAPI = useCallback(
    (value: string) =>
      value !== '' &&
      sendRequest({
        api_key: 'koLiU6W4WnsaJSPgAziwE1YcMvu2RYFn',
        limit: '5',
        q: value
      }).then(() => {
        lastFetchedQuery.current = value;
      }),
    [sendRequest]
  );

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debounce(() => getGifsFromAPI(value));
    },
    [debounce, getGifsFromAPI]
  );

  const clickSearchIconHandler = useCallback(() => {
    cleanCallback(() => getGifsFromAPI(query));
  }, [cleanCallback, getGifsFromAPI, query]);

  useEffect(() => {
    const response = result?.response;
    if (isSuccessfulResponse(response, result?.statusCode)) {
      setGifs({
        query: lastFetchedQuery.current,
        newGifs: response.data.map(({ embed_url }) => embed_url),
        mode: GalleryModes.Search
      });
    }
  }, [result, setGifs]);

  return { inputChangeHandler, clickSearchIconHandler };
};
