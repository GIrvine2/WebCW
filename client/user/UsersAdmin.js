import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {listadmin} from './api-user.js'
import auth from '../auth/auth-helper'


//Creating Styles for Admin Page
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

//Creating Admin Page
export default function Users({ match }) { 
  const classes = useStyles()
  const [users, setUsers] = useState([]) //Get User state
  const jwt = auth.isAuthenticated() //Check User is authenticated

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    //Get list of users for the admin
    listadmin({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
      	console.log("Here is the user data")
      	console.log(data)
        setUsers(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.userId])

//Create user page
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Sign in as Admin to view user selections! ({users.length})
        </Typography>
        <List dense>
         {users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <Person/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name}/>
                      <ListItemText primary={"Selected: " + item.about}/>
                      <ListItemSecondaryAction>
                      <IconButton>
                          <ArrowForward/>
                      </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
}