import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import CheckIcon from '@mui/icons-material/Check';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';

import Form from '@View/form/form'
import SimpleCard from '@Components/Card/SimpleCard'
import FormSelect from '@View/formGroup/formGroup2'
import PdfViewer from '@View/pdfFile/pdfViewer';

import { PDFViewer } from '@react-pdf/renderer';

import { makeStyles } from '@mui/styles';
import { useControlled } from '@mui/material';


const drawerWidth = 75;

const UseStyles = makeStyles((theme) => ({

  paper :{
          width:"50%",
          marginLeft:"25%",
          height:'100vh',
          display:'flex',
          flexDirection:'column',
          overflow:'hidden'
  },

  grid:{
      width: '100%',
      marginLeft: 5,
      marginTop: '2%'
  },

  typography:{
      fontWeight:"bold",
      borderLeft: 5,
      borderColor: "#000",
      marginTop:'22rem!important',

      caption:{
        fontWeight:"bold",
      }
  }

}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  console.log(props)
  const {data, form, getFilterItems, getSelectedForm, getOnfocus ,getDoneFill, ctrlStatus, getShowForm} = props 
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const classes = UseStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectedFormHandler = (val) =>{
    setOpen(false);
    getSelectedForm (val)
  }

  const EmptyForm = () =>{
    return (
      <div className={'root'}>
          <SimpleCard>
            <Paper elevation={0} className={classes.paper}>
                  <Typography className={classes.typography} variant="h4" gutterBottom component="div" align='center' > 
                    Please Select a Form from Menu List
                  </Typography>
                  <Typography className={classes.typography.caption} variant="caption" gutterBottom component="div" align='center' > or you can click
                  &nbsp;<Link href="#" underline="hover" color ='info' onClick={handleDrawerOpen}>here</Link>&nbsp;
                  </Typography>
            </Paper>
          </SimpleCard>
        </div>
    )
  }

  const PendingPDF = () =>{
    return (
      <div>
        <Button variant="outlined" color="inherit" style={{marginLeft: 'auto' }} onClick = {getDoneFill}>Modify</Button>
        {/* <Typography variant="caption" noWrap component="div">
        Pending Approval from Customer
        </Typography> */}
      </div>
    )

  }

  const AgentForm = () => {
    return(
      <div>
        {(() => {

          switch(ctrlStatus) {

            case '14':
              return <PdfViewer data = {data} status = {ctrlStatus}></PdfViewer>
            break;
      
            case '20':
              return <PdfViewer data = {data} status = {ctrlStatus}></PdfViewer>
            break;
            
            default:
              return form == null? <EmptyForm/>:<Form data = {data} form = {form}  getFilterItems = {getFilterItems} getOnfocus ={getOnfocus}/>
            break;
          }
      })()}

      </div>
    ) 
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Agent
          </Typography>
            { ctrlStatus == '12'? <Button variant="outlined" color="inherit" style={{marginLeft: 'auto' }} onClick = {getDoneFill}>Done</Button>:null}
            { ctrlStatus == '20'? <Button variant="outlined" color="inherit" style={{marginLeft: 'auto' }} onClick = {getShowForm}>Modify</Button>:null}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
         <FormSelect data = {data} getSelectedForm={selectedFormHandler}/>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <AgentForm></AgentForm>
      </Main>
    </Box>
  );
}