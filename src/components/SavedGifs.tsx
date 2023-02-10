import {
  Container,
  createStyles,
  Grid,
  Table,
  Text,
  UnstyledButton
} from '@mantine/core';
import { useMemo } from 'react';

import { useSavedGifsStore } from '../stores/useSavedGifsStore';
import { useGalleryStore } from '../stores';
import { GalleryModes } from '../stores/useGaleryStore';

const useStyles = createStyles(() => ({
  tableContainer: {
    boxShadow: '1px 1px 6px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: '7px'
  },
  historyLabel: {
    padding: '0.5rem 0',
    color: '#969696',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.85rem'
  }
}));

export const SavedGifs = (): JSX.Element | null => {
  const { classes } = useStyles();
  const savedSearches = useSavedGifsStore(store => store.savedSearches);
  const setGalleryGifs = useGalleryStore(store => store.setGifs);

  const rows = useMemo(() => {
    const savedQueries = Object.entries(savedSearches);
    if (!savedQueries.length) {
      return null;
    }

    return (
      <tbody>
        {savedQueries.map(entry => (
          <tr key={`saved_query_${entry[0]}`}>
            <td>
              <UnstyledButton
                onClick={() =>
                  setGalleryGifs({
                    query: entry[0],
                    newGifs: entry[1],
                    mode: GalleryModes.History
                  })
                }
              >
                {entry[0]}
              </UnstyledButton>
            </td>
            <td>{entry[1].length}</td>
          </tr>
        ))}
      </tbody>
    );
  }, [savedSearches, setGalleryGifs]);

  if (!rows) {
    return null;
  }

  return (
    <Grid.Col
      orderMd={1}
      orderXs={2}
      md={4}
      xs={12}
      offsetSm={2}
      sm={8}
      offsetMd={0}
    >
      <Text className={classes.historyLabel}>History</Text>
      <Container className={classes.tableContainer}>
        <Table>
          <thead>
            <tr>
              <th>Searched Gifs</th>
              <th>Saved</th>
            </tr>
          </thead>
          {rows && rows}
        </Table>
      </Container>
    </Grid.Col>
  );
};
