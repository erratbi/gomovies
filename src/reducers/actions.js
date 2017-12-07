import { createAction } from 'redux-actions';
import { MOVIE_LOADED, PLAYLIST_LOADED, MOVIE_LIST_LOADED, RECOMMENDED_MOVIES_LOADED } from './types';
import api from '../api';

export const movieLoaded = movie => ({ type: MOVIE_LOADED, payload: movie });
export const movieListLoaded = movies => ({ type: MOVIE_LIST_LOADED, payload: movies });
export const playlistLoaded = playlist => ({ type: PLAYLIST_LOADED, payload: playlist });
export const recommendedMoviesLoaded = movies => ({ type: RECOMMENDED_MOVIES_LOADED, payload: movies });

export const loadPlaylist = (link, type) => createAction('LOAD_PLAYLIST', api.movie.getSource(link, type));
export const loadMovie = slug => createAction('LOAD_MOVIE', api.movie.load(slug));
export const loadMovieList = () => createAction('LOAD_MOVIE_LIST', api.movie.fetch());
export const loadRecommendedMovies = () => createAction('LOAD_RECOMMMENDED', api.movie.getRecommended());
