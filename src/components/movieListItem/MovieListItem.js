/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd';

import Ratind from '../rating/Rating';
import MovieDbService from '../../services/MovieDbService';

import Genres from './Genres';
import errorPicture from './noPoster.png';

import './movieListItem.css';
import './rate.css';

export default class MovieListItem extends Component {
  movieDbService = new MovieDbService();

  state = {
    starsCount: 0,
  };

  componentDidUpdate(prevState) {
    const { starsCount } = this.state;

    if (this.state !== prevState && starsCount > 0) {
      this.onChangeRate();
    }
  }

  onChangeStarsCount = (starsCount) => {
    this.setState({ starsCount });
  };

  onChangeRate = () => {
    const { starsCount } = this.state;
    const { id, guestSessionId } = this.props;

    localStorage.setItem(id, starsCount);

    this.movieDbService.rateMovie(starsCount, id, guestSessionId);
  };

  slicingDescription = () => {
    const { description, tittle, genres } = this.props;

    const maxSymbols =
      tittle.length > 22 && genres.length > 3
        ? 50
        : tittle.length > 22
        ? 80
        : 140;

    return description
      .split(' ')
      .reduce((acc, item) => {
        if (acc.join('').length > maxSymbols) return acc;

        acc.push(item);
        return acc;
      }, [])
      .join(' ');
  };

  render() {
    const { starsCount } = this.state;
    const { tittle, filmDate, description, poster, genres, rating, id } =
      this.props;

    const posterView = poster
      ? `https://image.tmdb.org/t/p/w500/${poster}`
      : errorPicture;

    const defaultDescription =
      description || 'Sorry, here is no description for the film.';

    return (
      <li className="movie-item">
        <div className="movie-item__container">
          <img className="movie-item__poster" src={posterView} alt={tittle} />
          <div className="movie-item__body">
            <div className="tittle">
              <h3 className="movie-item__tittle">{tittle}</h3>
              <Ratind value={rating.toFixed(1)} />
            </div>
            <span className="movie-item__date">
              {filmDate
                ? format(parseISO(filmDate), 'MMMM dd, yyyy')
                : 'No date'}
            </span>
            <Genres genres={genres} />
            <p className="movie-item__description">
              {description.length > 170
                ? `${this.slicingDescription()}...`
                : defaultDescription}
            </p>
            <Rate
              count={10}
              allowHalf="true"
              className="rate-style"
              value={+localStorage.getItem(id) || +starsCount}
              onChange={this.onChangeStarsCount}
            />
          </div>
        </div>
      </li>
    );
  }
}
