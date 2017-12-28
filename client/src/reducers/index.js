import {combineReducers} from 'redux';
import registration from './registration';
import current_location from './location';
import user from './user';
import geocode from './geocode';
import schedule from './schedule';


const reducers = combineReducers({
    registration,
    current_location,
    user,
    geocode,
    schedule
});


export default reducers;