import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function dateTimeFromInput(date, time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let res = new Date(date);
  res.setHours(hours);
  res.setMinutes(minutes);
  return res;
}

//export function StartEndInput({startName,endName,startValue,endValue,onStartChange,onEndChange}){

export function StartEndInput({
  startName,
  endName,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  formikProps
}) {
  const handleDateChange = (date) => {
    onStartChange(dateTimeFromInput(date, startValue));
    onEndChange(dateTimeFromInput(date, endValue));
  };

 

  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={startValue}
          onChange={handleDateChange}
          label="date"
        />
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          value={startValue}
          onChange={onStartChange}
          label="start"
        />
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker value={endValue} onChange={onEndChange} label="end" />
      </MuiPickersUtilsProvider>
    </Container>
  );
}
