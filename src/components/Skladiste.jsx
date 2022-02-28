import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useDispatch} from 'react-redux';
import Tabela from './Tabela.jsx';
import excel from 'xlsx';
import { newArtikal } from '../actions/artikal';

const Input = styled('input')({
  display: 'none',
});


const FileHandler = (props) => {
    let fileReader; let rABS;
    
    const { setData } = props;

    const handleFileRead = (e) => {

      const content = fileReader.result;
   
      const book = excel.read(content, {type: rABS ? 'binary' : 'array'});
   
      const sheetsName = book.SheetNames[0];

      const sheet = book.Sheets[sheetsName];
  
      // console.log(excel.utils.sheet_to_json(book, {header: 1}));
    
      const data = excel.utils.sheet_to_json(sheet, {header: 1});
   
      setData(data);
      // … do something with the 'content' …
    };
    
    const handleFileChosen = (file) => {
      console.log(file);
      fileReader = new FileReader();
      rABS = !!fileReader.readAsBinaryString;
      fileReader.onload = handleFileRead;
      console.log(rABS);
      
      if(rABS) 
        fileReader.readAsBinaryString(file);
      else 
        fileReader.readAsArrayBuffer(file);
    };
    
    return <div className='upload-expense'>
      <input
        type='file'
        id='file'
        className='input-file'
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>;
  };

export default function UploadButtons() {

  const [data, setData] = useState();
  const dispatch = useDispatch();


  


  const handleUploadData = (e) => {
    e.preventDefault();

    console.log(data);

    data.map(async (el,i) => {
      if(i > 1) await dispatch(newArtikal(el[1], el[2], el[0], el[4], 1));
    })
 

  }
  return (
    <Container>
    <Stack direction="row" alignItems="center" spacing={2} style={{marginTop: '10vh', paddingLeft: '10vw'}}>
      <label htmlFor="contained-button-file">
       
        <h5>Unesi Stanje Skladista</h5>

        <FileHandler setData={setData} />
        <Button variant="contained" onClick={handleUploadData}>
          Save
        </Button>
      </label>

      <label htmlFor="contained-button-file">
       
       <h5>Unesi Stanje Sanka 1</h5>

       <Input accept="image/*" id="contained-button-file" multiple type="file" />
       <Button variant="contained" component="span">
         Upload
       </Button>
       
     </label>

     <label htmlFor="contained-button-file">
       
       <h5>Unesi Stanje Sanka 2</h5>

       <Input accept="image/*" id="contained-button-file" multiple type="file" />
       <Button variant="contained" component="span">
         Upload
       </Button>
       
     </label>

     <label htmlFor="contained-button-file">
       
       <h5>Unesi Stanje Sanka 3</h5>

       <Input accept="image/*" id="contained-button-file" multiple type="file" />
       <Button variant="contained" component="span">
         Upload
       </Button>
       
     </label>
    </Stack>

    <Box>
     <Tabela /> 
    </Box>

    </Container>
  );
}