import * as actionTyes from '../actions/actionTypes';

const initialState = {
  series: null,
  movies: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTyes.SEARCH_MOVIE_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTyes.SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        series: action.payload.tvs,
        movies: action.payload.movies,
        loading: false,
      };
    case actionTyes.SEARCH_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
