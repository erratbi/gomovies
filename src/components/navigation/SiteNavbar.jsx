import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';

const SiteNavbar = ({ location: { pathname } }) => (
	<nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
		<Link className="navbar-brand" to="/">
			ArabWatch
		</Link>
		<button
			className="navbar-toggler"
			data-toggler="collapse"
			data-target="#site-navbar"
			aria-controls="site-navbar"
			aria-expanded="false"
			aria-label="Toggle Navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>
		<div className="collapse navbar-collapse" id="site-navbar">
			<ul className="navbar-nav ml-auto">
				<li className={cx('nav-item', { active: pathname === '/' })}>
					<Link className="nav-link" to="/">
						الرئيسية
					</Link>
				</li>
				<li className={cx('nav-item', { active: pathname === '/movies' })}>
					<Link className="nav-link" to="/movies">
						الافلام
					</Link>
				</li>
				<li className={cx('nav-item', { active: pathname === '/shows' })}>
					<Link className="nav-link" to="/shows">
						المسلسلات
					</Link>
				</li>
			</ul>
			<form className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" type="text" placeholder="أبحث عن..." aria-label="أبحث عن..." />
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
					إبحث
				</button>
			</form>
		</div>
	</nav>
);

SiteNavbar.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default withRouter(SiteNavbar);
