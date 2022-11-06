/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Alert } from 'antd';
import { debounce } from 'lodash';

import MovieDbService from '../../services/MovieDbService';
import MovieListItem from '../movieListItem/MovieListItem';
import Spiner from '../spiner/Spiner';

import './movieListItems.css';

export default class MovieListItems extends Component {
  movieDbService = new MovieDbService();

  state = {
    // eslint-disable-next-line react/no-unused-state
    data: [],
    // eslint-disable-next-line react/no-unused-state
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchText !== prevProps.searchText) {
      if (this.props.searchText.length > 0) {
        this.searchFilmsByWord(`${this.props.searchText}`);
      }
      if (!this.props.searchText) this.clearData();
    }
  }

  clearData = () => {
    this.setState({ data: [] });
  };

  onFilmsLoaded = (filmsData) => {
    this.setState({
      data: filmsData.results,
      loading: false,
    });
  };

  onLoad = () => {
    this.setState(() => ({ loading: true }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  // eslint-disable-next-line react/sort-comp
  searchFilmsByWord = debounce((searchText) => {
    if (this.props.searchText.length) {
      this.onLoad();
      this.movieDbService
        .getMoviesByWord(searchText)
        .then(this.onFilmsLoaded)
        .catch(this.onError);
    }
  }, 1000);

  render() {
    const { loading, error, data } = this.state;
    const { searchText } = this.props;

    const ulStyle = loading
      ? 'moveie-list-items--center '
      : error
      ? 'moveie-list-items--center'
      : 'moveie-list-items';

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="An error has occurred, we are working to fix it. Try again later."
        type="error"
        showIcon
        closable
      />
    ) : null;

    const spinner = loading ? <Spiner /> : null;
    const viewData =
      searchText.length === 0 || !data.length ? (
        <NoResult />
      ) : (
        <ItemsView data={data} />
      );
    const viewContent = !loading && !error ? viewData : null;

    return (
      <ul className={ulStyle}>
        {errorMessage}
        {spinner}
        {viewContent}
      </ul>
    );
  }
}

const ItemsView = ({ data }) => {
  const visibleData = data.map((item) => {
    const { id, original_title, release_date, overview, poster_path } = item;
    return (
      <MovieListItem
        key={id}
        tittle={original_title}
        filmDate={release_date}
        description={overview}
        poster={poster_path}
      />
    );
  });

  return visibleData;
};

function NoResult() {
  return (
    <h1 className="moveie-list-items--no-results">
      The search has not given any results. Try another request.
    </h1>
  );
}
