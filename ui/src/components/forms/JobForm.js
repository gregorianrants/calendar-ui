import React, { useReducer } from "react";
import mongoose from "mongoose";
import { useInput } from "../hooks/useInput";
import { useArray } from "../hooks/useArray";
import { startEndChange, StartEndInput } from "./StartEndInput";
import styled from "styled-components";
import { useImmerReducer } from "use-immer";
import camelCase from "camelcase";
import { Formik, Field } from "formik";
import { cloneDeep, values, flatten } from "lodash";
//import { styled } from "@mui/material/styles";

import { ListBuilder } from "./AddressInput";

import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import { rootReducer } from "./reducer";
import { editJob } from "../../Model/Jobs";

import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { Typography } from "@material-ui/core";

import { jobSchema } from "api/model/job"; //TODO change name of buildSchema
import { processMongooseError } from "./../../utilities/processMongooseError";

function dateTimeFromInput(date, time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let res = new Date(date);
  res.setHours(hours);
  res.setMinutes(minutes);
  return res;
}

const FlexRow = styled.div`
  display: flex;
`;

const useStyles = makeStyles({
  flexItem: {
    flex: "1 1 0",
    "&:not(:last-child)": {
      marginRight: "10px",
    },
  },
  inputRow: {
    marginBottom: "10px",
  },
  textField: {
    "& textarea": {
      whiteSpace: "pre-line",
    },
  },
});

export default function JobForm({
  updateEvent,
  close,
  toggleModal,
  initialValues,
}) {
  const classes = useStyles();

  console.log(initialValues);

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

  function printAsPlainObject(err) {
    const result =
      typeof err === "object" ? JSON.parse(JSON.stringify(err)) : null;
    console.log(result);
  }

  const validator = async (values) => {
    const doc = new mongoose.Document(values, jobSchema);

    const validationResult = await doc.validateSync();
    console.log(validationResult);

    const processed = processMongooseError(validationResult);
    console.log(processed);

    return processed;
  };

  return (
    <Formik
      initialValues={cloneDeep(initialValues)}
      onSubmit={handleSubmit}
      validate={validator}
    >
      {(props) => (
        //<Typography variant="h4">Create Job</Typography>
        <form onSubmit={props.handleSubmit}>
          <Field
            as={TextField}
            className={classes.inputRow}
            name="customer.name"
            label="name"
            error={props.errors?.customer?.name}
            helperText={props.errors?.customer?.name}
            fullWidth
          />
          <Field
            as={TextField}
            className={classes.inputRow}
            error={props.errors?.customer?.mobile}
            helperText={props.errors?.customer?.mobile}
            name="customer.mobile"
            label="mobile"
            fullWidth
          />
          <Field
            as={TextField}
            className={classes.inputRow}
            name="customer.email"
            label="email"
            error={props.errors?.customer?.email}
            helperText={props.errors?.customer?.email}
            fullWidth
          />
          <FlexRow className={classes.inputRow}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.flexItem}
                value={new Date(props.values.start)}
                onChange={(date) => {
                  props.setFieldValue("start", date, true);
                }}
                label="date"
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.flexItem}
                value={props.values.end}
                onChange={(date) => {
                  props.setFieldValue("start", date, true);
                }}
                label="start time"
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.flexItem}
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
                label="end time"
              />
            </MuiPickersUtilsProvider>
          </FlexRow>

          <FlexRow className={classes.inputRow}>
            <Field
              className={classes.flexItem}
              as={TextField}
              name="charges.hourlyRate"
              label="hourly rate"
              error={props.errors?.charges?.hourlyRate}
              helperText={props.errors?.charges?.hourlyRate}
              fullWidth
            />
            <Field
              className={classes.flexItem}
              as={TextField}
              name="charges.fuelCharge"
              label="fuelCharge"
              error={props.errors?.charges?.fuelCharge}
              helperText={props.errors?.charges?.fuelCharge}
              fullWidth
            />
            <Field
              className={classes.flexItem}
              as={TextField}
              name="charges.travelTime"
              label="travelTime"
              error={props.errors?.charges?.travelTime}
              helperText={props.errors?.charges?.travelTime}
              fullWidth
            />
          </FlexRow>

          <Field
            as={TextField}
            className={classes.inputRow}
            name="items"
            label="items"
            error={props.errors?.items}
            helperText={props.errors?.items}
            fullWidth
            multiline
            rows={5}
          />
          <ListBuilder
            value={props.values.addresses}
            onChange={props.handleChange}
            label="add address"
            name="addresses"
            itemName='address'
            errors={props.errors?.addresses}
          />
          <ListBuilder
            value={props.values.operatives}
            onChange={props.handleChange}
            label="add operative"
            name="operatives"
            itemName='operative'
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
          <Button
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
          </Button>
        </form>
      )}
    </Formik>
  );
}
