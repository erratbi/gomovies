import axios from 'axios';

axios.defaults.baseURL = 'http://localhosdt:3001/';

export default {
	movie: {
		getMovie: slug => axios.get(`/api/movie/${slug}`).then(res => res.data.movie),
		getSource: (link, type) => axios.get(`/api/source/${type}/${link}`).then(res => res.data),
		getMovies: () => axios.get('/api/movie').then(res => res.data.movies),
		getRecommended: slug => axios.get(`/api/recommended/${slug}`).then(res => res.data.movies),
	},
};
