import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? "api/":"http://localhost:3002/api/";
const getRaspored = (eventId) =>{ 
    
    
    return axios.get(API_URL + 'getRaspored', {headers: {...authHeader(), "Content-type": "application/json"}, params: {eventId: eventId}});


}

const createRaspored = (userId, stolovi) => {
    
     
    console.log(stolovi);
    
   return axios.post(API_URL + 'createRaspored', {userId, stolovi} ,{headers: {...authHeader(), "Content-type": "application/json" }})


};

// const deleteEvent = (contactId) => axios.delete(API_URL + 'contact', {headers: authHeader(), data: {contactId}});

// const updateEvent = (contactId, name, email, number) => axios.patch(API_URL + 'contact',{contactId, name, email, number} ,{headers: authHeader()});

export default {
// /    getContacts,
    getRaspored,
    createRaspored
    //prodajKarte
    //deleteContact,
    //updateContact
}