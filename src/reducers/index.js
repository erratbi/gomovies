import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import movie from './movie';

export default combineReducers({ movie, form, loadingBar });
