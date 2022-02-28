import {PRODAJ_KARTU, GET_PRODANE_KARTE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case PRODAJ_KARTU: 
            return { karte: payload};
        case GET_PRODANE_KARTE:
            return { karte: payload};
        default: 
            return state;
    }
}