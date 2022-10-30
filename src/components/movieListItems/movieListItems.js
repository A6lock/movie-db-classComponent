/* eslint-disable react/prefer-stateless-function */

import { Component } from 'react';

import MovieListItem from '../movieListItem/MovieListItem';

export default class MovieListItems extends Component {
  render() {
    return (
      <ul>
        <MovieListItem />
        <MovieListItem />
        <MovieListItem />
        <MovieListItem />
      </ul>
    );
  }
}
