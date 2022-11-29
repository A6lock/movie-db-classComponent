/* eslint-disable indent */
/* eslint-disable default-case */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import { Component } from 'react';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import Header from '../header/Header';
import Main from '../main/Main';
import SearchPanel from '../searchPannel/SearchPanel';
import MovieDbService from '../../services/MovieDbService';
import {
  GenresProvider,
  GuestSessionProvider,
} from '../movieDbContexts/movieDbContext';

import './app.css';

export default class App extends Component {
  movieDbService = new MovieDbService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    request: '',
    genres: null,
    guestSessionId: null,
    typeOfSorting: 'Search',
  };

  componentDidMount() {
    this.getGenres();
    this.getSessionId();
  }

  onChangeRequest = (request) => {
    this.setState({ request });
  };

  onChangeTypeOfSorting = (tabName) => {
    this.setState({ typeOfSorting: tabName });
  };

  genresLoaded = (response) => {
    this.setState({ genres: response.genres });
  };

  getGenres = () => {
    this.movieDbService.getGeners().then(this.genresLoaded);
  };

  sessionLoaded = (response) => {
    this.setState({ guestSessionId: response.guest_session_id });
  };

  getSessionId = () => {
    this.movieDbService.createGuestSessions().then(this.sessionLoaded);
  };

  render() {
    const { request, genres, typeOfSorting, guestSessionId } = this.state;

    return (
      <div className="app">
        <div className="app__container">
          <Header onChangeTypeOfSorting={this.onChangeTypeOfSorting} />
          <OfflineMessage />
          {typeOfSorting === 'Search' ? (
            <SearchPanel
              onChangeRequest={this.onChangeRequest}
              inputValue={request}
            />
          ) : null}
          <GenresProvider value={genres}>
            <GuestSessionProvider value={guestSessionId}>
              <Main
                request={request}
                typeOfSorting={typeOfSorting}
                guestSessionId={guestSessionId}
              />
            </GuestSessionProvider>
          </GenresProvider>
        </div>
      </div>
    );
  }
}
