import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
 
  const { open, setOpen, savePrices } = props;
  const [ eventPrice, setEventPrice ] = useState([]);
  const [price, setPrice] = useState({});

  const handleClose = () => {
    setOpen(false);
    setEventPrice([]);
  };

  const handleChange = (e) => {
      setPrice(obj => ({...obj, [e.target.name]: e.target.value}))
      console.log(price);
  }

  const handleDodajCijenu = () => {
   
     setEventPrice(current => [...current, price]);
     
 }

const handleSave = (e) => {
    e.preventDefault();
    setOpen(false);
    savePrices(eventPrice);
    console.log("Saving...",eventPrice);
}
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kreiraj Cijene Karte</DialogTitle>
        <DialogContent>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextField
                autoFocus
                margin="dense"
                id="naziv"
                name="naziv"
                label="Naziv Cijene"
                type="text" 
                fullWidth
                variant="standard"
                required
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                name="kategorija"
                label="Kategorija Cijene"
                type="text"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="cijena"
                name="cijenaEur"
                label="Cijena u Eurima"
                type="number"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="cijena"
                name="cijenaKun"
                label="Cijena u Kunama"
                type="number"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
          </div>


          {eventPrice && eventPrice.map((el, i) => 
           <div style={{display: 'flex', flexDirection: 'row'}} key={i}>
            <TextField
                autoFocus
                margin="dense"
                id="naziv"
                name="naziv"
                label="Naziv Cijene"
                type="text" 
                fullWidth
                variant="standard"
                required
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                name="kategorija"
                label="Kategorija Cijene"
                type="text"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="cijena"
                name="cijenaEur"
                label="Cijena u Eurima"
                type="number"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
            <TextField
                autoFocus
                margin="dense"
                id="cijena"
                name="cijenaKun"
                label="Cijena u Kunama"
                type="number"
                fullWidth
                variant="standard"
                required
                
                onChange={handleChange}
                error={false}
            />
          </div>
          )}
        </DialogContent>

        <DialogActions style={{display: 'flex', placeItems: 'space-between', placeContent: 'space-between'}}>
            <div>
               <Button onClick={handleDodajCijenu} variant="contained">Dodaj Cijenu</Button>
            </div>
            <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
