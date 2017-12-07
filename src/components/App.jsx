import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import WatchPage from './pages/WatchPage';
import SiteNavbar from './navigation/SiteNavbar';

const App = ({ location }) => (
	<div>
		<SiteNavbar />
		<Route exact location={location} path="/" component={HomePage} />
		<Route exact location={location} path="/show/:slug" component={DetailPage} />
		<Route exact location={location} path="/watch/:slug" component={WatchPage} />
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default App;
