/* eslint-disable indent */
/* eslint-disable default-case */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import { Component } from 'react';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

import MovieListItems from '../movieListItems/movieListItems';
import MovieDbService from '../../services/MovieDbService';

export default class Main extends Component {
  movieDbService = new MovieDbService();

  state = {
    data: [],
    loading: true,
    error: false,
    totalPages: 0,
    currentPage: 1,
  };

  componentDidMount() {
    this.uploaded();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    if (prevProps !== this.props || prevState.currentPage !== currentPage) {
      const { request } = this.state;
      const { typeOfSorting } = this.props;

      switch (typeOfSorting) {
        case 'Search':
          this.searchFilmsByWord();

          if (!request) {
            this.clearData();
          }

          break;

        case 'Rated':
          this.getRatedMovies();
          break;
      }
    }
  }

  onFilmsLoaded = (filmsData) => {
    this.setState({
      data: filmsData.results,
      loading: false,
      error: false,
      totalPages: filmsData.total_pages,
    });
  };

  onLoad = () => {
    this.setState(() => ({ loading: true }));
  };

  uploaded = () => {
    this.setState({ loading: false });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  // eslint-disable-next-line react/sort-comp
  searchFilmsByWord = debounce(() => {
    const { currentPage } = this.state;
    const { request } = this.props;
    if (request.length) {
      this.onLoad();
      this.movieDbService
        .getMoviesByWord(request, currentPage)
        .then(this.onFilmsLoaded)
        .catch(this.onError);
    }
  }, 500);

  getRatedMovies = () => {
    const { currentPage } = this.state;
    const { guestSessionId } = this.props;
    this.onLoad();
    this.movieDbService
      .getRatedFilms(guestSessionId, currentPage)
      .then(this.onFilmsLoaded)
      .catch(this.onError);
  };

  pageChange = (currentPage) => this.setState({ currentPage });

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const { loading, error, data, totalPages, currentPage } = this.state;
    const { guestSessionId } = this.props;

    const pagination = data.length ? (
      <Pagination
        defaultCurrent={currentPage}
        size="small"
        pageSize={20}
        showSizeChanger={false}
        total={totalPages * 20}
        onChange={this.pageChange}
      />
    ) : null;

    return (
      <main>
        <MovieListItems
          loading={loading}
          error={error}
          data={data}
          guestSessionId={guestSessionId}
        />
        {pagination}
      </main>
    );
  }
}
