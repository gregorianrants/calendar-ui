import React from "react";
import mongoose from "mongoose";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import {mergeLeft} from 'ramda'
import PersonIcon from "@material-ui/icons/Person";

import { ListBuilder } from "./ListBuilder";

import {TextField, Button, IconButton} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {getHours,getMinutes,setHours,setMinutes} from "date-fns";
import {get} from 'lodash-es'
import HouseIcon from "@material-ui/icons/House";
import CloseIcon from "@material-ui/icons/Close";

import Modal from "../../components/Modal";
import { Card, CardContent, CardHeader } from "@material-ui/core";

import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { jobSchema } from "api/model/job"; //TODO change name of buildSchema

import { processMongooseError } from "../../utilities/processMongooseError";
import {useHistory, useLocation} from "react-router-dom";

//es6 import was casuing a bug when building
//const { processMongooseError } = require("../../utilities/processMongooseError")

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

function dateTimeFromInput(date, time) {
  time = new Date(time)
  const hours = getHours(time);
  const minutes = getMinutes(time);
  let res = new Date(date);
  res = setHours(res,hours);
  res = setMinutes(res, minutes);
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
  content:{
    paddingTop: 0,
    overflowY: 'auto',
    maxHeight: '85vh'
  }
});

function showError(path,touched,errors){
  const error = get(errors,path)
  const isTouched = get(touched,path)
  return error && isTouched
}

function getErrorText(path,touched,errors){
  if(!showError(path,touched,errors)) return null

  return get(errors,path)
}

function isGlobalError(path,errors){
  const error = get(errors,path)
  if (error && !Array.isArray(error)){
    return true
  }
}

const initial = {
  charges: {
    hourlyRate: null,
    fuelCharge: null,
    travelTime: null,
  },
  customer: {
    name: null,
    mobile: null,
    email: null
  },
  items: null,
  bill: null
}



export default function JobForm({ initialValues={}, title, handleSubmit, schema }) {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()

  console.log(initialValues)



  const validator = async (values) => {

    console.log(values)
    const doc = new mongoose.Document(values, schema);
    console.log(doc._doc)
    const validationResult = await doc.validateSync();
    console.log(validationResult)
    const processed = processMongooseError(validationResult);

    //TODO: log an error message if validation fails anything that fails that is not on form will fail silently
    //got caught out already by this and took a while to find.

    return processed;
  };

  return (
    <Modal>
      <Card>
        <CardHeader
            title={title}
        action={
          <IconButton>
            <CloseIcon
                onClick={()=>history.goBack()}
            />
          </IconButton>
          }
        />
        <CardContent className={classes.content}>
          <Formik
            initialValues={mergeLeft(initialValues,initial)}//merge mutates the second arg! hence the cloneDeep
            onSubmit={handleSubmit}
            validate={validator}
          >
            {({touched,
                handleSubmit,
                errors,
              values,
              setFieldValue,
              handleChange,setFieldTouched}) => {
              return (
                  //<Typography variant="h4">Create Job</Typography>
                  <Form onSubmit={handleSubmit}  autocomplete="off">
                    <Field
                        as={TextField}
                        className={classes.inputRow}
                        name="customer.name"
                        label="name"
                        error={showError('customer.name',touched,errors)}
                        helperText={getErrorText('customer.name',touched,errors)}
                        fullWidth
                    />
                    <Field
                        as={TextField}
                        className={classes.inputRow}
                        error={showError("customer.mobile",touched,errors)}
                        helperText={getErrorText("customer.mobile",touched,errors)}
                        name="customer.mobile"
                        label="mobile"
                        fullWidth
                    />
                    <Field
                        as={TextField}
                        className={classes.inputRow}
                        name="customer.email"
                        label="email"
                        error={showError("customer.email",touched,errors)}
                        helperText={getErrorText("customer.email",touched,errors)}
                        fullWidth
                    />
                    <FlexRow className={classes.inputRow}>
                      {/*utils prop sets date library to use*/}
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/*according to docs https://material-ui-pickers.dev/api/TimePicker
                    type passed to on change is of same type as used by library passed to utils
                    value must be a "Parseable Date" - see docs
                    docs say - Pass any value to the picker, and if it won't be parsed as expected
                    see: https://material-ui-pickers.dev/getting-started/parsing
                    i have taken decision to pass date object which is what date-fns uses rather than a string (which seems to work)
                    selector in calendar slice converts dates to objects already.
                    */}
                        <TimePicker
                            className={classes.flexItem}
                            value={new Date(values.start)}
                            onChange={(date) => {
                              setFieldValue("start", date, true);
                            }}
                            label="start time"
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            className={classes.flexItem}
                            value={values.end}
                            onChange={(date) => {
                              setFieldValue("end", date, true);
                            }}
                            label="end time"
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            className={classes.flexItem}
                            value={values.start}
                            onChange={(date) => {
                              const start =  dateTimeFromInput(date, values.start)
                              const end = dateTimeFromInput(date,values.end)
                              setFieldValue(
                                  "start",
                                 start,
                                  true
                              );
                              setFieldValue(
                                  "end",
                                  end,
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
                          error={showError("charges.hourlyRate",touched,errors)}
                          helperText={getErrorText("charges.hourlyRate",touched,errors)}
                          fullWidth
                      />
                      <Field
                          className={classes.flexItem}
                          as={TextField}
                          name="charges.fuelCharge"
                          label="fuelCharge"
                          error={showError("charges.fuelCharge",touched,errors)}
                          helperText={getErrorText("charges.fuelCharge",touched,errors)}
                          fullWidth
                      />
                      <Field
                          className={classes.flexItem}
                          as={TextField}
                          name="charges.travelTime"
                          label="travelTime"
                          error={showError("charges.travelTime",touched,errors)}
                          helperText={getErrorText("charges.travelTime",touched,errors)}
                          fullWidth
                      />
                    </FlexRow>

                    <Field
                        as={TextField}
                        className={classes.inputRow}
                        name="items"
                        label="items"
                        error={errors?.items}
                        helperText={errors?.items}
                        fullWidth
                        multiline
                        minRows={5}
                    />
                    <ListBuilder
                        value={values.addresses}
                        onChange={handleChange}
                        label="add address"
                        name="addresses"
                        itemName="address"
                        errors={errors?.addresses}
                        onTouch={()=>setFieldTouched('addresses')}
                        touched={touched?.addresses}
                        Icon={HouseIcon}
                        id='field1'
                    />
                    <ListBuilder
                        value={values.operatives}
                        onChange={handleChange}
                        label="add operative"
                        name="operatives"
                        itemName="operative"
                        errors={errors?.operatives}
                        onTouch={()=>setFieldTouched('operatives')}
                        touched={touched?.operatives}
                        Icon={PersonIcon}
                        id='field2'
                    />
                    <Field
                        className={classes.flexItem}
                        as={TextField}
                        name="bill"
                        label="bill"
                        error={showError("bill",touched,errors)}
                        helperText={getErrorText("bill",touched,errors)}
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                      save
                    </Button>
                  </Form>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
    </Modal>
  );
}
