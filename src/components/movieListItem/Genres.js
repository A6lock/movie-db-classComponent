/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react';

import MovieDbService from '../../services/MovieDbService';

export default class Genres extends Component {
  movieDbService = new MovieDbService();

  render() {
    // eslint-disable-next-line no-unused-vars
    const { genres } = this.props;

    const genresList = genres.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="genres__item" key={index}>
        {item}
      </li>
    ));
    return <ul className="genres__list">{genresList}</ul>;
  }
}
