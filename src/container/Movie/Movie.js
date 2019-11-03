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
    const { onFetchMovies } = this.props;
    const { currentPage } = this.state;
    const chart = this.getChart();
    this.setChartId();

    onFetchMovies('movie', chart, currentPage);

    // const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

    // let url = `${REACT_APP_API_URL}movie/${chart}?api_key=${REACT_APP_API_KEY}&page=${this.state.currentPage}`;
    // if (type === 'tv') {
    //   url = `${REACT_APP_API_URL}tv/${chart}?api_key=${REACT_APP_API_KEY}&page=${this.state.currentPage}`;
    // }

    // try {
    //   const resJson = await fetch(url);
    //   const res = await resJson.json();
    //   console.log('result: ', res);
    //   this.setState({
    //     movies: res.results,
    //     chartSelected: currentId,
    //     totalPages: res.total_pages,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  findMovie = id => {
    const { type, onFetchMovieDetails } = this.props;

    onFetchMovieDetails(id, type);
    // this.setState({ loading: true });
    // try {
    //   const res = await fetch(
    //     `${process.env.REACT_APP_API_URL}${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    //   );
    //   const currMovie = await res.json();
    //   this.setState({ currentMovie: currMovie, loading: false });
    // } catch (err) {
    //   console.log(err);
    //   this.setState({ loading: false });
    // }
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
  movies: state.movies,
  currentMovie: state.currentMovie,
  loading: state.loading,
  error: state.error,
  currentPage: state.currentPage,
  totalPages: state.totalPages,
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
