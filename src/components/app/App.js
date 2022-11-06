import { Component } from 'react';
import { Input } from 'antd';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import MovieListItems from '../movieListItems/MovieListItems';

import './app.css';
import './input.css';

export default class App extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    searchText: '',
  };

  // eslint-disable-next-line class-methods-use-this
  onSearchFilms = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { searchText } = this.state;
    return (
      <div className="app">
        <div className="app__container">
          <OfflineMessage />
          <Input
            placeholder="Type to search"
            type="search"
            value={searchText}
            onChange={this.onSearchFilms}
          />
          <MovieListItems searchText={searchText} />
        </div>
      </div>
    );
  }
}
