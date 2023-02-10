import React from 'react';

import { SearchInput } from './components/SearchInput';
import { Gallery } from './components/Gallery';
import { SavedGifs } from './components/SavedGifs';
import { Layout } from './containers/Layout';

function App() {
  return (
    <Layout>
      <SearchInput />
      <Gallery />
      <SavedGifs />
    </Layout>
  );
}

export default App;
