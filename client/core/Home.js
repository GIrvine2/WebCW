//import React from 'react'
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {CssBaseline, Grid, CardActions} from '@material-ui/core'
import ronaldo from './../assets/images/CR7.jpg'
import messi from './../assets/images/MESSICW.jpg'
import {Link} from 'react-router-dom'
import {joke} from '../thirdparty/api-dadjokes.js'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import {read, update, ronaldoClick} from './../user/api-user.js'
import Container from "@material-ui/core/Container";


//Creating Styles for Home Page
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    textAlign: 'center',
  },
  title2: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    textAlign: 'center',
    justifycontent: 'center',
    display: 'flex',
    flexDirection:'column'
  },
  media: {
    width: 'auto',
    height: 500,
    resizeMode: 'contain',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { 
      width: '100%',
      height: 'auto',
      margin:'0px',
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      height:'200px',
      color:theme.palette.text.secondary,
      background: theme.palette.primary.main,
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

//Home Page Function
export default function Home({ match }){
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const [user, setValues] = useState({})

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    return function cleanup(){
      abortController.abort()
    }
  }, [])
  
    return (
      //Using card to display content onto home page
      //Grid used to display Ronaldo/Messi images beside eachother
        <Card className={classes.card}>
        <Typography variant="h2" className={classes.title}>
            Ronaldo vs Messi
        </Typography>
        <Typography variant="h6" className={classes.title}>
            Sign in and Edit your profile to vote!
        </Typography>

        <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.title2}>
             Ronaldo
             <CardMedia className={classes.media} image={ronaldo} title="Ronaldo"/>

            </Typography>
            
            </Grid>

            <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.title2}>
             Messi
             <CardMedia className={classes.media} image={messi} title="Messi"/>
            </Typography>
            </Grid>
        </Grid>
        
        </Card>
        
    );
}