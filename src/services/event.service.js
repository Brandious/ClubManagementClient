import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? "api/":"http://localhost:3002/api/";
const getEvents = (userId) =>{ 
    
    
    return axios.get(API_URL + 'getEvents', {headers: {...authHeader(), "Content-type": "application/json"}, data: JSON.stringify({userId})});


}

const getPastEvents = (userId) =>{ 
    
    
    return axios.get(API_URL + 'past', {headers: {...authHeader(), "Content-type": "application/json"}, data: JSON.stringify({userId})});

}


const getUpcomingEvents = (userId) =>{ 
    

    return axios.get(API_URL + 'upcoming', {headers: {...authHeader(), "Content-type": "application/json"}, data: JSON.stringify({userId})});

}

const newEvent = (file, name,opis, datum_izvodjenja, prices,broj_gostiju,stanje_u_kunama, userId) => { 
    console.log("saving");
    
      let formData = new FormData();
      formData.append('file', file);
        console.log(prices);
      prices.map((el, i) => {
          console.log(el);
          formData.append(`prices[${i}][naziv]`, el.naziv);
          formData.append(`prices[${i}][price_kuna]`, el.cijenaKun);
          formData.append(`prices[${i}][price_eur]`, el.cijenaEur);
          formData.append(`prices[${i}][kategorija]`, el.kategorija);
         })
      
      formData.append('name',name);
      formData.append('opis',opis);
      formData.append('datum_izvodjenja', datum_izvodjenja);
      formData.append('broj_gostiju',broj_gostiju);
      formData.append('stanje_u_kunama',  stanje_u_kunama);
      formData.append('id',userId);
    
       
    console.log("saving");
     axios.post(API_URL + 'createEvent', formData ,{headers: {...authHeader(), "Content-type": `multipart/form-data; boundary=${formData._boundary}` }})


};

// const deleteEvent = (contactId) => axios.delete(API_URL + 'contact', {headers: authHeader(), data: {contactId}});

// const updateEvent = (contactId, name, email, number) => axios.patch(API_URL + 'contact',{contactId, name, email, number} ,{headers: authHeader()});

export default {
// /    getContacts,
    getEvents,
    newEvent,
    getUpcomingEvents,
    getPastEvents
    //deleteContact,
    //updateContact
}