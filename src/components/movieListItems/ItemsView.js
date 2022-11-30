/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/require-render-return */
import { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable camelcase */
import MovieListItem from '../movieListItem/MovieListItem';

export default class ItemsView extends Component {
  static defaultProps = {
    data: [],
    genresArr: [],
  };

  render() {
    const { data, genresArr } = this.props;

    const visibleData = data.map((item) => {
      const {
        id,
        original_title,
        release_date,
        overview,
        poster_path,
        genre_ids,
        vote_average,
      } = item;

      const genres = genre_ids.reduce((acc, id) => {
        const genreName = genresArr.find((genre) => genre.id === id).name;
        acc.push(genreName);
        return acc;
      }, []);

      return (
        <MovieListItem
          key={id}
          tittle={original_title}
          filmDate={release_date}
          description={overview}
          poster={poster_path}
          genres={genres}
          rating={vote_average}
          id={id}
        />
      );
    });
    return visibleData;
  }
}

ItemsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  genresArr: PropTypes.arrayOf(PropTypes.object),
};
