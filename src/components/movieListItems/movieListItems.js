/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Alert } from 'antd';

import { MovieConsumer } from '../movieDbContext/movieDbContext';
import Spiner from '../spiner/Spiner';

import ItemsView from './ItemsView';

import './movieListItems.css';

export default class MovieListItems extends Component {
  render() {
    const { loading, error, data } = this.props;

    const ulStyle = loading
      ? 'moveie-list-items--center '
      : error
      ? 'moveie-list-items--error'
      : 'moveie-list-items';

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="An error has occurred, we are working to fix it. Try again later."
        type="error"
        showIcon
        closable
      />
    ) : null;

    const spinner = loading ? <Spiner /> : null;
    const viewContent =
      !loading && !error ? (
        <MovieConsumer>
          {(value) => {
            return <ItemsView data={data} genresArr={value} />;
          }}
        </MovieConsumer>
      ) : null;

    // const noResults = !data.length ? <NoResult /> : null;

    return (
      <ul className={ulStyle}>
        {errorMessage}
        {viewContent}
        {spinner}
      </ul>
    );
  }
}

// function NoResult() {
//  return <h1>The search has not given any results. Try another request.</h1>;
// }
