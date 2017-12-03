import axios from 'axios';

axios.defaults.baseURL = 'http://1000mabrouk.ma:3001/';

export default {
	movie: {
		load: slug => axios.get(`/api/movie/${slug}`).then(res => res.data.movie),
		getSource: (link, type) => axios.get(`/api/source/${type}/${link}`).then(res => res.data),
		fetch: () => axios.get('/api/movie').then(res => res.data.movies),
	},
};
