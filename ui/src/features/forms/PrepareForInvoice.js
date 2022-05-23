import React from "react";
import JobForm from "./JobForm";
import { useParams, useHistory } from "react-router";
import {invoiceSchemaFront} from "api/model/invoice";

import {useEditJobMutation, useGetJobQuery} from "../api/apiSlice";
export default function PrepareForInvoice(){
    const { id } = useParams();

    const history = useHistory();

    //let job = useSelector(calendarSelectors.eventById(id));

    let {data: job,isFetching} = useGetJobQuery(id);

    const [editJob] = useEditJobMutation()

    const handleSubmit = (data) => {
        editJob(data)
        history.goBack();
    };

    if(isFetching) return null

    return (
        <JobForm
            handleSubmit={handleSubmit}
            initialValues={job}
            title="Prepare For Invoice"
            schema={invoiceSchemaFront}
        />
    );
}