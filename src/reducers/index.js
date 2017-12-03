import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import movie from './movie';

export default combineReducers({ movie, form });
