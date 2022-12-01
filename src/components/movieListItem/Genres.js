import { Component } from 'react';

export default class Genres extends Component {
  render() {
    const { genres } = this.props;

    const genresList = genres.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="genres__item" key={index}>
        {item}
      </li>
    ));
    return <ul className="genres__list">{genresList}</ul>;
  }
}
