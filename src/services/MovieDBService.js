/* eslint-disable no-return-await */
export default class MovieDbService {
  _apiBase = 'https://api.themoviedb.org/3/';

  _apiKey = 'api_key=cf39818bffaaad23abda4aada5ecc8bc';

  // eslint-disable-next-line class-methods-use-this
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getFilm = async () => {
    return this.getResource().then;
  };

  getMoviesByWord = async (word) => {
    return this.getResource(
      `${this._apiBase}search/movie?${this._apiKey}&language=en-US&query=${word}&page=1&include_adult=false`
    );
  };
}

// https://api.themoviedb.org/3/search/movie?api_key=cf39818bffaaad23abda4aada5ecc8bc&language=en-US&query=return&page=1&include_adult=false
