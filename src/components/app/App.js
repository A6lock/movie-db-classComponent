import { Component } from 'react';

import SearchPannel from '../searchPannel/SearchPannel';
import OfflineMessage from '../offlineMessage/OfflineMessage';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import MovieDbService from '../../services/MovieDbService';
import { MovieProvider } from '../movieDbContext/movieDbContext';

import './app.css';

export default class App extends Component {
  movieDbService = new MovieDbService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    request: '',
    navType: 'Search',
    genres: null,
  };

  componentDidMount() {
    this.getGenres();
  }

  onSearchFilms = (request) => {
    this.setState({ request });
  };

  onChangeNavType = (value) => {
    this.setState({ navType: value });
  };

  genresLoaded = (response) => {
    this.setState({ genres: response.genres });
  };

  getGenres = () => {
    this.movieDbService.getGeners().then(this.genresLoaded);
  };

  render() {
    const { request, navType, genres } = this.state;

    // if (!request) this.clearData();

    const visibleData =
      navType === 'Search' ? (
        <div className="app">
          <div className="app__container">
            <OfflineMessage />
            <MovieProvider value={genres}>
              <Navigation onChangeNavType={this.onChangeNavType} />
              <SearchPannel onSearchFilms={this.onSearchFilms} />
              <Main request={request} />
            </MovieProvider>
          </div>
        </div>
      ) : (
        <div className="app">
          <div className="app__container">
            <OfflineMessage />
            <Navigation onChangeNavType={this.onChangeNavType} />
            <Main request={request} />
          </div>
        </div>
      );

    return { ...visibleData };
  }
}
