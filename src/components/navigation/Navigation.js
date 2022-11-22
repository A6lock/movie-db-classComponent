/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/state-in-constructor */
import { Component } from 'react';

import './navigation.css';

export default class Navigation extends Component {
  state = {
    data: [
      { type: 'Search', selected: true, id: 1 },
      { type: 'Rated', selected: false, id: 2 },
    ],
  };

  onSelect = (id) => {
    const { onChangeNavType } = this.props;

    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          onChangeNavType(item.type);
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      }),
    }));
  };

  render() {
    const { data } = this.state;

    const navItem = data.map((item) => {
      const { type, id, selected } = item;
      const itemClass = selected ? 'navigation__item-selected' : '';
      return (
        <li
          key={id}
          className={`navigation__item ${itemClass}`}
          onClick={() => this.onSelect(id)}
        >
          {type}
        </li>
      );
    });
    return (
      <nav className="navigation__container">
        <ul className="navigation__list">{navItem}</ul>
      </nav>
    );
  }
}
