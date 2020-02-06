import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Paper from '../../components/Paper/Paper';
import Modal from '../../components/Modal/Modal';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Spinner from '../../components/Spinner/Spinner';
import SubNav from '../../components/Navigation/SubNav/SubNav';
import Paginator from '../../components/Paginator/Paginator';

import * as action from '../../store/actions/index';

import classes from './Movie.module.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chartSelected: null,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.switchPage();
  }

  useQuery = () => {
    return new URLSearchParams(window.location.search);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.chart !== this.props.match.params.chart) {
      this.switchPage();
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  switchPage = async () => {
    let page = this.useQuery().get('page');
    if (page) {
      await this.setState({ currentPage: +page });
    } else {
      await this.setState({ currentPage: 1 });
    }

    this.getMovieData();
    this.scrollToTop();
  };

  getChart = () => {
    const { match } = this.props;
    let chart = match.params.chart;

    if (!match.params.chart) {
      return 'popular';
    }
    return chart;
  };

  setChartId = () => {
    const { subNavItems } = this.props;
    const currentChart = this.getChart();
    const chart = subNavItems.filter(
      item => item.path.split('/').pop() === currentChart
    );

    if (chart[0].id && this.state.chartSelected !== chart[0].id) {
      this.setState({ chartSelected: chart[0].id });
    }
  };

  getMovieData = () => {
    const { onFetchMovies, type } = this.props;
    const { currentPage } = this.state;
    const chart = this.getChart();
    this.setChartId();

    onFetchMovies(type, chart, currentPage);
  };

  findMovie = id => {
    const { type, onFetchMovieDetails } = this.props;

    onFetchMovieDetails(id, type);
    this.toggleModal();
  };

  render() {
    const {
      subNavItems,
      title,
      movies,
      loading,
      currentPage,
      totalPages,
      currentMovie
    } = this.props;
    const {
      open,
      chartSelected,
    } = this.state;

    let moviesGrid = <p>Loading...</p>;
    if (movies) {
      moviesGrid = movies.map(movie => (
        <Paper clicked={this.findMovie} key={movie.id} movie={movie} />
      ));
    }
    return (
      <Fragment>
        <h2 className={classes.title}>{title}</h2>
        <SubNav items={subNavItems} activeId={chartSelected} />
        <div className={classes.root}>
          {open ? (
            <Modal close={this.toggleModal}>
              {loading ? <Spinner /> : <MovieDetails movie={currentMovie} />}
            </Modal>
          ) : null}
          {moviesGrid.length > 0 ? (
            moviesGrid
          ) : (
            <span className={classes.nothing}>Nothing there...</span>
          )}
        </div>
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          clicked={this.switchPage}
        />
      </Fragment>
    );
  }
}

Movie.propTypes = {
  type: PropTypes.string.isRequired,
  subNavItems: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  movies: state.movie.movies,
  currentMovie: state.movie.currentMovie,
  loading: state.movie.loading,
  error: state.error,
  currentPage: state.movie.currentPage,
  totalPages: state.movie.totalPages,
});

const mapDispatchToProps = dispatch => ({
  onFetchMovies: (type, chart, page) =>
    dispatch(action.fetchMovies(type, chart, page)),
  onFetchMovieDetails: (id, type) =>
    dispatch(action.fetchMovieDetails(id, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Movie));
