import React from 'react';
import {Container, Box, TextField, Stack, Button, Input} from '@mui/material';

import Layout from './Layout';
import { deepPurple } from '@mui/material/colors';

const color = deepPurple[500];

function Event() {

    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
      setValue(newValue);
    };

  return (
    <Container style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', placeContent: 'space-around'}}>
  
    <Box maxWidth="sm" style={{marginTop: "10vh", display: 'flex', placeItems: 'center', flexDirection:'column'}}>
   <h3>Kreiraj Rezervaciju</h3>
   
         <Layout />
    </Box>
  
     
    </Container>
  )
}

export default Event;
