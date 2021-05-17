import React, { useState } from 'react';
import theme, { pxToVh, pxToVw } from '../utils/theme';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import Body from '../components/Body';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  textStyle1: {
    color: '#FFFFFFA6',
    fontSize: '2.5vw',
    marginTop: '2vh',
  },
  textStyle2: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  textfield: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  nameInput: {
    fontSize: '1vw',
    color: '#FFFFFF',
  },
  notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
  searchBtnStarted: {
    marginTop: '8vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
  hellotext: {
    fontSize: '4vw',
    color: '#FFFFFFA6',
    height: '10vh',
  },
  hellotext1: {
    fontSize: '2.5vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext3: {
    fontSize: '1vw',
    marginTop: '5vh',
    padding: '0.5vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext2: {
    fontSize: '1.2vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext4: {
    fontSize: '1.5vw',
    marginTop: '2vh',
    padding: '1vh',
    color: '#FFFFFF',
  },
  searchBtn: {
    marginTop: '2vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
}));

const CollectorDashboard = (props) => {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGetStarted = (e) => {
    if (started) setName('');
    setStarted((prev) => !prev);
  };

  const classes = useStyles();
  return (
    <div style={{
      paddingLeft:"1vh",
      paddingRight:"1vh",
      backgroundColor:"#58687E"
    }}>
    <Header style = {{ marginTop:'0.5vh' }} />
    <h4 style = {{
      fontSize:'2.5vh',
      // height : pxToVh(31),
      // width: pxToVh(141),
      marginTop:'1vh',
      marginBottom:'1vh',
      color:'white',
      
    }}>Invoice List</h4>



    <Body style={{ marginTop:'1vh' }}/>

    <Footer style={{ marginBottom:'1vh' }}/>
    </div>
  );
};



export default CollectorDashboard;
