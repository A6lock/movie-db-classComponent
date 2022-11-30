import { Component } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
  static defaultProps = {
    onChangeTypeOfSorting: () => {},
  };

  render() {
    const { onChangeTypeOfSorting } = this.props;
    const items = [
      {
        label: 'Search',
        key: 'Search',
      },
      {
        label: 'Rated',
        key: 'Rated',
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
            destroyInactiveTabPane="false"
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  onChangeTypeOfSorting: PropTypes.func,
};
