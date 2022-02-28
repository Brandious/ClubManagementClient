import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import event from './event';
import artikal from './artikal';
import karte from './karte';
import raspored from './raspored';

export default combineReducers({
    auth,
    message,
    event,
    artikal,
    karte,
    raspored
})