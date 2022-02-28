import React, {useState, useEffect} from 'react';
import {Container, Box, TextField, Stack, Button, Input} from '@mui/material';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PastEvents from './PastEvents';
import { deepPurple, lightBlue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, newEvent, getPastEvent, getUpcomingEvent } from '../actions/event';
import Skeleton from './Skeleton';
import CijeneDialog from './CijeneDialog';

const color = deepPurple[500];
const color1 = lightBlue[500];

function Event() {
    const [events, setEvents] = useState();
    const [pastEvents, setPastEvents] = useState();
    const [upcomingEvents, setUpcomingEvents] = useState();
    
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [opis, setOpis] = useState('');
    const [datum, setDatum] = useState(new Date());
    const [brojGostiju, setBrojGostiju] = useState(4500);
    const [stanjeSkladista, setStanjeSkladista] = useState(255346);
    const [prices, setPrices] = useState([]);

    const [open, setOpen] = React.useState(false);

    useEffect( () => {
      const getData = async() => {
           
              try{
                let res = await dispatch(getEvent(currentUser.id));
                res = await res.data;

                let res1 = await dispatch(getPastEvent(currentUser.id));
                res1 = await res1.data;

                let res2 = await dispatch(getUpcomingEvent(currentUser.id));
                res2 = await res2.data;

                setEvents(res);
                setPastEvents(res1);
                setUpcomingEvents(res2);

                
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
    
    const onChangeName = (e) =>
    {
      const name = e.target.value;
      setName(name);
    }

    const onChangeOpis = (e) =>
    {
      const opis = e.target.value;
      setOpis(opis);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
    const onChangeFile = (e) =>
    {
      const file = e.target.files[0];
    
      setFile(file);
    }

    const handleChange = (newValue) => {
      setDatum(newValue);
    };

    const handleAddEvent = async () => {

     
          await dispatch(newEvent(file, name,opis, datum,prices, brojGostiju ,stanjeSkladista, currentUser.id));
  }
  
  return (
    <Container style={{marginLeft: '15vw', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', placeContent: 'space-between'}}>
  
    <Box maxWidth="sm" style={{marginTop: "10vh", display: 'flex', placeItems: 'flex-start', flexDirection:'column'}}>
   <h3>Kreiraj Event</h3>
  
   <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Stack spacing={5} sx={{ maxWidth: '70vw' }}>      
            
             <TextField id="filled-basic" label="Naziv Eventa" variant="outlined" onChange={onChangeName}/> 
             <TextField id="filled-basic" label="Opis Eventa" variant="outlined" onChange={onChangeOpis}/> 
             <DesktopDatePicker
                label="Datum Eventa"
                inputFormat="dd/MM/yyyy"
                value={datum}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
             />
             <label htmlFor="contained-button-file"  onChange={onChangeFile}>
              <Input accept="image/*" style={{display: 'none'}} id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span"  style={{width: '100%', background: `${color}`}}>
                Unesi Grafiku Karte
              </Button>
            </label>

            <label >
             <Button variant="outlined" onClick={handleClickOpen} style={{width: "100%"}}>
                  Unesi cijene karte
               </Button>
               <CijeneDialog open={open} setOpen={setOpen} savePrices={setPrices}/>
            </label>

             <TextField id="filled-basic" label="Broj Gostiju" default="3000" variant="outlined" />
           
            <Button variant="contained" onClick={handleAddEvent}>Kreiraj Event</Button>
       
        </Stack>
 
       </LocalizationProvider>

    </Box>
    <Box style={{marginTop: "10vh", display: 'flex', placeItems: 'flex-start', flexDirection:'column'}}>
      <h3>Pretstojeci Eventi</h3>
       {upcomingEvents ? <PastEvents events={upcomingEvents}/> : <Skeleton />}
     </Box>

     <Box style={{marginTop: "10vh", display: 'flex', placeItems: 'flex-start', flexDirection:'column'}}>
      <h3>Predhodni Eventi</h3>
      {pastEvents ? <PastEvents events={pastEvents}/> : <Skeleton />}
    
     </Box>
     
    </Container>
  )
}

export default Event;
