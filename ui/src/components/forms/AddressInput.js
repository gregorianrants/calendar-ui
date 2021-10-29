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
} from "@material-ui/core";
import HouseIcon from "@material-ui/icons/House";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import cuid from "cuid";
import produce from "immer";
import { PromiseProvider } from "mongoose";

const useStyles = makeStyles(() =>
  createStyles({
    inline: {
      display: "flex",
    },
  })
);

export function ListBuilder({ name, value, onChange, label, errors ,itemName}) {
  //TODO should maybe be thinking about a shared constructor for this
  //we are making an object like this on api as well

  console.log(errors);
  function wrap(value) {
    return {
      _id: cuid(),
      value,
    };
  }

  const addAddress = (value, address) => {
    const updatedValue = produce(value, (draft) => {
      console.log(draft);
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

  const classes = useStyles();

  function getError(index) {
    if (errors && errors[index]) {
      return errors[index].value;
    }
    return null;
  }

  return (
    <>
      <List dense>
        {value.map((a, i) => (
          <ListItem key={a._id}>
            <ListItemAvatar>
              <HouseIcon></HouseIcon>
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
                    <Typography variant="caption">  - {itemName}{i + 1}</Typography>
                  )}
                </>
              }
              disableTypography
            />
            <ListItemSecondaryAction>
              <CloseIcon
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  removeAddress(value, a._id);
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Grid item>
        <TextField
          label={label}
          value={input}
          fullWidth
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addAddress(value, input);
            setInput("");
          }}
        >
          +
        </button>
      </Grid>
    </>
  );
}
