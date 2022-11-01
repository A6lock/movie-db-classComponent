/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

import './movieListItem.css';

export default class MovieListItem extends Component {
  slisingDescription = () => {
    const { description } = this.props;
    return description
      .split(' ')
      .reduce((acc, item) => {
        if (acc.join('').length > 140) return acc;

        acc.push(item);
        return acc;
      }, [])
      .join(' ');
  };

  render() {
    const { tittle, filmDate, description, poster } = this.props;

    return (
      <li className="movie-item">
        <div className="movie-item__container">
          <img
            className="movie-item__poster"
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            alt={tittle}
          />
          <div className="movie-item__body">
            <h3 className="movie-item__tittle">{tittle}</h3>
            <span className="movie-item__date">{filmDate}</span>
            <div className="movie-item__genre">жанры</div>
            <p className="movie-item__description">
              {description.length > 170
                ? `${this.slisingDescription()}...`
                : description}
            </p>
          </div>
        </div>
      </li>
    );
  }
}
