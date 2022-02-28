import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getStanjeArtikle } from '../actions/artikal';
import {useLocation} from 'react-router-dom';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(red_broj, naziv, mjerna_jedinica, popisana_kolicina, stanje_u_knjigovodstvu, dogadjaj) {
  let temp = popisana_kolicina - stanje_u_knjigovodstvu;
  const obj = { red_broj, naziv, mjerna_jedinica, popisana_kolicina, stanje_u_knjigovodstvu,  temp, dogadjaj };
  console.log(obj)
  return obj;
}


export default function CustomPaginationActionsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(true);
  const [ data, setData] = useState();
  const { state } = useLocation();

  const dispatch = useDispatch();
  
 

  useEffect( () => {
      const getData = async() => {
           
              try{
                console.log('gettingData');
                let res = await dispatch(getStanjeArtikle(1));
                res = await res.data;
                
                // console.log(res);
                // setData(res); console.log(data);
            
               
                setData(res.map(el => {
                  console.log(el)
                  return {id: el.id,red_broj: el.artikal?.redni_broj, naziv: el.artikal?.naziv,mjerna_jedinica: el.artikal?.mjerna_jedinica, popisana_kolicina: el.popisanaKolicina, kolicina_u_knjigovodstvu: el.kolicinaUKnjigovodstvu, dogadjaj: el.dogadjaj.name  }}));

                  setLoading(false);
                }
                catch(error)
                {
                  console.log(error);
                    const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
         
                setData(_content);
                }

     }

     return getData();
    }, [setData])


  let rows;
  if(!loading) 
    rows = data.map((el) => {

          return createData(el.red_broj, el.naziv,el.mjerna_jedinica, el.popisana_kolicina, el.kolicina_u_knjigovodstvu,el.dogadjaj);
      })
 else
      return <p>Loading...</p>

  

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows).map((row,i )=> ( 
            <TableRow key={row.naziv}>
              <TableCell component="th" scope="row">
                {row.red_broj}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.naziv}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.mjerna_jedinica}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.popisana_kolicina}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.stanje_u_knjigovodstvu}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.temp}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.dogadjaj}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
