import { act, renderHook } from '@testing-library/react';

import { useSavedGifsStore } from '../useSavedGifsStore';

describe('[stores/useSavedGifsStore]', () => {
  it('Save and delete gif functions test', () => {
    const { result: savedSearches } = renderHook(() =>
      useSavedGifsStore(store => store.savedSearches)
    );
    const { result: saveGif } = renderHook(() =>
      useSavedGifsStore(store => store.saveGif)
    );
    const { result: deleteGif } = renderHook(() =>
      useSavedGifsStore(store => store.deleteGif)
    );

    act(() => {
      saveGif.current('firstKey', 'firstGif1');
      saveGif.current('secondKey', 'firstGif2');
    });

    expect(JSON.stringify(savedSearches.current.firstKey)).toBe(
      '["firstGif1"]'
    );
    expect(JSON.stringify(savedSearches.current.secondKey)).toBe(
      '["firstGif2"]'
    );

    act(() => {
      saveGif.current('firstKey', 'secondGif1');
    });

    expect(JSON.stringify(savedSearches.current.firstKey)).toBe(
      '["firstGif1","secondGif1"]'
    );

    act(() => {
      deleteGif.current('firstKey', 'firstGif1');
      deleteGif.current('secondKey', 'firstGif2');
    });

    expect(JSON.stringify(savedSearches.current.firstKey)).toBe(
      '["secondGif1"]'
    );
    expect(savedSearches.current.secondKey).toBe(undefined);
  });
});
