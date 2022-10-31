/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

import './movieListItem.css';

export default class MovieListItem extends Component {
  render() {
    const { tittle, filmDate, description } = this.props;
    return (
      <li className="movie-item">
        <div className="movie-item__container">
          <img src="" alt="" />
          <div>
            <h3 className="movie-item__tittle">{tittle}</h3>
            <span className="movie-item__date">{filmDate}</span>
            <div className="movie-item__genre">жанры</div>
            <p className="movie-item__description">{description}</p>
          </div>
        </div>
      </li>
    );
  }
}
