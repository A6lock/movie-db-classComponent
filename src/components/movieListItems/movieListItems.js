/* eslint-disable camelcase */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

// import MovieDbService from '../../services/MovieDbService';

import MovieListItem from '../movieListItem/MovieListItem';

import './movieListItems.css';

export default class MovieListItems extends Component {
  // movieDbService = new MovieDbService();
  state = {
    // eslint-disable-next-line react/no-unused-state
    data: [],
    // eslint-disable-next-line react/no-unused-state
    load: true,
  };

  componentDidMount() {
    this.update();
  }

  update = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=cf39818bffaaad23abda4aada5ecc8bc&language=en-US&query=return&page=1&include_adult=false'
    );
    const res = await response.json();
    // eslint-disable-next-line react/no-unused-state
    this.setState({ data: res.results });
  };

  render() {
    const { data } = this.state;

    const visibleData = data.map((item) => {
      const { id, original_title, release_date, overview, poster_path } = item;
      return (
        <MovieListItem
          key={id}
          tittle={original_title}
          filmDate={release_date}
          description={overview}
          poster={poster_path}
        />
      );
    });

    return <ul className="moveie-list-items">{visibleData}</ul>;
  }
}
