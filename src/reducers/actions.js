import { MOVIE_LOADED, PLAYLIST_LOADED, MOVIE_LIST_LOADED } from './types';
import api from '../api';

export const movieLoaded = movie => ({ type: MOVIE_LOADED, payload: movie });
export const movieListLoaded = movies => ({ type: MOVIE_LIST_LOADED, payload: movies });
export const playlistLoaded = playlist => ({ type: PLAYLIST_LOADED, payload: playlist });

export const loadPlaylist = (link, type) => dispatch =>
	api.movie.getSource(link, type).then(playlist => dispatch(playlistLoaded(playlist)));

export const loadMovie = slug => dispatch => api.movie.load(slug).then(movie => dispatch(movieLoaded(movie)));

export const loadMovies = () => dispatch => api.movie.fetch().then(movies => dispatch(movieListLoaded(movies)));
