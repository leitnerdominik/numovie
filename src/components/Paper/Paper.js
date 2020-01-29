import React from 'react';

import noVid from '../../images/no-video.png';

import classes from './Paper.module.css';

const paper = ({ movie, clicked }) => {
  let voteColor = '#000';

  if (movie.vote_average) {
    if (movie.vote_average < 4) {
      voteColor = '#c23616';
    } else if (movie.vote_average < 7) {
      voteColor = '#e1b12c';
    } else if (movie.vote_average >= 7) {
      voteColor = '#4cd137';
    }
  }

  let movieImg = `${process.env.REACT_APP_IMAGE_URL}w185${movie.poster_path}`;
  if (!movie.poster_path) {
    movieImg = noVid;
  }

  return (
    <div className={classes.root} onClick={() => clicked(movie.id)}>
      <h3>{movie.original_title}</h3>
      <img src={movieImg} alt="movie cover" />
      <div className={classes.progressBar}>
        <div
          style={{
            background: voteColor,
            width: movie.vote_average ? `${movie.vote_average * 10}%` : '100%',
            height: '100%',
          }}
        >
          <span
            style={{
              color: !movie.vote_average ? '#fff' : null,
            }}
          >
            {movie.vote_average ? movie.vote_average : 'No votes found!'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default paper;
