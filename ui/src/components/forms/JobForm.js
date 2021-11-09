import React from "react";
import mongoose from "mongoose";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { cloneDeep } from "lodash";

import { ListBuilder } from "./AddressInput";

import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import { editJobThunk } from "../Calendar/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router";
import Modal from "./Modal";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";

import { parseISO, setHours } from "date-fns";

import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { Typography } from "@material-ui/core";

import { jobSchema } from "api/model/job"; //TODO change name of buildSchema
import { processMongooseError } from "./../../utilities/processMongooseError";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

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

export default function JobForm({ initialValues, title, handleSubmit }) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const query = useQuery();

  // const { id } = useParams();

  // let job = useSelector((state) =>
  //   state.calendar.events.find((event) => event._id == id)
  // );

  // function isEditForm() {
  //   console.log(id);
  //   if (id) {
  //     return true;
  //   } else {
  //     console.log("returning flasot");
  //     return false;
  //   }
  // }

  // function getInitialValuesFromQuery() {
  //   const date = parseISO(query.get("iso-date"));
  //   const start = setHours(date, query.get("hours") * 1);
  //   const end = setHours(date, query.get("hours") + 1);
  //   return {
  //     start,
  //     end,
  //   };
  // }

  // //const initialValues = isEditForm() ? job : getInitialValuesFromQuery();

  // const handleSubmit = (data) => {
  //   dispatch(editJobThunk(data));
  //   history.goBack();
  // };

  const validator = async (values) => {
    const doc = new mongoose.Document(values, jobSchema);

    const validationResult = await doc.validateSync();

    const processed = processMongooseError(validationResult);

    return processed;
  };

  return (
    <Modal>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <Formik
            initialValues={cloneDeep(initialValues || {})}
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
                      label="start time"
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      className={classes.flexItem}
                      value={props.values.end}
                      onChange={(date) => {
                        props.setFieldValue("end", date, true);
                      }}
                      label="end time"
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
                      label="date"
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
                  itemName="address"
                  errors={props.errors?.addresses}
                />
                <ListBuilder
                  value={props.values.operatives}
                  onChange={props.handleChange}
                  label="add operative"
                  name="operatives"
                  itemName="operative"
                  errors={props.errors?.operatives}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  save
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Modal>
  );
}
