import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { loadMovie, loadPlaylist } from '../../reducers/actions';

axios.defaults.baseURL = 'http://localhost:3001';

class WatchPage extends Component {
	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				slug: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		loadMovie: PropTypes.func.isRequired,
		movie: PropTypes.shape({
			title: PropTypes.string.isRequired,
			links: PropTypes.object.isRequired,
		}).isRequired,
		playlist: PropTypes.shape({
			sources: PropTypes.array.isRequired,
		}).isRequired,
	};

	componentWillMount = async () => {
		const { match: { params: { slug } } } = this.props;

		this.jwConfig = {
			width: '1080',
			height: '720',
			aspectratio: '16:9',
			autostart: false,
			controls: true,
			primary: 'html5',
			sources: [{ file: 'video/0.mp4' }],
			abouttext: 'my-Arab.com',
			aboutlink: 'https://my-arab.com',
		};

		this.props.loadMovie(slug).catch(() => {
			this.props.history.push('/');
			return null;
		});
	};

	componentDidMount = () => {
		this.player = window.jwplayer('player');
		this.player.setup(this.jwConfig);
	};

	componentWillReceiveProps = nextProps => {
		const { movie: { links, cover, title, links: { local, remote } }, playlist: { sources } } = nextProps;
		if (links && title !== this.props.movie.title) {
			this.props.loadPlaylist(local, 'l').catch(() => {
				this.props.loadPlaylist(remote, 'r').catch(() => {
					this.props.history.push('/');
				});
			});
		}
		if (sources !== this.props.playlist.sources) {
			this.player.load({ sources });
			this.player.play();
		}
	};

	loadLocal = () => {
		this.player.stop();
		this.props.loadPlaylist(this.props.movie.links.local, 'l');
	};

	loadRemote = () => {
		this.player.stop();
		this.props.loadPlaylist(this.props.movie.links.remote, 'r');
	};

	render() {
		const { movie: { title, poster, description, genres, actors, directors, keywords, links: { local, remote } } } = this.props;

		const actorsList = actors && actors.map(actor => <li key={actor}>{actor}</li>);
		const directorsList = directors && directors.map(director => <li key={director}>{director}</li>);
		const keywordsList = keywords && keywords.map(keyword => <li key={keyword}>{keyword}</li>);
		const genresList = genres && genres.map(genre => <li key={genre}>{genre}</li>);

		return (
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
				<img src={poster} alt={title} />
				<div id="player" />
				{actorsList && <ul>{actorsList}</ul>}
				{directorsList && <ul>{directorsList}</ul>}
				{keywordsList && <ul>{keywordsList}</ul>}
				{genresList && <ul>{genresList}</ul>}
				{local && (
					<button className="primary btn" onClick={this.loadLocal}>
						Server 1
					</button>
				)}
				{remote && (
					<button className="primary btn" onClick={this.loadRemote}>
						Server 2
					</button>
				)}
			</div>
		);
	}
}

export default connect(state => ({ movie: state.movie.selectedMovie, playlist: state.movie.playlist }), { loadMovie, loadPlaylist })(
	WatchPage,
);
