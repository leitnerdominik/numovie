import * as actionTypes from './actionTypes';

const fetchMoviesStart = () => {
  return {
    type: actionTypes.FETCH_MOVIES_START,
  };
};

const fetchMoviesSuccess = (movies, currentPage, totalPages) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    payload: {
      movies,
      currentPage,
      totalPages,
    },
  };
};

const fetchMoviesFail = error => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    payload: {
      error,
    },
  };
};

export const fetchMovies = (type, chart, page) => {
  return async dispatch => {
    dispatch(fetchMoviesStart());
    const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
    let url = `${REACT_APP_API_URL}movie/${chart}?api_key=${REACT_APP_API_KEY}&page=${page}`;
    if (type === 'tv') {
      url = `${REACT_APP_API_URL}tv/${chart}?api_key=${REACT_APP_API_KEY}&page=${page}`;
    }

    try {
      const resJson = await fetch(url);
      const res = await resJson.json();
      console.log('Movies: ', res);
      dispatch(fetchMoviesSuccess(res.results, res.page, res.total_pages));
    } catch (error) {
      console.error(error);
      dispatch(fetchMoviesFail(error));
    }
  };
};

const fetchMovieDetailsStart = () => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_START,
  }
}

const fetchMovieDetailsSuccess = movieDetails => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
    payload: {
      currentMovie: movieDetails,
    }
  }
}

const fetchMovieDetailsFail = error => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_FAIL,
    payload: {
      error,
    }
  }
}

export const fetchMovieDetails = (id, type) => {
  return async dispatch => {
    try {
      dispatch(fetchMovieDetailsStart());
      const resJson = await fetch(`${process.env.REACT_APP_API_URL}${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      const res = await resJson.json();
      console.log('MovieDetails: ', res);

      dispatch(fetchMovieDetailsSuccess(res));
    } catch (error) {
      console.error(error);
      dispatch(fetchMovieDetailsFail(error));
    }
  }
}