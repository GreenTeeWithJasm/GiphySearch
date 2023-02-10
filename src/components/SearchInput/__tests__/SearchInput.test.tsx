import { Grid } from '@mantine/core';
import {
  screen,
  fireEvent,
  render,
  renderHook,
  waitFor
} from '@testing-library/react';

import { SearchInput } from '../';
import { useGalleryStore } from '../../../stores';

jest.mock('axios', () => ({
  get: async () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { data: [{ embed_url: 'gif.url' }] }
        });
      }, 100);
    })
}));

describe('[components/SearchInput]', () => {
  it('Search component after change event sends a request and updates the Gallery state when the data arrives', async () => {
    render(
      <Grid>
        <SearchInput />
      </Grid>
    );

    const input = screen.getByPlaceholderText('Start typing...');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: 'gif' }
    });

    const { result } = renderHook(() => useGalleryStore(store => store.gifs));

    await waitFor(() =>
      expect(JSON.stringify(result.current)).toBe('["gif.url"]')
    );
  });
});
