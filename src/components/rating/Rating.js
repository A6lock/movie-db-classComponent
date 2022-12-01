/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import { Component } from 'react';

import './rating.css';

export default class Ratind extends Component {
  render() {
    const { value } = this.props;

    const borderColor =
      value <= 3
        ? '#E90000'
        : value <= 5
        ? '#E97E00'
        : value <= 7
        ? '#E9D100'
        : '#66E900';

    return (
      <div className="rating" style={{ borderColor }}>
        {value}
      </div>
    );
  }
}
