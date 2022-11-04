/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Alert } from 'antd';

import MovieDbService from '../../services/MovieDbService';
import MovieListItem from '../movieListItem/MovieListItem';
import Spiner from '../spiner/Spiner';

import './movieListItems.css';

export default class MovieListItems extends Component {
  movieDbService = new MovieDbService();

  state = {
    // eslint-disable-next-line react/no-unused-state
    data: [],
    // eslint-disable-next-line react/no-unused-state
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.searchFilmsByWord();
  }

  onFilmsLoaded = (filmsData) => {
    this.setState({
      data: filmsData.results,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  searchFilmsByWord = () => {
    this.movieDbService
      .getMoviesByWord('Tory')
      .then(this.onFilmsLoaded)
      .catch(this.onError);
  };

  render() {
    const { loading, error, data } = this.state;

    const ulStyle = loading
      ? 'moveie-list-items--loading '
      : error
      ? 'moveie-list-items--error'
      : 'moveie-list-items';

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="An error has occurred, we are working to fix it."
        type="error"
        showIcon
        closable
      />
    ) : null;

    const spinner = loading ? <Spiner /> : null;
    const viewContent = !loading && !error ? <ItemsView data={data} /> : null;

    return (
      <ul className={ulStyle}>
        {errorMessage}
        {spinner}
        {viewContent}
      </ul>
    );
  }
}

const ItemsView = ({ data }) => {
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

  return visibleData;
};
