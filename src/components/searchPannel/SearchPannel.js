/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Input } from 'antd';

import './input.css';

export default class SearchPannel extends Component {
  state = {
    request: null,
  };

  onChangeRequest = (event) => {
    const { onSearchFilms } = this.props;

    this.setState({ request: event.target.value });
    onSearchFilms(event.target.value);
  };

  render() {
    const { request } = this.state;
    return (
      <Input
        placeholder="Type to search"
        type="search"
        value={request}
        onChange={this.onChangeRequest}
      />
    );
  }
}
