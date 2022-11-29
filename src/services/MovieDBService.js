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

  // eslint-disable-next-line class-methods-use-this
  postResource = (url, value) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value }),
    });
  };

  getGeners = async () => {
    return this.getResource(
      `${this._apiBase}genre/movie/list?${this._apiKey}&language=en-US`
    );
  };

  getMoviesByWord = async (movie, page) => {
    return this.getResource(
      `${this._apiBase}search/movie?${this._apiKey}&language=en-US&query=${movie}&page=${page}&include_adult=false`
    );
  };

  createGuestSessions = async () => {
    return this.getResource(
      `${this._apiBase}authentication/guest_session/new?${this._apiKey}`
    );
  };

  rateMovie = async (value, movieId, guestSession) => {
    return this.postResource(
      `${this._apiBase}movie/${movieId}/rating?${this._apiKey}&guest_session_id=${guestSession}`,
      value
    );
  };

  getRatedFilms = async (guestSessionId, page) => {
    return this.getResource(
      `${this._apiBase}guest_session/${guestSessionId}/rated/movies?${this._apiKey}&page=${page}&language=en-US&sort_by=created_at.asc`
    );
  };
}
