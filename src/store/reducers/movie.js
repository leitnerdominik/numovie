import * as actionTypes from '../actions/actionTypes';

const initialState = {
  movies: null,
  currentMovie: null,
  loading: false,
  error: null,
  // currentPage: 1,
  totalPages: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.FETCH_MOVIES_SUCCESS:
      const { movies, currentPage, totalPages } = action.payload;
      return {
        ...state,
        movies,
        loading: false,
        currentPage,
        totalPages,
      }
    case actionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case actionTypes.FETCH_MOVIE_DETAILS_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMovie: action.payload.currentMovie,
      }
    case actionTypes.FETCH_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state;
  }
}

export default reducer;