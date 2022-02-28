import { GET_ARTIKAL, CREATE_ARTIKAL, UPDATE_ARTIKAL, GET_STANJE_ARTIKAL } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_ARTIKAL: 
            return { artikal: payload};
        case CREATE_ARTIKAL:
            return { artikal: payload};
        case UPDATE_ARTIKAL:
            return { artikal: payload};
        case GET_STANJE_ARTIKAL:
            return { artikal: payload};
        default: 
            return state;
    }
}