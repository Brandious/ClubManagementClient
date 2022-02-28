import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Buffer from 'buffer';
import {DraggableBlocks} from "./DraggableBlocks";
import SVGArea from './SVGArea';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {getUpcomingEvent } from '../actions/event';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}


const buff = Buffer.Buffer;
function FormDialog(props) {
  
  const {open, setOpen, saveTables} = props;
  const [ tables, setTables ] = useState([]);
  const [table, setTable] = useState({});

  const handleClose = () => {
    setOpen(false);
    setTables([]);
  };

  const handleChange = (e) => {
    setTable(obj => ({...obj, [e.target.name]: e.target.value}))
  }


const handleSave = (e) => {
  e.preventDefault();
  setOpen(false);
  saveTables(tables);
  
}
const handleDodajTable = () => {
   
  setTables(current => [...current, table]);
  
}



  return (
    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kreiraj Stol</DialogTitle>
        <DialogContent >
         
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Naziv Stola"
            type="name"
            fullWidth
            name="NazivStola"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="kategorija"
            label="Kategorija Stola"
            type="name"
            fullWidth
            
            name="KategorijaStola"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="potrosnja"
            label="Naziv Potrosnje"
            type="name"
            
            name="PotrosnjaStola"
            fullWidth
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="cijenaEur"
            label="Cijena u Eurima"
            type="number"
            fullWidth
            
            name="CijenaEUR"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="cijenaKun"
            label="Cijena u Kunama"
            type="number"
            fullWidth
            
            name="CijenaKuna"
            onChange={handleChange}
            variant="standard"
          />
          
</div>
          {tables && tables.map((el, i) => 
           <div style={{display: 'flex', flexDirection: 'row'}} key={i}>
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Naziv Stola"
            type="name"
            fullWidth
            name="NazivStola"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="kategorija"
            label="Kategorija Stola"
            type="name"
            fullWidth
            
            name="KategorijaStola"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="potrosnja"
            label="Naziv Potrosnje"
            type="name"
            
            name="PotrosnjaStola"
            fullWidth
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="cijenaEur"
            label="Cijena u Eurima"
            type="number"
            fullWidth
            
            name="CijenaEUR"
            onChange={handleChange}
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="cijenaKun"
            label="Cijena u Kunama"
            type="number"
            fullWidth
            
            name="CijenaKuna"
            onChange={handleChange}
            variant="standard"
          />
          </div>
          )}

        </DialogContent>
        <DialogActions style={{display: 'flex', placeItems: 'space-between', placeContent: 'space-between'}}>
            <div>
               <Button  variant="contained" onClick={handleDodajTable} >Dodaj Sto</Button>
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

export const CreateLayout = () => {
    const [draggedData, setDragData] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [stolovi, setStolovi] = React.useState([]);
    const [events, setEvents] = useState();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [event, setEvent] = useState()
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
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClick = (e) => {
      e.preventDefault();
      console.log(e.target.id)
      setEvent(e.target.id);
    }
   if(loading) return <p>Loading</p>

    return (
      <div style={{marginLeft: '10vw', marginTop: '10vw'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
         {!loading && events.events && events.events.map(el =>     
         <Card onClick={handleClick} id={el.id} key={el.id} sx={{ width: '25vw', height: '15vh', background:`linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8)), url(data:image/png;base64,${buff.from(el.karte[0]?.grafika).toString('base64')})`, color: 'white', display: 'flex', flexDirection: 'column', placeItems: 'center', alignContent: 'space-around', justifyContent: 'space-around' }}>
        <Typography gutterBottom variant="h5" component="div">
          {el.name}
        </Typography>
        <Typography variant="body2" color="white">
         {formatDate(el.datum_izvodjenja)}
        </Typography>
 
    </Card>)}
    </div>


      {event && <div>
         <Button variant="contained" onClick={handleClickOpen} >
            Create Table
         </Button>


         <FormDialog open={open} setOpen={setOpen} saveTables={setStolovi}/>
        <DraggableBlocks setDragData={(dragData) => setDragData(dragData)} blocks={stolovi}/>
        <SVGArea draggedData={draggedData} event={event} stolovi={stolovi} setStolovi={setStolovi} />
        </div>}
      </div>
    );
  };