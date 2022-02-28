import { GET_EVENT, CREATE_EVENT, PAST_EVENT, UPCOMING_EVENT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_EVENT: 
            return { events: payload};
        case CREATE_EVENT:
            return { event: payload};
        case PAST_EVENT: 
            return { events: payload};
        case UPCOMING_EVENT:
            return { event: payload};
        default: 
            return state;
    }
}