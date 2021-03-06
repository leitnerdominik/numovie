import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../container/Layout/Layout';
import Paper from '../../components/Paper/Paper';
import Modal from '../../components/Modal/Modal';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Spinner from '../../components/Spinner/Spinner';
import SubNav from '../../components/Navigation/SubNav/SubNav';

import * as action from '../../store/actions/index';

import classes from './search.module.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      activeChartId: 1,
      subNav: [
        {
          id: 1,
          path: '/search/movie/',
          label: 'Movies',
        },
        {
          id: 2,
          path: '/search/serie/',
          label: 'Series',
        },
      ],
    };
  }

  componentDidUpdate() {
    const { type } = this.props.match.params;
    let chartId = 1;
    if (type === 'serie') {
      chartId = 2;
    }

    if (chartId !== this.state.activeChartId) {
      this.setState({ activeChartId: chartId });
    }
  }

  UNSAFE_componentWillMount() {
    const { query } = this.props.match.params;

    if (query) {
      this.props.onSearch(query);
      const updateSubNav = [...this.state.subNav];
      updateSubNav[0].path = `/search/movie/${query}`;
      updateSubNav[1].path = `/search/serie/${query}`;
      this.setState({
        subNav: updateSubNav,
      });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  findMovieById = id => {
    let { type } = this.props.match.params;

    if (type === 'serie') {
      type = 'tv';
    }

    this.props.onFetchMovieDetails(id, type);
    this.toggleModal();
  };

  render() {
    const {
      movies,
      series,
      movieLoading,
      searchLoading,
      currentMovie,
    } = this.props;
    const { type } = this.props.match.params;
    const { open, activeChartId } = this.state;

    let moviesGrid = [];

    if (searchLoading) {
      moviesGrid = <Spinner />;
    } else if (movies && type === 'movie') {
      moviesGrid = movies.results.map(movie => (
        <Paper clicked={this.findMovieById} key={movie.id} movie={movie} />
      ));
    } else if (series && type === 'serie') {
      moviesGrid = series.results.map(serie => (
        <Paper clicked={this.findMovieById} key={serie.id} movie={serie} />
      ));
    }

    return (
      <Layout>
        <div>
          <h1 className={classes.title}>
            {type === 'movies' ? 'Movies' : 'Series'}
          </h1>
          <SubNav items={this.state.subNav} activeId={activeChartId} />
          {open ? (
            <Modal close={this.toggleModal}>
              {movieLoading ? (
                <Spinner />
              ) : (
                <MovieDetails movie={currentMovie} />
              )}
            </Modal>
          ) : null}
          <div className={classes.flex}>
            {moviesGrid.length > 0 ? moviesGrid : <span>No movies found!</span>}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.search.movies,
  series: state.search.series,
  searchLoading: state.search.loading,
  searchError: state.search.error,
  movieLoading: state.movie.loading,
  movieError: state.movie.error,
  currentMovie: state.movie.currentMovie,
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch(action.searchMovie(searchTerm)),
  onFetchMovieDetails: (id, type) =>
    dispatch(action.fetchMovieDetails(id, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
