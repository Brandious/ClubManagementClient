import React, {useEffect, useRef} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getArtikle } from '../actions/artikal';

function createData(id, red_broj, naziv,mjerna_jedinica ,popisana_kolicina=0) {

    return {id, red_broj, naziv, mjerna_jedinica, popisana_kolicina};
}

function getInput(params) {

  return `${params.row.popisana_kolicina}`;
}

function setInput(params) {
  const [ popisana_kolicina ] = params.value.toString();
  return {...params.row, popisana_kolicina};
}


export default function BasicEditingGrid() {


    const [artikli, setArtikle] = React.useState();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const[loading, setLoading] = React.useState(true);
    const ref = useRef();
   
    useEffect(() => {
           
      const getData = async () => {
           try{
                let res = await dispatch(getArtikle(currentUser.id));
                res = await res.data;
                setArtikle(res);
                setLoading(false);
               
                }
                catch(error)
                {
                    const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
         
                setArtikle(_content);
                }
              }
              return getData();
    
    }, [setArtikle, setLoading]);


    const FooterComponent = () => {

      const handleClick = (e) => 
      {
        e.preventDefault();
        console.log(rows);
      }
      return (
          <div style={{display: 'flex', flexDirection: 'row', placeContent: 'space-around'}}>
              <Button variant="contained" color="primary" onClick={handleClick}>Save Data</Button>
  
              <Button  color="primary">Skeniraj Artikal</Button>
          </div>
      )
  }
    const columns = [
        { field: 'red_broj', headerName: 'Redni Broj',type: 'number',flex: 0.2 ,editable: false },
        { field: 'naziv', headerName: 'Naziv', type: 'string',flex: 1 ,editable: false },
        { field: 'mjerna_jedinica', headerName: 'Mjerna Jedinica', type: 'string',flex: 0.2, editable: false },
        { field: 'popisana_kolicina', headerName: 'Trenutno Stanje', type: 'number',flex: 1, editable: true}
      ];
     
    let rows;
     
    if(!loading) 
      rows = artikli.map((el, i) => {
       return createData(  i,el.redni_broj, el.naziv,el.mjerna_jedinica);
      }).filter((a) => a.naziv !== '');
    else
      return <p> Loading... </p>
   
  return (
    <div>
      <DataGrid ref={ref} rows={rows} columns={columns} components={{
            Footer: FooterComponent,
            Toolbar: GridToolbar
          }} sx={{minWidth: '35vw', maxWidth: '100vw', minHeight: '70vh', fontSize: '0.7rem'}}/>
    </div>
  );
}

