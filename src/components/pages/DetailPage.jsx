import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getMovie, getRecommended } from '../../reducers/movie';
import MovieDetail from '../movie/MovieDetail';
import MovieList from '../movie/MovieList';
import { scrollTo } from '../../utils/Helpers';

class DetailPage extends Component {
	static propTypes = {
		getMovie: PropTypes.func.isRequired,
		getRecommended: PropTypes.func.isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				slug: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		movie: PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}).isRequired,
		recommended: PropTypes.arrayOf(
			PropTypes.shape({
				slug: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
		fetching: PropTypes.bool.isRequired,
		fetched: PropTypes.bool.isRequired,
		loaded: PropTypes.bool.isRequired,
	};

	componentDidMount = async () => {
		this.shouldScroll = false;
		const { match: { params: { slug } } } = this.props;
		this.props
			.getMovie(slug)
			.then(() => {
				this.props.getRecommended(slug);
			})
			.catch(() => {
				this.props.history.push('/');
				return null;
			});
	};
	componentWillReceiveProps = nextProps => {
		const { match: { params: { slug } } } = nextProps;
		if (this.props.fetched && !this.props.fetching && this.props.movie.slug !== slug) {
			scrollTo(0, 500);
			this.props
				.getMovie(slug)
				.then(() => {
					this.props.getRecommended(slug);
				})
				.catch(() => {
					this.props.history.push('/');
					return null;
				});
		}
	};

	render() {
		const { movie, loaded } = this.props;
		const { recommended } = this.props;
		return (
			<div>
				{!this.props.loaded && (
					<div className="loading-wrap">
						<div className="loading" />
					</div>
				)}
				<div className={cx({ invisible: !loaded })}>
					<MovieDetail movie={movie} />
					<div id="recommended">
						{recommended && (
							<div className="container">
								<h2>إخترنا لك</h2>
								<MovieList movies={recommended} />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		loaded: !state.loadingBar.default,
		movie: state.movie.movie,
		recommended: state.movie.recommended,
		fetching: state.movie.fetching,
		fetched: state.movie.fetched,
	}),
	{
		getMovie,
		getRecommended,
	},
)(DetailPage);
