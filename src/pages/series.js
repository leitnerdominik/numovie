import React from 'react';

import Layout from '../container/Layout/Layout';
import Movie from '../container/Movie/Movie';

const subNavItems = [
  {
    id: 1,
    path: '/series/charts/popular',
    label: 'Popular',
  },
  {
    id: 2,
    path: '/series/charts/top_rated',
    label: 'Top Rated',
  },
];

const series = () => {
  return (
    <Layout>
      <Movie subNavItems={subNavItems} type="tv" title="series" />
    </Layout>
  );
};

export default series;
