import { createAction, handleActions } from 'redux-actions';
import api from '../api';

// Actions

export const getMovies = createAction('MOVIES_GET', api.movie.getMovies);
export const getMovie = createAction('MOVIE_GET', slug => api.movie.getMovie(slug));
export const getRecommended = createAction('RECOMMENDED_GET', slug => api.movie.getRecommended(slug));

// State

const initialState = {
	fetching: false,
	fetched: false,
	error: {},
	movie: {
		slug: '',
		title: '',
		links: {
			local: '',
			remote: '',
		},
	},
	movies: [],
	recommended: [],
	playlist: {
		sources: [],
	},
};

// Reducer

export default handleActions(
	{
		MOVIES_GET_PENDING: state => ({
			...state,
			fetching: true,
			fetched: false,
		}),
		MOVIES_GET_REJECTED: (state, action) => ({
			...state,
			fetched: false,
			fetching: false,
			error: action.payload,
		}),
		MOVIES_GET_FULFILLED: (state, action) => ({
			...state,
			fetched: true,
			fetching: false,
			movies: action.payload,
		}),
		MOVIE_GET_PENDING: state => ({
			...state,
			fetching: true,
			fetched: false,
		}),
		MOVIE_GET_REJECTED: (state, action) => ({
			...state,
			fetched: false,
			fetching: false,
			error: action.payload,
		}),
		MOVIE_GET_FULFILLED: (state, action) => ({
			...state,
			fetched: true,
			fetching: false,
			movie: action.payload,
		}),
		RECOMMENDED_GET_PENDING: state => ({
			...state,
			fetching: true,
			fetched: false,
		}),
		RECOMMENDED_GET_REJECTED: (state, action) => ({
			...state,
			fetched: false,
			fetching: false,
			error: action.payload,
		}),
		RECOMMENDED_GET_FULFILLED: (state, action) => ({
			...state,
			fetched: true,
			fetching: false,
			recommended: action.payload,
		}),
	},
	initialState,
);
