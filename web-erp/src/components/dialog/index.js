import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function MeuDialog({ open, title, message, action, setOpen, setReason, askReason, labelReason = "Motivo" }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    setReason(event.target.value)
  };

  const handleYes = () => {
    action()
    setOpen(!open);
  };

  const handleNo = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <form onSubmit={handleYes} >
        <DialogContent >
          <DialogContentText id="alert-dialog-description" >
            {message}
          </DialogContentText>

          {askReason &&
            <>
              <InputLabel htmlFor="age-native-simple" >Motivo:</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
                fullWidth
                required
              >
                <option aria-label="None" value="" />
                <option value={42}>sei la</option>
              </Select>
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            Não
          </Button>
          <Button color="primary" autoFocus type="submit">
            Sim
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  );
}