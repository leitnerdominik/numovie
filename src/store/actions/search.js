import * as actionTypes from './actionTypes';

const searchMovieStart = () => {
  return {
    type: actionTypes.SEARCH_MOVIE_START,
  };
};

const searchMovieSuccess = (movies, tvs) => {
  return {
    type: actionTypes.SEARCH_MOVIE_SUCCESS,
    payload: {
      movies,
      tvs,
    },
  };
};

const searchMovieFail = error => {
  return {
    type: actionTypes.SEARCH_MOVIE_FAIL,
    payload: {
      error,
    },
  };
};

export const searchMovie = searchTerm => {
  return async dispatch => {
    const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
    const searchMovieUrl = `${REACT_APP_API_URL}search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    const searchTvUrl = `${REACT_APP_API_URL}search/tv?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    try {
      dispatch(searchMovieStart());
      const resJsonMovie = await fetch(searchMovieUrl);
      const resMovie = await resJsonMovie.json();

      const resJsonTv = await fetch(searchTvUrl);
      const resTv = await resJsonTv.json();

      dispatch(searchMovieSuccess(resMovie, resTv));
    } catch (error) {
      console.log(error);
      dispatch(searchMovieFail(error));
    }
  };
};
