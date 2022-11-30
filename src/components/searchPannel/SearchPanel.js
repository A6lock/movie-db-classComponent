/* eslint-disable react/state-in-constructor */
import { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import './searchPanel.css';

export default class SearchPanel extends Component {
  static defaultProps = {
    onChangeRequest: () => {},
  };

  state = {
    inputValue: '',
  };

  componentDidMount() {
    const { inputValue } = this.props;

    this.setState({ inputValue });
  }

  onChangeInputValue = (event) => {
    const { onChangeRequest } = this.props;
    const inputValue = event.target.value;

    this.setState({ inputValue });

    onChangeRequest(inputValue);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Input
        className="search-pannel"
        placeholder="Type to search"
        type="search"
        value={inputValue}
        onChange={this.onChangeInputValue}
      />
    );
  }
}

SearchPanel.propTypes = {
  onChangeRequest: PropTypes.func,
};
