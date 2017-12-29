import {combineReducers} from 'redux';
import registration from './registration';
import current_location from './location';
import user from './user';
import geocode from './geocode';
import schedule from './schedule';
import events from './events';


const reducers = combineReducers({
    registration,
    current_location,
    user,
    geocode,
    schedule,
    events
});


export default reducers;