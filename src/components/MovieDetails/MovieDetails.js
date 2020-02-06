import React from 'react';
import classes from './MovieDetails.module.css';

const movieDetails = ({ movie }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  let genres = 'No genres found';
  if (movie.genres && movie.genres.length > 0) {
    genres = movie.genres
      .map(genre => {
        return <span key={genre.id}>{genre.name}</span>;
      })
      .reduce((prev, curr) => [prev, ' | ', curr]);
  }
  let releaseDate = null;
  let runTime = null;

  if (movie.release_date) {
    releaseDate = new Date(movie.release_date).toLocaleDateString(
      'en-US',
      dateOptions
    );
  } else if (movie.first_air_date) {
    releaseDate = new Date(movie.first_air_date).toLocaleDateString(
      'en-US',
      dateOptions
    );
  }

  if(movie.runtime) {
    runTime = movie.runtime + ' Minutes';
  } else if(movie.episode_run_time[0]) {
    runTime = movie.episode_run_time[0] + ' Minutes';
  }

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
        {movie.poster_path && (
          <img
            className={classes.cover}
            src={`${process.env.REACT_APP_IMAGE_URL}w185${movie.poster_path}`}
            alt="cover"
          />
        )}
        <div>
          <h3 className={classes.title}>{movie.title || movie.name}</h3>
          <p>
            {releaseDate} | {runTime}
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
