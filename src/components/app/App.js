import { Component } from 'react';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import Header from '../header/Header';
import Main from '../main/Main';
import SearchPanel from '../searchPannel/SearchPanel';
import MovieDbService from '../../services/MovieDbService';
import { GenresProvider } from '../movieDbContexts/movieDbContext';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.css';

export default class App extends Component {
  movieDbService = new MovieDbService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    request: '',
    genres: null,
    guestSessionId: localStorage.getItem('guestSessionId') || null,
    typeOfSorting: 'Search',
  };

  componentDidMount() {
    const { guestSessionId, genres } = this.state;
    if (!genres) {
      this.getGenres();
    }

    if (guestSessionId === null) {
      this.getSessionId();
    }
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
    const guestSessionId = response.guest_session_id;

    localStorage.setItem('guestSessionId', `${guestSessionId}`);

    this.setState({ guestSessionId });
  };

  getSessionId = () => {
    this.movieDbService.createGuestSessions().then(this.sessionLoaded);
  };

  render() {
    const { request, genres, typeOfSorting, guestSessionId } = this.state;

    const searchVisible =
      typeOfSorting === 'Search' ? (
        <SearchPanel
          onChangeRequest={this.onChangeRequest}
          inputValue={request}
        />
      ) : null;

    return (
      <div className="app">
        <div className="app__container">
          <ErrorBoundary>
            <Header onChangeTypeOfSorting={this.onChangeTypeOfSorting} />
            <OfflineMessage />
            {searchVisible}
            <GenresProvider value={genres}>
              <Main
                request={request}
                typeOfSorting={typeOfSorting}
                guestSessionId={guestSessionId}
              />
            </GenresProvider>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
