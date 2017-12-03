import { MOVIE_LOADED, PLAYLIST_LOADED, MOVIE_LIST_LOADED } from './types';

const initialState = {
	selectedMovie: {
		title: '',
		links: {
			local: '',
			remote: '',
		},
	},
	movieList: [],
	playlist: {
		sources: [],
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case MOVIE_LOADED:
			return { ...state, selectedMovie: action.payload };
		case PLAYLIST_LOADED:
			return { ...state, playlist: action.payload };
		case MOVIE_LIST_LOADED:
			return { ...state, movieList: action.payload };
		default:
			return state;
	}
};
