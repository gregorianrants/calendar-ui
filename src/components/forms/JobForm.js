import React, { useReducer } from "react";
import { useInput } from "../hooks/useInput";
import { useArray } from "../hooks/useArray";
import { startEndChange, StartEndInput } from "./StartEndInput";
import styled from "styled-components";
import { useImmerReducer } from "use-immer";
import camelCase from "camelcase";

import { AddressInput } from "./AddressInput";

import { TextField, Grid, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import { rootReducer } from "./reducer";
import { editJob } from "../../Model/Jobs";

import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { Typography } from "@material-ui/core";

const FieldSet = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none 0;
  display: ${(props) => (props.inline ? "flex" : "block")};
`;

function dateTimeFromInput(date, time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let res = new Date(date);
  res.setHours(hours);
  res.setMinutes(minutes);
  return res;
}

function errorsReducer(){
  
}

export default function JobForm({
  updateEvent,
  close,
  toggleModal,
  initialValues,
}) {
  const addresses = useArray(initialValues?.addresses);

  const [errors,setErrors]=useReducer(errorsReducer,{})

  const [state, dispatch] = useImmerReducer(rootReducer, initialValues); //TODO should i be clonong initial values

  const handleSubmit = (data) => {
    console.log(data);
    const { _id } = data;
    editJob({ _id: _id, data: data })
      .then((response) => {
        if (response.status === "success") {
          onSuccess(_id, response.data);
        } else if (
          response.status === "fail" &&
          response.name === "validationError"
        ) {
          console.log("i need validation");
        }
      })
      .catch(console.error);
  };

  function onSuccess(_id, data) {
    updateEvent(_id, data);
    close();
  }

  function groupItemChange(e) {
    const group = e.target.dataset?.group;
    if (!group)
      throw new Error("a group item must have a data-group attribute");
    dispatch({
      type: "GROUP CHANGE",
      payload: {
        field: camelCase(e.target.name),
        value: e.target.value,
        group: camelCase(group),
      },
    });
  }

  function itemChange(e) {
    if (e.target.dataset?.group) {
      throw new Error("should not be calling itemChange on a group input");
    }
    dispatch({
      type: "ITEM CHANGE",
      payload: {
        field: camelCase(e.target.name),
        value: e.target.value,
      },
    });
  }

  return (
    <>
      <Typography variant="h4">Create Job</Typography>
      <form action="">
        <FieldSet name="customer">
          <TextField
            inputProps={{ "data-group": "customer" }}
            name="name"
            label="name"
            value={state.customer.name}
            onChange={groupItemChange}
            fullWidth
          />
          <TextField
            inputProps={{ "data-group": "customer" }}
            name="mobile"
            label="mobile"
            value={state.customer.mobile}
            onChange={groupItemChange}
            fullWidth
          />
          <TextField
            inputProps={{ "data-group": "customer" }}
            name="email"
            label="email"
            value={state.customer.email}
            onChange={groupItemChange}
            fullWidth
          />
        </FieldSet>
        <StartEndInput
          startName={"start"}
          startValue={state.start}
          onStartChange={itemChange}
          endName={"end"}
          endValue={state.end}
          onEndChange={itemChange}
        />
        <FieldSet inline>
          <TextField
            inputProps={{ "data-group": "charges" }}
            name="hourly-rate"
            label="Hourly Rate"
            value={state.charges.hourlyRate}
            onChange={groupItemChange}
            fullWidth
          />
          <TextField
            inputProps={{ "data-group": "charges" }}
            name="fuel-charge"
            label="Fuel Charge"
            value={state.charges.fuelCharge}
            onChange={groupItemChange}
            fullWidth
          />
          <TextField
            inputProps={{ "data-group": "charges" }}
            name="travel-time"
            label="Travel Time"
            value={state.charges.travelTime}
            onChange={groupItemChange}
            fullWidth
          />
        </FieldSet>
        <AddressInput
          value={state.addresses}
          onChange={itemChange}
          name="addresses"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(state); //TODO should i be cloning object before apssing it about
          }}
          variant="contained"
          color="primary"
          fullWidth
        >
          save
        </Button>
      </form>
    </>
  );
}
