import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ZustandPersist } from './index';

type SavedGifsStore = {
  savedSearches: Record<string, string[]>;
  // trackGif: (query: string, gif: string) => void;
  saveGif: (query: string, gif: string) => void;
  deleteGif: (query: string, gif: string) => void;
};

export const useSavedGifsStore = create<SavedGifsStore>(
  (persist as ZustandPersist<SavedGifsStore>)(
    set => ({
      savedSearches: {},
      saveGif: (query: string, gif: string) => {
        set(state => {
          const savedSearches = { ...state.savedSearches };
          if (!savedSearches[query]) {
            savedSearches[query] = [gif];
          } else {
            savedSearches[query] = [...savedSearches[query], gif];
          }
          return { savedSearches };
        });
      },
      deleteGif: (query: string, gif: string) => {
        set(state => {
          const savedSearches = { ...state.savedSearches };
          if (savedSearches[query].length === 1) {
            delete savedSearches[query];
          } else {
            savedSearches[query] = savedSearches[query].filter(
              savedGif => savedGif !== gif
            );
          }
          return { savedSearches };
        });
      }
    }),
    {
      name: 'savedGallery',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
