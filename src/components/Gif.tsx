import { Box, createStyles } from '@mantine/core';

import { useSavedGifsStore } from '../stores/useSavedGifsStore';

const REGULAR_GIF_SHADOW = '0px 0px 4px 1px rgba(0, 0, 0, 0.25)';
const REGULAR_HOVER_GIF_SHADOW = '1px 0px 11px 4px rgba(15, 143, 6, 0.25)';
const SAVED_GIF_SHADOW = '0px 0px 4px 1px rgba(15, 143, 6, 0.25)';
const SAVED_HOVER_GIF_SHADOW = '1px 0px 11px 4px rgba(179, 4, 4, 0.25)';

const useStyles = createStyles((_, isSaved: boolean) => ({
  gif: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: '10px',
    paddingTop: '0.3rem',
    paddingBottom: '0.3rem',
    cursor: 'pointer',
    boxShadow: isSaved ? SAVED_GIF_SHADOW : REGULAR_GIF_SHADOW,
    transition: 'box-shadow 0.3s',

    '&:hover': {
      boxShadow: isSaved ? SAVED_HOVER_GIF_SHADOW : REGULAR_HOVER_GIF_SHADOW
    }
  }
}));

type GifProps = {
  gif: string;
  query: string;
};

export const Gif = ({ gif, query }: GifProps): JSX.Element => {
  const isSaved = useSavedGifsStore(store => {
    return (
      !!store.savedSearches[query] &&
      store.savedSearches[query].some(savedGif => savedGif === gif)
    );
  });
  const { classes } = useStyles(isSaved);
  const saveGif = useSavedGifsStore(state => state.saveGif);
  const deleteGif = useSavedGifsStore(state => state.deleteGif);

  const clickHandler = (e: React.MouseEvent<HTMLIFrameElement>) => {
    e.stopPropagation();
    isSaved ? deleteGif(query, gif) : saveGif(query, gif);
  };

  return (
    <Box component="div" className={classes.gif} style={{}}>
      <Box component="iframe" src={gif} style={{ border: 'none' }} />
      <Box
        component="div"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        onClick={clickHandler}
      />
    </Box>
  );
};
