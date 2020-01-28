import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../container/Layout/Layout';
import Paper from '../../components/Paper/Paper';
import Modal from '../../components/Modal/Modal';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Spinner from '../../components/Spinner/Spinner';

import * as action from '../../store/actions/index';

import classes from './search.module.css';

class Search extends Component {
  componentWillMount() {
    console.log(this.props.match.params.query);
    const { query } = this.props.match.params;
    if (query) {
      this.props.onSearch(query);
    }
  }

  render() {
    const { movies, series, loading } = this.props;

    let moviesGrid = [];

    if (loading) {
      moviesGrid = <Spinner />;
    } else if (this.props.movies) {
      moviesGrid = movies.results.map(movie => (
        <Paper key={movie.id} movie={movie} />
      ));
    }

    return (
      <Layout>
        <div>
          <h2>Movies</h2>
          <div className={classes.flex}>
            {moviesGrid.length > 0 ? moviesGrid : <span>No movies found!</span>}
          </div>
          <div>
            <h2>Series</h2>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.search.movies,
  series: state.search.series,
  loading: state.search.loading,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch(action.searchMovie(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
