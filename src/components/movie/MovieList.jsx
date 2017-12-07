import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
	static propTypes = {
		movies: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				slug: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
	};

	state = {
		progress: 0,
		loaded: false,
	};

	progressDone = () => {
		this.setState({ progress: 0, loaded: true });
	};

	render() {
		const { movies } = this.props;
		const list = movies && movies.map(movie => <MovieListItem key={movie.slug} {...movie} />);

		return (
			<div>
				<ul className="movie-list row">{list}</ul>
			</div>
		);
	}
}

export default MovieList;
