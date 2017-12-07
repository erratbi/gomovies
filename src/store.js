import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from './reducers';

const middleware = composeWithDevTools(applyMiddleware(promiseMiddleware(), loadingBarMiddleware()));

const store = createStore(rootReducer, middleware);

export default store;
