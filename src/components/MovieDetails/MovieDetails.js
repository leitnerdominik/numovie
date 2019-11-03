import React from 'react';
import classes from './MovieDetails.module.css';

const movieDetails = ({ movie }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const genres = movie.genres
    .map(genre => {
      return <span key={genre.id}>{genre.name}</span>;
    })
    .reduce((prev, curr) => [prev, ' | ', curr]);
  return (
    <div>
      {movie.backdrop_path && (
        <div className={classes.bgImg}>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}w780${movie.backdrop_path}`}
            alt="backdrop"
          />
        </div>
      )}
      <div className={classes.details}>
        <img
          className={classes.cover}
          src={`${process.env.REACT_APP_IMAGE_URL}w185${movie.poster_path}`}
          alt="cover"
        />
        <div>
          <h3 className={classes.title}>{movie.title}</h3>
          <p>
            {new Date(movie.release_date).toLocaleDateString(
              'en-US',
              dateOptions
            )}{' '}
            | {movie.runtime + ' Minutes'}
          </p>
          <p>{genres}</p>
          <p>{movie.overview}</p>
          <p>Overall rating: {movie.vote_average}/10</p>
          <p>Vote count: {movie.vote_count}</p>
        </div>
      </div>
    </div>
  );
};

export default movieDetails;
