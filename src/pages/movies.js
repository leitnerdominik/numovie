import React from 'react';

import Layout from '../container/Layout/Layout';
import Movie from '../container/Movie/Movie';
import Paginator from '../components/Paginator/Paginator';

const subNavItems = [
  {
    id: 1,
    path: '/charts/popular',
    label: 'Popular',
  },
  {
    id: 2,
    path: '/charts/top_rated',
    label: 'Top Rated',
  },
  {
    id: 3,
    path: '/charts/upcoming',
    label: 'Upcoming',
  },
];

const movie = () => {
  return (
    <Layout>
      <Movie subNavItems={subNavItems} type="movie" title="movies" />
    </Layout>
  );
};

export default movie;
