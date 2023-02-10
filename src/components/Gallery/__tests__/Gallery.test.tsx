import { Grid } from '@mantine/core';
import { act, render, renderHook, screen } from '@testing-library/react';

import { Gallery } from '../index';
import { useGalleryStore } from '../../../stores';
import { GalleryModes } from '../../../stores/useGaleryStore';
import { useSavedGifsStore } from '../../../stores/useSavedGifsStore';

describe('[components/Gallery]', () => {
  it('Gallery changes its label on different modes', () => {
    render(
      <Grid>
        <Gallery />
      </Grid>
    );

    expect(
      screen.getByText('Start searching for the gifs')
    ).toBeInTheDocument();

    const { result: galleryHook } = renderHook(() =>
      useGalleryStore(store => store.setGifs)
    );

    act(() => {
      galleryHook.current({
        query: 'Star Wars',
        mode: GalleryModes.Search,
        newGifs: ['starWarsGif']
      });
    });

    expect(
      screen.getByText('This is what was found on: Star Wars')
    ).toBeInTheDocument();

    act(() => {
      galleryHook.current({
        query: 'Star Wars',
        mode: GalleryModes.History,
        newGifs: ['savedStarWarsGif']
      });
    });

    expect(
      screen.getByText('This is what was saved on: Star Wars')
    ).toBeInTheDocument();

    const { result: historyHook } = renderHook(() =>
      useSavedGifsStore(store => store.saveGif)
    );

    act(() => {
      historyHook.current('Star Wars', 'savedStarWarsGif');

      galleryHook.current({
        query: '',
        mode: GalleryModes.Initial,
        newGifs: []
      });
    });

    expect(
      screen.getByText('Start searching for the gifs or browse your history')
    ).toBeInTheDocument();
  });
});
