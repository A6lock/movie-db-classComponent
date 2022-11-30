/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    error: false.valueOf,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <p>Something went wrong</p>;
    }
    return this.props.children;
  }
}
