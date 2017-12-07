import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import MovieList from '../movie/MovieList';
import { getMovies } from '../../reducers/movie';

class HomePage extends Component {
	static propTypes = {
		getMovies: PropTypes.func.isRequired,
		movies: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				slug: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
		loaded: PropTypes.bool.isRequired,
		fetched: PropTypes.bool.isRequired,
	};
	componentWillMount = () => {
		this.props.getMovies();
	};

	render() {
		const { movies, fetched } = this.props;
		return (
			<div className="container">
				<div className={cx({ invisible: !this.props.loaded })}>
					{fetched && (
						<div className="row">
							<h1>احدث الافلام</h1>
							<MovieList movies={movies} />
						</div>
					)}
				</div>
				{!this.props.loaded && (
					<div className="loading-wrap">
						<div className="loading" />
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		loaded: !state.loadingBar.default,
		movies: state.movie.movies,
		fetched: state.movie.fetched,
	}),
	{
		getMovies,
	},
)(HomePage);
