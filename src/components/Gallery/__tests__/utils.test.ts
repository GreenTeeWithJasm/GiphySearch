import { getGalleryLabelByMode } from '../utils';
import { GalleryModes } from '../../../stores/useGaleryStore';

describe('[components/Gallery/utils]', () => {
  it('Initial mode with no history', () => {
    const output = getGalleryLabelByMode({
      mode: GalleryModes.Initial,
      query: 'Invalid Query',
      hasHistory: false
    });

    expect(output).toBe('Start searching for the gifs');
  });

  it('Initial mode with history', () => {
    const output = getGalleryLabelByMode({
      mode: GalleryModes.Initial,
      query: 'Invalid Query',
      hasHistory: true
    });

    expect(output).toBe('Start searching for the gifs or browse your history');
  });

  it('Search mode', () => {
    const output = getGalleryLabelByMode({
      mode: GalleryModes.Search,
      query: 'Star Wars',
      hasHistory: true
    });

    expect(output).toBe('This is what was found on: Star Wars');
  });

  it('History mode', () => {
    const output = getGalleryLabelByMode({
      mode: GalleryModes.History,
      query: 'Star Wars',
      hasHistory: true
    });

    expect(output).toBe('This is what was saved on: Star Wars');
  });
});
