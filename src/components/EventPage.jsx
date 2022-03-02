import React, { useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {useLocation} from 'react-router-dom';
import Buffer from 'buffer';
import { getProdaneKarte } from '../actions/karte';
import ProdaneKarte from './prodaneKarte.jsx';
import Skladiste from './Skladiste';
import Inventura from './Inventura';
const buff = Buffer.Buffer;
export default function SimpleContainer() {

    const { state } = useLocation();
    const [karte, setKarte] = useState();
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const formatDate = (el) => {
        return new Date(el).toLocaleDateString();
      }
  

      useEffect( () => {
        const getData = async() => {
             
                try{
                  let res = await dispatch(getProdaneKarte(currentUser.id));
                  res = await res.data;
                  setKarte(res);
                  }
                  catch(error)
                  {
                      const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
           
                  setKarte(_content);
                  }
  
       }
  
       return getData();
      }, [setKarte])
  
  
      return (
   
      <Container  sx={{display: 'flex', placeItems: 'center', flexDirection: 'column', width: '100vw', height: '100%', marginTop: '10vh'}}>
       
        <Box sx={{  height: '50vh', width: '60vw', display: 'flex', placeItems: 'center', placeContent: 'center' }} >

     
     
         <ImageListItem key={state.id} sx={{height: '3vh', width: '60vw'}}>
           {state.karte && <img
            src={`data:image/png;base64,${buff.from(state?.karte[0]?.grafika).toString('base64')}`}
            alt={state.name}
            loading="lazy"
            style={{height: '30vh'}}
          /> }
          <ImageListItemBar
            title={state.name}
            subtitle={formatDate(state.datum_izvodjenja)}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${state.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
        </Box>

        <div style={{display: 'flex', flexDirection: 'column', placeItems: 'flex-start'}}>

            <Box sx={{  width:'70vw'}} >
                {karte && <ProdaneKarte karte={karte} />}
            </Box>

            <Box sx={{  width:'70vw'}} >
              <Inventura />
            </Box>
        </div>
        

 
           
      </Container>
   
  );
}
