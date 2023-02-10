import { GalleryModes } from '../../stores/useGaleryStore';

type GetLabelFunction = (options: {
  hasHistory?: boolean;
  query?: string;
}) => string;

const GALLERY_LABELS: Record<GalleryModes, GetLabelFunction> = {
  [GalleryModes.Initial]: ({ hasHistory }) =>
    hasHistory
      ? 'Start searching for the gifs or browse your history'
      : 'Start searching for the gifs',
  [GalleryModes.Search]: ({ query }) =>
    query ? `This is what was found on: ${query}` : '',
  [GalleryModes.History]: ({ query }) =>
    query ? `This is what was saved on: ${query}` : ''
};

type GetGalleryLabelByMode = (options: {
  mode: GalleryModes;
  hasHistory: boolean;
  query?: string;
}) => string;

export const getGalleryLabelByMode: GetGalleryLabelByMode = ({
  mode,
  query,
  hasHistory
}) => GALLERY_LABELS[mode]({ query, hasHistory });
