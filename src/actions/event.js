import { CREATE_EVENT, GET_EVENT, SET_MESSAGE, PAST_EVENT, UPCOMING_EVENT } from "./types";

import EventService from '../services/event.service';

export const getEvent = (userId) => async (dispatch) => {
    
        try
        {
            const res = await EventService.getEvents(userId)
        
            await dispatch({type: GET_EVENT, payload: res.data});
            await dispatch({type: SET_MESSAGE, payload: "SUCCESS"});

            return res;
        }
        catch(err)
        {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            await dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return message;
        }
}

export const getPastEvent = (userId) => async (dispatch) => {
    
    try
    {
        const res = await EventService.getPastEvents(userId)
    
        await dispatch({type: PAST_EVENT, payload: res.data});
        await dispatch({type: SET_MESSAGE, payload: "SUCCESS"});

        return res;
    }
    catch(err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}

export const getUpcomingEvent = (userId) => async (dispatch) => {
    
    try
    {
        const res = await EventService.getUpcomingEvents(userId)
      
        await dispatch({type: UPCOMING_EVENT, payload: res.data});
        await dispatch({type: SET_MESSAGE, payload: "SUCCESS"});

        return res;
    }
    catch(err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}

export const newEvent = (file, name,opis, datum_izvodjenja,prices ,broj_gostiju, stanje_u_kunama, userId) => async (dispatch) => {

    try{
        const res = await EventService.newEvent(file, name,opis, datum_izvodjenja, prices,broj_gostiju, stanje_u_kunama, userId);

        await dispatch({type: CREATE_EVENT, payload: {event: res.data}});
        await dispatch({type: SET_MESSAGE, payload: res.data.message});

    
        return res.data;
    }
    catch(err)
    {       
       
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    
        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}
