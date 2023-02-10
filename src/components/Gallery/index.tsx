import { Container, Grid, Text } from '@mantine/core';

import { useGalleryStore } from '../../stores';
import { Gif } from '../Gif';
import { useSavedGifsStore } from '../../stores/useSavedGifsStore';
import { getGalleryLabelByMode } from './utils';

export const Gallery = (): JSX.Element => {
  const { query, gifs, mode } = useGalleryStore(store => store);
  const hasHistory = useSavedGifsStore(
    store => !!Object.keys(store.savedSearches).length
  );

  return (
    <Grid.Col xs={12} md={8} orderMd={2} orderXs={1}>
      <Text p="0.5rem 0" align="center">
        {getGalleryLabelByMode({ query, mode, hasHistory })}
      </Text>
      <Container>
        <Grid>
          {gifs.map(gif => (
            <Grid.Col
              xs={12}
              sm={6}
              key={gif}
              pt={4}
              pb={4}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Gif gif={gif} query={query} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Grid.Col>
  );
};
