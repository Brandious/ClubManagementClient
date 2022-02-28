import  React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Buffer from 'buffer';
import {useNavigate} from 'react-router-dom';
const buff = Buffer.Buffer;

export default function TitlebarImageList(props) {
 

  const { events: event } = props;
  let navigate = useNavigate(); 

  const formatDate = (el) => {
    return new Date(el).toLocaleDateString();
  }

  console.log(props);

  return (
    <ImageList sx={{ width: 300, height: 'auto' }} >
      {event.events && event.events.map(el => (
         <ImageListItem key={el.id}>
          {el.karte[0]?.grafika ? <img
            src={`data:image/png;base64,${buff.from(el.karte[0]?.grafika).toString('base64')}`}
            alt={el.name}
            loading="lazy"
          /> : ''}
          <ImageListItemBar
            title={el.name}
            subtitle={formatDate(el.datum_izvodjenja)}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${el.name}`}
                onClick={() => navigate('../eventpage', {state: el})}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
       ))}
    </ImageList>
  );
}
