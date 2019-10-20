import React, { Component } from 'react';

import Layout from '../container/Layout/Layout';
import PaperContainer from '../container/PaperContainer/PaperContainer';

class Home extends Component {
  state = {
    movies: null,
  };

  async componentDidMount() {
    const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
    try {
      const result = await fetch(
        `${REACT_APP_API_URL}movie/popular?api_key=${REACT_APP_API_KEY}`
      );
      const res = await result.json();
      this.setState({ movies: res });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <Layout>
        <PaperContainer movies={movies} />
      </Layout>
    );
  }
}

export default Home;
