import { Input } from 'antd';

import OfflineMessage from '../offlineMessage/OfflineMessage';
import MovieListItems from '../movieListItems/MovieListItems';

import './app.css';
import './input.css';

export default function App() {
  return (
    <div className="app">
      <div className="app__container">
        <OfflineMessage />
        <Input placeholder="Type to search" />
        <MovieListItems />
      </div>
    </div>
  );
}
