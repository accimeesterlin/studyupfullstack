import {combineReducers} from 'redux';
import registration from './registration';
import current_location from './location';
import user from './user';


const reducers = combineReducers({
    registration,
    current_location,
    user
});


export default reducers;