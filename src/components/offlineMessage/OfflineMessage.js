import { Component } from 'react';
import { Alert } from 'antd';

import './offlineMessage.css';

export default class OfflineMessage extends Component {
  state = {
    networkStatus: true,
  };

  componentDidMount() {
    setInterval(() => this.setState({ networkStatus: this.isOnline() }), 1000);
  }

  // eslint-disable-next-line class-methods-use-this
  isOnline = () => {
    return navigator.onLine;
  };

  render() {
    const { networkStatus } = this.state;

    const offlineMessage = networkStatus ? null : (
      <Alert
        message="Warning"
        description="The Internet connection is lost."
        type="warning"
        showIcon
        closable
        className="offline"
      />
    );
    return offlineMessage;
  }
}
