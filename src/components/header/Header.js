import { Component } from 'react';
import { Tabs } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
  render() {
    const { onChangeTypeOfSorting } = this.props;
    const items = [
      {
        label: 'Search',
        key: 'Search',
      },
      {
        label: 'Rate',
        key: 'Rate',
      },
    ];

    return (
      <header>
        <nav>
          <Tabs
            defaultActiveKey="Search"
            centered
            onChange={onChangeTypeOfSorting}
            items={items}
          />
        </nav>
      </header>
    );
  }
}
