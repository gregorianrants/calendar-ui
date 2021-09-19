import {Grid} from "@material-ui/core";
import {
    DatePicker,
    MuiPickersUtilsProvider,
    TimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
`

function dateTimeFromInput(date, time) {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}

export function StartEndInput({startName,endName,startValue,endValue,onStartChange,onEndChange}){

    const handleDateChange =(date)=>{
        handleStartChange(dateTimeFromInput(date,startValue))
        handleEndChange(dateTimeFromInput(date,endValue))
    }

    function handleStartChange(date){
        onStartChange({
            target: {value: date, name: startName}
        })
    }

    function handleEndChange(date){
        onEndChange({
            target: {value: date,  name: endName}
        })
    }

    return (

           <Container>
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <DatePicker
                       value={startValue}
                       onChange={handleDateChange}
                       label='date'/>
               </MuiPickersUtilsProvider>

               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <TimePicker
                       value={startValue}
                       onChange={handleStartChange}
                       label='start'/>
               </MuiPickersUtilsProvider>

               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <TimePicker
                       value={endValue}
                       onChange={handleEndChange}
                       label='end'/>
               </MuiPickersUtilsProvider>
           </Container>


    )
}