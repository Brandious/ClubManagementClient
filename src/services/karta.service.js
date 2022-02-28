import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? "api/":"http://localhost:3002/api/";
const getKarte = (eventId) =>{ 
    
    console.log(eventId);
    return axios.get(API_URL + 'izlistajKartu', {headers: {...authHeader(), "Content-type": "application/json"}, params: {eventId: eventId}});


}

const prodajKarte = (kartaId, userId, cijenaKarte, brojKarti,rezervacija, email) => {
    
     
    
    
   return axios.post(API_URL + 'prodajKartu', {kartaId, userId, cijenaKarte,brojKarti,rezervacija, email} ,{headers: {...authHeader(), "Content-type": "application/json" }})


};

// const deleteEvent = (contactId) => axios.delete(API_URL + 'contact', {headers: authHeader(), data: {contactId}});

// const updateEvent = (contactId, name, email, number) => axios.patch(API_URL + 'contact',{contactId, name, email, number} ,{headers: authHeader()});

export default {
// /    getContacts,
    getKarte,
    prodajKarte
    //deleteContact,
    //updateContact
}