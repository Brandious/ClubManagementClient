import { GET_RASPORED, CREATE_RASPORED, SET_MESSAGE } from "./types";

import RasporedService from '../services/raspored.service';

export const getRaspored = (eventId) => async (dispatch) => {
    
        try
        {
            
            const res = await RasporedService.getRaspored(eventId)
        
            await dispatch({type: GET_RASPORED, payload: res.data});
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


export const createRaspored = (userId, stolovi) => async (dispatch) => {

    try{
        const res = await RasporedService.createRaspored(userId, stolovi);

        await dispatch({type: CREATE_RASPORED, payload: {event: res.data}});
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
