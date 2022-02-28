import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


import excel from 'xlsx';

import SankTabela from './SankTabela1';
import PopisRobe from './PopisRobe'
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
      
      fileReader = new FileReader();
      rABS = !!fileReader.readAsBinaryString;
      fileReader.onload = handleFileRead;
 
      
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
 

  return (
    <Container>
    <Stack direction="column" alignItems="center" spacing={2} style={{marginTop: '10vh', paddingLeft: '10vw'}}>    
      <PopisRobe/>
    </Stack>
    </Container>
  );
}