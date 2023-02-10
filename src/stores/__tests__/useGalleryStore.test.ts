import { act, renderHook } from '@testing-library/react';

import { GalleryModes, useGalleryStore } from '../useGaleryStore';

describe('[stores/useGalleryStore]', () => {
  it('When calling the setGifs function, gifs and query data in the state updates', () => {
    const { result: gifs } = renderHook(() =>
      useGalleryStore(store => store.gifs)
    );
    const { result: query } = renderHook(() =>
      useGalleryStore(store => store.query)
    );
    const { result: setGifs } = renderHook(() =>
      useGalleryStore(store => store.setGifs)
    );

    act(() => {
      setGifs.current({
        query: 'test',
        newGifs: ['testGif'],
        mode: GalleryModes.Search
      });
    });

    expect(JSON.stringify(gifs.current)).toBe('["testGif"]');
    expect(query.current).toBe('test');
  });
});
