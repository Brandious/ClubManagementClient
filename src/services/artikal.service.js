import axios from "axios";
import authHeader from "./auth-header";



const API_URL = process.env.NODE_ENV === 'production' ? "api/":"http://localhost:3002/api/";

const getArtikle = (userId) =>{ 
    
    
    return axios.get(API_URL + 'artikal', {headers: {...authHeader(), "Content-type": "application/json"}, data: JSON.stringify({userId})});


}


const getStanjeArtikla = (userId) =>{ 
    

    return axios.get(API_URL + 'IzlistajArtikal', {headers: {...authHeader(), "Content-type": "application/json"}, data: JSON.stringify({userId})});


}

const newArtikal = (naziv, mjer_jed, redni_broj, popisanoKnjigovodstvo, eventId) => {
    
    
    
   return axios.post(API_URL + 'artikal', {naziv, mjer_jed, redni_broj, popisanoKnjigovodstvo, eventId} ,{headers: {...authHeader()}})


};

// const deleteEvent = (contactId) => axios.delete(API_URL + 'contact', {headers: authHeader(), data: {contactId}});

 const updateArtikal = (artikalId, popisana_kolicina) => {
     
  
    
  

    return axios.patch(API_URL + 'artikal',{artikalId, popisana_kolicina} ,{headers: authHeader()});}

export default {
// /    getContacts,
    getArtikle,
    newArtikal,
    getStanjeArtikla,
    updateArtikal
}