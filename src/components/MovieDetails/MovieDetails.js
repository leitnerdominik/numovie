import React from 'react';

const movieDetails = ({ movie }) => {
  console.log('MovieDetails: ', movie);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const genres = movie.genres.map(genre => {
    console.log(genre.name);
    return <span>{genre.name}</span>;
  }).reduce((prev, curr) => [prev, ' | ', curr]);
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>
        {new Date(movie.release_date).toLocaleDateString('en-US', dateOptions)}{' '}
        | {movie.runtime + ' Minutes'}
      </p>
      <p>{genres}</p>
      <p>{movie.overview}</p>
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
        alt="cover"
      />
      <div>
        <span>{movie.vote_average}</span>
        <span>{movie.vote_count}</span>
      </div>
    </div>
  );
};

export default movieDetails;
