/* eslint-disable indent */
/* eslint-disable default-case */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import { Component } from 'react';
import { Tabs, Input } from 'antd';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import Main from '../main/Main';
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

  onChangeRequest = (event) => {
    this.setState({ request: event.target.value });
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

    const items = [
      {
        label: 'Search',
        key: 'Search',
        children: (
          <div className="app">
            <div className="app__container">
              <OfflineMessage />
              <Input
                className="search-pannel"
                placeholder="Type to search"
                type="search"
                value={request}
                onChange={this.onChangeRequest}
              />
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
        ),
      },
      {
        label: 'Rate',
        key: 'Rate',
        children: (
          <div className="app">
            <div className="app__container">
              <OfflineMessage />
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
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={this.onChangeTypeOfSorting}
        items={items}
        destroyInactiveTabPane="true"
      />
    );
  }
}
