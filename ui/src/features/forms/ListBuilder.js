import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  Grid,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
    Button,
    IconButton
} from "@material-ui/core";

import AddBoxIcon from '@material-ui/icons/AddBox';

import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";


import cuid from "cuid";
import produce from "immer";


const Row = styled.div`
display: flex;
`

function isGlobalError(error){
  if (error && !Array.isArray(error)){
    return true
  }
  return false
}

export function ListBuilder({
  name,
  value = [],
  onChange,
  label,
  errors,
  itemName,
    onTouch,
    touched,
    Icon
}) {
  //TODO should maybe be thinking about a shared constructor for this
  //we are making an object like this on api as well

  function wrap(value) {
    return {
      _id: cuid(),
      value,
    };
  }

  const addAddress = (value, address) => {
    const updatedValue = produce(value, (draft) => {
      draft.push(wrap(address));
    });
    const e = {
      target: {
        value: updatedValue,
        name: name,
      },
    };
    onChange(e);
  };

  const removeAddress = (value, id) => {
    const updatedValue = produce(value, (draft) => {
      return draft.filter((el) => el._id !== id);
    });
    const e = {
      target: {
        value: updatedValue,
        name: name,
      },
    };
    onChange(e);
  };

  const [input, setInput] = React.useState("");



  function getError(index) {
    if (errors && errors[index]) {
      return errors[index].value;
    }
    return null;
  }

  return (
    <>
      <List dense>
        {value &&
          value.map((a, i) => (
            <ListItem key={a._id}>
              <ListItemAvatar>
                <Icon></Icon>
              </ListItemAvatar>
              <ListItemText
                //className={classes.inline}
                primary={
                  <>
                    <Typography variant={"body1"} display="inline">
                      {a.value}
                    </Typography>
                    {getError(i) ? (
                      <Typography variant="caption" color="error">
                        {`  - ${getError(i)}`}
                      </Typography>
                    ) : (
                      <Typography variant="caption">
                        {" "}
                        - {itemName}
                        {i + 1}
                      </Typography>
                    )}
                  </>
                }
                disableTypography
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <CloseIcon
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        removeAddress(value, a._id);
                      }}
                  />
                </IconButton>

              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Grid item>
        <Row>
          <TextField
              label={label}
              value={input}
              fullWidth
              onBlur={()=> {
                console.log('hellow')
                onTouch()
              }}
              onChange={(e) => {
                console.log('fuck')
                setInput(e.target.value);
              }}
              InputProps={{endAdornment: <IconButton>
                  <AddBoxIcon
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        addAddress(value, input);
                        setInput("");
                      }}
                  />
                </IconButton>}}
          />


        </Row>

        {isGlobalError(errors) && touched && <p>{errors}</p>}
      </Grid>
    </>
  );
}
