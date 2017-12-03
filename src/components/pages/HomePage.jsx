import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { loadMovies } from '../../reducers/actions';

class HomePage extends Component {
	static propTypes = {
		loadMovies: PropTypes.func.isRequired,
		movieList: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				slug: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
	};
	componentWillMount = () => {
		this.props.loadMovies();
	};

	render() {
		const { movieList } = this.props;
		const list =
			movieList &&
			movieList.map(movie => (
				<li className="col-2" key={movie.slug}>
					<Link to={`/watch/${movie.slug}`}>
						<img src={movie.poster} alt={movie.title} />
						<h1>{movie.title}</h1>
						<small>{moment(movie.release).format('Y')}</small>
					</Link>
				</li>
			));
		return (
			<div>
				<h1>HomePage</h1>
				{list && <ul className="row">{list}</ul>}
			</div>
		);
	}
}

export default connect(state => ({ movieList: state.movie.movieList }), { loadMovies })(HomePage);
