import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <p>Something went wrong</p>;
    }
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
