/* eslint-disable indent */
import { Component } from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import { GenresConsumer } from '../movieDbContexts/movieDbContext';
import Spiner from '../spiner/Spiner';

import ItemsView from './ItemsView';
import noResultPicture from './noContentPicture.png';

import './movieListItems.css';

export default class MovieListItems extends Component {
  static defaultProps = {
    loading: false,
    error: false,
    data: [],
    noData: false,
  };

  render() {
    const { loading, error, data, noData } = this.props;

    const ulStyle =
      // eslint-disable-next-line no-nested-ternary
      loading || !data.length
        ? 'moveie-list-items--center '
        : error
        ? 'moveie-list-items--error'
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

    const noResult = (
      <img
        src={noResultPicture}
        className="movei-list-items__no-result"
        alt="no result"
      />
    );

    const spinner = loading ? <Spiner /> : null;

    const visibleContent =
      // eslint-disable-next-line no-nested-ternary
      !loading && !error ? (
        noData ? (
          noResult
        ) : (
          <GenresConsumer>
            {(genres) => <ItemsView data={data} genresArr={genres} />}
          </GenresConsumer>
        )
      ) : null;

    return (
      <ul className={ulStyle}>
        {errorMessage}
        {visibleContent}
        {spinner}
      </ul>
    );
  }
}

MovieListItems.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.object),
  noData: PropTypes.bool,
};
