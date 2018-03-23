import {combineReducers} from 'redux';
import {tagsReducer} from './tagsReducer';
import {feedReducer} from './feedReducer';

export const mainReducer = combineReducers({
    tags: tagsReducer,
    feed: feedReducer
});
