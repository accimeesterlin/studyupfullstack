import {combineReducers} from 'redux';
import registration from './registration';
import current_location from './location';
import user from './user';
import geocode from './geocode';


const reducers = combineReducers({
    registration,
    current_location,
    user,
    geocode
});


export default reducers;