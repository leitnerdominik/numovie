import React, { Component } from 'react';
import Paper from '../../components/Paper/Paper';

import Modal from '../../components/Modal/Modal';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Spinner from '../../components/Spinner/Spinner';

import classes from './PaperContainer.module.css';

class PaperContainer extends Component {
  state = {
    open: false,
    currentMovie: null,
    loading: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  findMovie = async id => {
    try {
      this.setState({ loading: true });
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const currMovie = await res.json();
      this.setState({ currentMovie: currMovie, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
    this.toggleModal();
  };

  render() {
    const { movies } = this.props;
    const { open, currentMovie, loading } = this.state;
    let moviesGrid = <p>Loading...</p>;
    if (movies) {
      moviesGrid = movies.results.map(movie => (
        <Paper clicked={this.findMovie} key={movie.id} movie={movie} />
      ));
    }
    return (
      <div className={classes.root}>
        {open ? (
          <Modal close={this.toggleModal}>
            {loading ? <Spinner /> : <MovieDetails movie={currentMovie} />}
          </Modal>
        ) : null}
        {moviesGrid}
      </div>
    );
  }
}

export default PaperContainer;
