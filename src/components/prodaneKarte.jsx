import React, { useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { getProdaneKarte } from '../actions/karte';

import { Button } from '@mui/material';
import {useLocation} from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'serial', headerName: 'Serial', width: 130 },
  { field: 'naziv', headerName: 'Naziv', width: 130 },
  {
    field: 'price_eur',
    headerName: 'Euro',
    type: 'number',
    width: 90,
  },
  {
    field: 'price_kuna',
    headerName: 'Kuna',
    type: 'number',
    width: 90,
  },
  { field: 'trgovac', headerName: 'Trgovac', width: 130 },
  { filed: 'rezervacija', headerName: 'Rezervacija', width: 100}
];

const FooterComponent = (props) => {

 
  const {karte} = props;
 
     const sum = karte.reduce((sum, {price_eur}) => parseFloat(sum) + parseFloat(price_eur), 0)

     const sumk = karte.reduce((sum, {price_kuna}) => parseFloat(sum) + parseFloat(price_kuna), 0)

  return (
      <div style={{display: 'flex', flexDirection: 'row', placeContent:'space-between'}}>
         <div>
         Suma Eura : {sum} <br />
         Suma Kuna : {sumk}
         </div>

         <div>
          <Button>Save to Excell</Button>
         </div>
      </div>
  )
}


export default function DataTable(props) {

    const { state } = useLocation();
    const [karte, setKarte] = useState();
    const dispatch = useDispatch();
    const [rows, setRows] = useState();
   

    useEffect( () => {
        const getData = async() => {
             
                try{
                  let res = await dispatch(getProdaneKarte(state.id));
                  res = await res.data;
                 
                  setKarte(res.map(el => {
                    return {id: el.id,serial: el.serial,naziv: el.cijenaKarte.naziv,price_eur: el.cijenaKarte.price_eur,price_kuna: el.cijenaKarte.price_kuna,trgovac: el.trgovac.username}}))
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
      }, [setKarte, setRows])
  
     
   
     
    //  setRows(temp)
 

  return (
    <div style={{ height: 400, width: '100%' }}>
       {karte ? <DataGrid
        rows={karte}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        components={{Footer: FooterComponent}}
        componentsProps={{footer:{karte}}}
   
      /> : <p>Loading</p>}
    </div>
  );
}
