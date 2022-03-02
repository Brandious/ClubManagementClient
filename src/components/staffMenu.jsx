import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import {

  Link
} from "react-router-dom";
import Profil from '@mui/icons-material/PersonOutline';
import Todo from '@mui/icons-material/List';
import { logout } from "../actions/auth";
import KreirajEvent from '@mui/icons-material/EventNoteSharp';
import Container from '@mui/material/Container';

import Skladiste from '@mui/icons-material/Inventory2Sharp';
import Karte from '@mui/icons-material/LocalActivitySharp';
import Stolovi from '@mui/icons-material/TableBarSharp';
import ZavrseniEventi from '@mui/icons-material/EventAvailableSharp';
import { useDispatch, useSelector } from "react-redux";
import Cjenici from '@mui/icons-material/MenuBook';
import Ticket from '@mui/icons-material/LocalActivity';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between', justifyItems: 'center', alignItems: 'center', width: '100%' }}>

            <Typography variant="h6" noWrap component="div" style={{fontSize: 'clamp(5px, 14px, 24px)'}}>
              Diamond | Staff Panel
            </Typography>


            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <Typography variant="h6" noWrap component="div" style={{fontSize: 'clamp(5px, 14px, 24px)'}}>
                  <strong>{currentUser.username}</strong>
                </Typography>


                <Button href="/login" variant="outlined" onClick={logout()} style={{ color: 'white', fontSize: 'clamp(5px, 14px, 24px)'}}>Log Out</Button>

              </div>
            ) : (
              <div >

                <Link to={"/login"} >
                  <Button variant="outlined" style={{ color: 'white' }}>Log In</Button>
                </Link>



                <Link to={"/register"} >
                  <Button variant="outlined" style={{ color: 'white' }}>Sign Up</Button>
                </Link>

              </div>
            )}




          </Box>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>


          <ListItem button component={Link} to="/ProdajKartu" >
            <ListItemIcon>
              <Ticket />
            </ListItemIcon>
            <ListItemText primary={'Prodaj Kartu'} />
          </ListItem>

{/* 
          <ListItem button component={Link} to="/Rezervacija" >
            <ListItemIcon>
              <KreirajEvent />
            </ListItemIcon>
            <ListItemText primary={'Rezervacije'} />
          </ListItem> */}

        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/Sank">
            <ListItemIcon>
              <Skladiste />
            </ListItemIcon>
            <ListItemText primary={'Sank'} />
          </ListItem>


          <ListItem button>
            <ListItemIcon>
              <Stolovi />
            </ListItemIcon>
            <ListItemText primary={'Stolovi'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Cjenici />
            </ListItemIcon>
            <ListItemText primary={'Cjenici'} />
          </ListItem>
          <Divider />

          <ListItem button component={Link} to="/Profile" >
            <ListItemIcon>
              <Profil />
            </ListItemIcon>
            <ListItemText primary={'Profil'} />
          </ListItem>

          <ListItem button component={Link} to="/Todo" >
            <ListItemIcon>
              <Todo />
            </ListItemIcon>
            <ListItemText primary={'Todo'} />
          </ListItem>

        </List>
      </Drawer>

    </Box>
  );
}