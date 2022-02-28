import React, {useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getArtikle, updateArtikal } from '../actions/artikal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Skeleton from './Skeleton';
function createData(id, red_broj, naziv,mjerna_jedinica ,popisana_kolicina=0) {

    return {id, red_broj, naziv, mjerna_jedinica, popisana_kolicina};
}


export default function BasicEditingGrid() {


    const [artikli, setArtikle] = React.useState();
    const [roba, setRoba] = React.useState();
    const [robaDownload, setRobaDownload] = React.useState();

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const[loading, setLoading] = React.useState(true);
   
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
    
  
    const handleClick = async(e) => {
        e.preventDefault();
        console.log(robaDownload);
        setLoading(true)
        await robaDownload.map((el,i) => {
            console.log(el, i);
            const a = dispatch(updateArtikal(el.red_broj, el.popisana_kolicina));
            console.log(a);
        })
        setLoading(false);
     
    }
    const handleInputChange = (e, index) => {
        e.preventDefault();
        const temp = {...rows[index], popisana_kolicina: e.target.value};
       
        setRoba({...roba,  [e.target.name]: temp});
     
    };
  
    const columns = [
        { field: 'naziv', headerName: 'Naziv', type: 'string',flex: 1 ,editable: false },
        { field: 'mjerna_jedinica', headerName: 'Mjerna Jedinica', type: 'string',flex: 0.2, editable: false },
        { field: 'popisana_kolicina', headerName: 'Trenutno Stanje', type: 'number',flex: 1, editable: true}
      ];
  
    let rows;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const downloadTable = () => {
       
        const ws = XLSX.utils.json_to_sheet(robaDownload);
        const wb = { Sheets: { 'roba': ws }, SheetNames: ['roba'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, 'Roba' + fileExtension);

    }

    const handleDownload = (e) => {
        
        setRobaDownload(Object.values(roba));
        downloadTable();
    }
    if(!loading) 
      rows = artikli.map((el) => {
         return createData(  el.id,el.redni_broj, el.naziv,el.mjerna_jedinica);
      })
    else
      return <Skeleton />
     
  return (
    <div >
  
      <Table aria-label="spanning table" sx={{display: 'flex',flexDirection: 'column', minWidth: '35vw', maxWidth: '100vw', minHeight: '70vh'}}>
        <TableHead sx={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <h1>Popis Robe</h1>
            </TableCell>
           
          </TableRow>
          <TableRow sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', placeItems: 'center'}}>
            {columns.map(((el,i) => <TableCell key={i}   sx={{width: '5vw', border: 'none'}}> {el.headerName}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ display: 'flex', flexDirection: 'column'}}>
          {rows.map((row, i) => (
            <TableRow  key={row.red_broj} sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', justifyItems: 'center', alignContent: 'flex-start', alignItems: 'center'}}>
              
              <TableCell  sx={{width: '5vw', border: 'none'}}>{row.naziv}</TableCell>
              <TableCell sx={{width: '5vw',border: 'none'}} >{row.mjerna_jedinica}</TableCell>
              <TableCell  sx={{width: '5vw',border: 'none'}}> 
                          <input
                            name={row.red_broj}
                            type="number"
                            onChange={(e) => handleInputChange(e, i)}
                            style={{width: '2.5rem', height: '2.5rem'}}
                          />
              </TableCell>
            
          
           
            </TableRow>
          ))}
              
           <TableRow  style={{ display: 'flex', flexDirection: 'row', placeItems: 'space-around', placeContent: 'center'}}>
           
                <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>Save Data</Button>
    
                <Button  color="primary">Skeniraj Artikal</Button>
                <Button  color="primary" onClick={handleDownload}>Export</Button>
         
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

