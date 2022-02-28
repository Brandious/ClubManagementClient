import { CREATE_ARTIKAL, GET_ARTIKAL, UPDATE_ARTIKAL, GET_STANJE_ARTIKAL,SET_MESSAGE } from "./types";

import ArtikalService from '../services/artikal.service';

export const getArtikle = (userId) => async (dispatch) => {
    
        try
        {
            const res = await ArtikalService.getArtikle(userId)
        
            await dispatch({type: GET_ARTIKAL, payload: res.data});
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


export const getStanjeArtikle = (userId) => async (dispatch) => {
    
    try
    { 
        const res = await ArtikalService.getStanjeArtikla(userId)
    
        await dispatch({type: GET_STANJE_ARTIKAL, payload: res.data});
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


export const newArtikal = (naziv, mjer_jed, redni_broj, popisanoKnjigovodstvo, eventId) => async (dispatch) => {

    try{
    
    const res = await ArtikalService.newArtikal(naziv, mjer_jed, redni_broj, popisanoKnjigovodstvo, eventId);

    await dispatch({type: CREATE_ARTIKAL, payload: {event: res.data}});
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

export const updateArtikal = (artikalId, popisana_kolicina) => async (dispatch) => {

    try{
    
    const res = await ArtikalService.updateArtikal(artikalId, popisana_kolicina);

    await dispatch({type: UPDATE_ARTIKAL, payload: {event: res.data}});
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
