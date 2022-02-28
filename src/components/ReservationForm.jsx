import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const currencies = [
    {
      value: 'USD',
      label: '$300',
    },
    {
      value: 'EUR',
      label: '€300',
    },
    {
      value: 'BTC',
      label: '฿300',
    },
    {
      value: 'JPY',
      label: '¥300',
    },
  ];

export default function FormPropsTextFields() {

    const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
      style={{display: 'flex', flexDirection: 'column'}}
    >
   
        <TextField
          required
          id="outlined-required"
          label="Ime"
       
        />
        <TextField
          required
          id="outlined-required"
          label="Broj Karte"
      
        
        />
         <TextField
          required
          id="outlined-required"
          label="Broj Gostiju"

          type="Number"
        />

        <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <Button variant="primary">Spremi</Button>
   
    </Box>
  );
}
