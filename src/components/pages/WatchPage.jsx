import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { getMovie, getPlaylist } from '../../reducers/movie';

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
		movie: PropTypes.shape({
			title: PropTypes.string.isRequired,
			links: PropTypes.object.isRequired,
		}).isRequired,
		playlist: PropTypes.shape({
			sources: PropTypes.array.isRequired,
		}).isRequired,
		getMovie: PropTypes.func.isRequired,
		getPlaylist: PropTypes.func.isRequired,
	};

	componentWillMount = async () => {
		const { match: { params: { slug } } } = this.props;
		const file = 'http://localhost:3001/server.m3u';

		this.jwConfig = {
			width: '1080',
			height: '720',
			aspectratio: '16:9',
			autostart: false,
			controls: true,
			primary: 'html5',
			playlist: [
				{
					sources: [
						{
							file: 'http://localhost:3001/playlist',
							type: 'm3u8',
						},
					],
				},
			],
			abouttext: 'my-Arab.com',
			aboutlink: 'https://my-arab.com',
		};

		this.props.getMovie(slug).catch(() => {
			this.props.history.push('/');
			return null;
		});
	};

	componentDidMount = () => {
		this.player = window.jwplayer('player');
		this.player.setup(this.jwConfig);
	};

	componentWillReceiveProps = nextProps => {};

	loadLocal = () => {
		this.player.stop();
		this.props.getPlaylist(this.props.movie.links.local, 'l');
	};

	loadRemote = () => {
		this.player.stop();
		this.props.getPlaylist(this.props.movie.links.remote, 'r');
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

export default connect(state => ({ movie: state.movie.movie, playlist: state.movie.playlist }), { getMovie, getPlaylist })(WatchPage);
