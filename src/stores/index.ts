import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export { useGalleryStore } from './useGaleryStore';

export type ZustandPersist<T> = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;
