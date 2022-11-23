/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import { Component } from 'react';
import { Tabs, Input } from 'antd';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import Main from '../main/Main';
import MovieDbService from '../../services/MovieDbService';
import { MovieProvider } from '../movieDbContext/movieDbContext';

import './app.css';

export default class App extends Component {
  movieDbService = new MovieDbService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    request: '',
    genres: null,
    guestSessionId: null,
  };

  componentDidMount() {
    this.getGenres();
    this.getSessionId();
  }

  onChangeRequest = (event) => {
    this.setState({ request: event.target.value });
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
    const { request, genres } = this.state;

    // console.log(guestSessionId);

    return (
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Search" key="1">
          <div className="app">
            <div className="app__container">
              <OfflineMessage />
              <MovieProvider value={genres}>
                <Tabs />
                <Input
                  placeholder="Type to search"
                  type="search"
                  value={request}
                  onChange={this.onChangeRequest}
                />
                <Main request={request} />
              </MovieProvider>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rate" key="2">
          <div className="app">
            <div className="app__container">
              <OfflineMessage />
              <Main request={request} />
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
