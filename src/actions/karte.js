import { PRODAJ_KARTU, GET_PRODANE_KARTE, SET_MESSAGE } from "./types";

import KarteService from '../services/karta.service';

export const getProdaneKarte = (eventId) => async (dispatch) => {
    
        try
        {
            const res = await KarteService.getKarte(eventId)
        
            await dispatch({type: GET_PRODANE_KARTE, payload: res.data});
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


export const prodajKartu = (kartaId, userId, cijenaKarte,email, number) => async (dispatch) => {

    try{
        const res = await KarteService.prodajKarte(kartaId, userId, cijenaKarte, number, 1,email);

        await dispatch({type: PRODAJ_KARTU, payload: {event: res.data}});
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
