import  React from 'react';
import hrcLogo from "../assets/logo.svg";
import abcLogo from "../assets/companyLogo.svg";
import Paper from '@material-ui/core/Paper';
import theme, { pxToVh, pxToVw } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';


export default function Header() {
 
  return (
    <div>
      <Grid style={{
      display:'flex',
      backgroundColor:"#58687E",
      fontSize:'2vh',
      marginTop:pxToVh(20),
      maxHeight:pxToVh(50),
    
      
    }}>
      <img src={abcLogo} alt="ABC Logo" style={{
        
        width:pxToVw(44),
        height:pxToVh(46)}}/>

      <h2 style={{
        
        width:pxToVw(255),
        height:pxToVh(50),
        textAlign:'left',
        color:'white',
        opacity:"1"
      }}>ABC Products</h2>


      <img src={hrcLogo} alt = 'HRC Logog' style={{
      marginLeft:"30vh",
      width: pxToVw(235),
      height: pxToVw(50),
      maxHeight:pxToVh(50),
      background: "transparent  0% 0% no-repeat padding-box",
      opacity:" 1"}} />
    </Grid>
    
    </div>

  );
}