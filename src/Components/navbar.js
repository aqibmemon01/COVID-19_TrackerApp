import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#001493" }} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Covid-19 Tracker <span 
            style={{
              fontSize:"13px"
            }} > By AbuBakar Memon </span>
          </Typography>
          
        </Toolbar>
      </AppBar><br/>
    </div>
  );
}