import { create } from 'zustand';

export enum GalleryModes {
  Initial = 'INITIAL',
  Search = 'SEARCH',
  History = 'HISTORY'
}

type GalleryStore = {
  gifs: string[];
  query: string;
  mode: GalleryModes;
  setGifs: (options: {
    query: string;
    newGifs: string[];
    mode: GalleryModes;
  }) => void;
};

export const useGalleryStore = create<GalleryStore>(set => ({
  gifs: [],
  query: '',
  mode: GalleryModes.Initial,
  setGifs: ({ query, newGifs, mode }) => {
    set({ gifs: newGifs, query, mode });
  }
}));
