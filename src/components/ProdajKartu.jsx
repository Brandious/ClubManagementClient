import React, {useState, useEffect} from 'react';
import {Container, Box, TextField, Stack, Button, Input, FormControlLabel, FormControl, FormGroup, Switch} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, newEvent, getPastEvent, getUpcomingEvent } from '../actions/event';
import {prodajKartu} from '../actions/karte';
import Skeleton from './Skeleton';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { deepPurple } from '@mui/material/colors';

import Rezervacija from './Reservacija';

const label = { inputProps: { 'aria-label': 'Checkbox demo'} };
const color = deepPurple[500];


function ProdajKartu() {

    const [value, setValue] = React.useState(new Date());
    const [currency, setCurrency] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [rezervacija, setRezervacija] = React.useState('false');
    const [events, setEvents] = useState();
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState();
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState(0);

    useEffect( () => {
      const getData = async() => {
           
              try{

                let res = await dispatch(getUpcomingEvent(currentUser.id));
                res = await res.data;
                setEvents(res);
                setLoading(false);
              
                }
                catch(error)
                {
                    const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
         
                setEvents(_content);
                }

     }

     return getData();
    }, [setEvents])



    const handleSelectEvent = (e) => {
      setEvent(events.events[e.target.value]);
      
    };

    const handleSelectCijenu = (e) => {
      setValue(e.target.value);
   
    };

    const handleProdajKartu = async(e) => {
      e.preventDefault();
      await dispatch(prodajKartu(event.karte[0].id, currentUser.id,value,  number, email));
      alert("Karta Prodana");
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleTicketNumberChange = (e) => {
        setNumber(e.target.value);
    }

    const handleCheck = (newValue) => {

      setChecked(!checked);
    };
    if(loading)
      return <Skeleton />
    else 
console.log(events);
  return (
    <Container style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', placeContent: 'space-around'}}>
  
    <Box maxWidth="sm" style={{marginTop: "10vh", display: 'flex', placeItems: 'flex-start', flexDirection:'column'}}>
   <h3>Prodaj Kartu</h3>
  
   <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Stack spacing={5} sx={{ width: 500, height: 450 }} >      
            
       <TextField
          id="outlined-select-currency"
          select
          label="Izaberi"
          onChange={handleSelectEvent}
          helperText="Izaberi Event"
        >
          {events.events && events.events.map((option,i) => (
            <MenuItem key={option.id} value={i}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        
        {event && 
        <>

        <TextField
          id="outlined-select-currency"
          select
          label="Izaberi Cijenu"
          onChange={handleSelectCijenu}
          helperText="Izaberi Event"
        >
          {event && event.event_id.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.naziv} | {option.price_eur} | {option.price_kuna} | {option. kategorija}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          required
          id="outlined-required"
          label="Broj Karata"
          type="number"
          onChange={handleTicketNumberChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={handleEmailChange}
        />
        <div style={{display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
              <FormGroup>
            <FormControlLabel control={<Switch checked={checked} onChange={handleCheck}/>} label="Rezervacija" />
            </FormGroup>
            {checked && <Rezervacija />}
            </div>
        </>}
            <Button variant="contained" onClick={handleProdajKartu}>Prodaj Kartu</Button>
       
        </Stack>
 
       </LocalizationProvider>

    </Box>
   
     
    </Container>
  )
}

export default ProdajKartu;
