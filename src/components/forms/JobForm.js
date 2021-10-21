import React, { useReducer } from "react";
import { useInput } from "../hooks/useInput";
import { useArray } from "../hooks/useArray";
import { startEndChange, StartEndInput } from "./StartEndInput";
import styled from "styled-components";
import { useImmerReducer } from "use-immer";
import camelCase from "camelcase";
import { Formik, Field } from "formik";
import { cloneDeep, values, flatten } from "lodash";
//import { styled } from "@mui/material/styles";

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

function dateTimeFromInput(date, time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let res = new Date(date);
  res.setHours(hours);
  res.setMinutes(minutes);
  return res;
}


const StyledTextInput = styled(TextField)`
  margin-bottom: 20px;
`;

export default function JobForm({
  updateEvent,
  close,
  toggleModal,
  initialValues,
}) {
  const addresses = useArray(initialValues?.addresses);

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

  const validator = (values) => {
    const result = {
      customer: {},
    };

    if (values.customer.name.length < 5) {
      result.customer.name = "must be longer than 5";
    }

    return result;
  };

  console.log(initialValues);

  return (
    <Formik initialValues={cloneDeep(initialValues)} onSubmit={handleSubmit}>
      {(props) => (
        //<Typography variant="h4">Create Job</Typography>
        <form onSubmit={props.handleSubmit}>
          <Field
            as={StyledTextInput}
            name="customer.name"
            label="name"
            error={props.errors?.customer?.name}
            helperText={props.errors?.customer?.name}
            fullWidth
          />
          <Field
            as={StyledTextInput}
            name="customer.mobile"
            label="mobile"
            fullWidth
          />
          <Field
            as={StyledTextInput}
            name="customer.email"
            label="email"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              value={props.values.start}
              onChange={props.handleChange}
              label="date"
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              value={props.values.end}
              onChange={props.handleChange}
              label="date"
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={props.values.start}
              onChange={(date) => {
                props.setFieldValue(
                  "start",
                  dateTimeFromInput(date, props.values.start),
                  true
                );
                props.setFieldValue(
                  "end",
                  dateTimeFromInput(date, props.values.end),
                  true
                );
                console.log("hello");
              }}
              label="end"
            />
          </MuiPickersUtilsProvider>
          <Field
            as={StyledTextInput}
            name="charges.hourlyRate"
            label="hourly rate"
            error={props.errors?.charges?.hourlyRate}
            helperText={props.errors?.charges?.hourlyRate}
          />
          <Field
            as={StyledTextInput}
            name="charges.fuelCharge"
            label="mobile"
            error={props.errors?.charges?.fuelCharge}
            helperText={props.errors?.charges?.fuelCharge}
          />
          <Field
            as={StyledTextInput}
            name="charges.travelTime"
            label="mobile"
            error={props.errors?.charges?.travelTime}
            helperText={props.errors?.charges?.travelTime}
          />
          
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          value={startValue}
          onChange={onStartChange}
          label="start"
        />
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker value={endValue} onChange={onEndChange} label="end" />
      </MuiPickersUtilsProvider> */}
          {/*<FieldSet inline>
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
        /> */}
          <button
            type="submit"
            // onClick={(e) => {
            //    e.preventDefault();
            //    props.handleSubmit(values); //TODO should i be cloning object before apssing it about
            //  }}
            variant="contained"
            color="primary"
            fullWidth
          >
            save
          </button>
        </form>
      )}
    </Formik>
  );
}
