import {CREATE_RASPORED, GET_RASPORED } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_RASPORED: 
            return { raspored: payload};
        case CREATE_RASPORED:
            return { raspored: payload};
        default: 
            return state;
    }
}