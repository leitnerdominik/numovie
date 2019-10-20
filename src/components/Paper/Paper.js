import React from 'react';

import classes from './Paper.module.css';

const paper = ({ movie, clicked }) => {
  let voteColor = '#4cd137';
  if(movie.vote_average < 7) {
    voteColor = '#e1b12c'
  } else if(movie.vote_average < 4) {
    voteColor = '#c23616'
    
  }
  return (
    <div className={classes.root} onClick={() => clicked(movie.id)}>
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
        alt="img"
      />
      <div className={classes.progressBar}>
        <div
          style={{
            background: voteColor,
            width: `${movie.vote_average * 10}%`,
            height: '100%',
          }}
        >
          <span>{movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default paper;
