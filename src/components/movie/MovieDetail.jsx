import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/fontawesome-free-solid';
import { slugify } from '../../utils/Helpers';

import '../../styles/movie.css';

const Listing = ({ items, title, isHot, url }) => {
	const list =
		items &&
		items.map(item => (
			<li className="list-inline-item" key={`${slugify(item)}`}>
				{isHot ? <Link to={`${url}${slugify(item)}`}>{item}</Link> : item}
			</li>
		));
	return (
		<ul className="listing list-inline">
			<li className="label list-inline-item">{title}</li>
			{list}
		</ul>
	);
};

Listing.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string.isRequired,
	isHot: PropTypes.bool,
	url: PropTypes.string,
};

Listing.defaultProps = {
	items: [],
	isHot: true,
	url: '/',
};

const MovieDetail = ({ movie }) => (
	<div>
		<div id="movie-detail" className="container">
			<nav className="breadcrumb container">
				<Link className="breadcrumb-item" to="/">
					الرئيسية
				</Link>
				<Link className="breadcrumb-item" to="/movies">
					الافلام
				</Link>
				<span className="breadcrumb-item active">{movie.title}</span>
			</nav>
			<div className="cover" style={{ backgroundImage: `url(${movie.cover})` }}>
				<Link className="watch-link" to={`/watch/${movie.slug}`}>
					<FontAwesomeIcon icon={faPlay} size="3x" />
				</Link>
			</div>

			<div className="movie-data row">
				<div className="col-2">
					<img className="poster" src={movie.poster} alt={movie.title} />
				</div>
				<div className="col">
					<h1>{movie.title}</h1>
					<p className="description">{movie.description}</p>
					<div className="lists">
						<Listing url="/genre/" items={movie.genres} title="التصنيف" />
						<Listing url="/actor/" items={movie.actors} title="الممثلون" />
						<Listing url="/director/" items={movie.directors} title="المخرجون" />
						<Listing url="/country/" items={[movie.country]} title="الدولة" />
						<Listing isHot={false} items={[moment(movie.release).format('Y')]} title="السنة" />
						<Listing isHot={false} items={[movie.imdb]} title="Imdb" />
					</div>
				</div>
			</div>
			<div className="movie-keywords">
				<Listing url="/keyword/" items={movie.actors} title="كلمات مفتاحية" />
			</div>
		</div>
	</div>
);

MovieDetail.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
	}).isRequired,
};

export default MovieDetail;
