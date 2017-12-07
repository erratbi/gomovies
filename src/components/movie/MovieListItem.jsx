import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

const MovieListItem = ({ slug, poster, title, release }) => (
	<li className="col-6 col-sm-4 col-md-3 col-lg-2 movie-item-wrap">
		<div className="movie-item">
			<Link to={`/show/${slug}`}>
				<LazyLoad height={200}>
					<img src={poster} alt={title} />
				</LazyLoad>
				<h1>
					{title}
					<small>{moment(release).format('Y')}</small>
				</h1>
			</Link>
		</div>
	</li>
);

MovieListItem.propTypes = {
	slug: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	release: PropTypes.string.isRequired,
};

export default MovieListItem;
