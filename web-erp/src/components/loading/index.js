import React, { memo } from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  color: {
    color: '#ffcf28'
  }
}));

function Loading(props) {
  const { text } = props;
  const classes = useStyles();
  return (
    <Backdrop {...props} className={classes.backdrop} open={true}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={1} >
        <Grid item>
          <CircularProgress className={classes.color} color="inherit" disableShrink />
        </Grid>
        {text && (
          <Grid item>
            <Typography variant="h5" className={classes.color}>{text}</Typography>
          </Grid>
        )}
      </Grid>
    </Backdrop>
  );
}

export default memo(Loading);
