import { Component } from 'react';
import { Pagination } from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import MovieListItems from '../movieListItems/movieListItems';
import MovieDbService from '../../services/MovieDbService';

export default class Main extends Component {
  static defaultProps = {
    request: '',
    typeOfSorting: 'Search',
    guestSessionId: '',
  };

  movieDbService = new MovieDbService();

  state = {
    data: [],
    loading: true,
    error: false,
    noData: false,
    totalPages: 0,
    currentPage: 1,
  };

  componentDidMount() {
    this.upLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    if (prevProps !== this.props || prevState.currentPage !== currentPage) {
      const { typeOfSorting, request } = this.props;

      // eslint-disable-next-line default-case
      switch (typeOfSorting) {
        case 'Search':
          this.clearData();
          this.searchFilmsByWord();

          if (!request) {
            this.clearData();
            this.setState({ noData: false });
          }
          break;

        case 'Rated':
          this.getRatedMovies();
          break;
      }
    }
    window.scrollTo(0, 0);
  }

  onFilmsLoaded = (filmsData) => {
    const { currentPage } = this.state;
    this.setState({
      data: filmsData.results,
      loading: false,
      error: false,
      noData: !(filmsData.results.length > 0),
      totalPages: filmsData.total_pages,
      currentPage,
    });
  };

  onLoad = () => {
    this.setState(() => ({ loading: true }));
  };

  upLoad = () => {
    this.setState(() => ({ loading: false }));
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
    const { loading, error, data, totalPages, currentPage, noData } =
      this.state;

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
          noData={noData}
        />
        {pagination}
      </main>
    );
  }
}

Main.propTypes = {
  request: PropTypes.string,
  typeOfSorting: PropTypes.string,
  guestSessionId: PropTypes.string,
};
