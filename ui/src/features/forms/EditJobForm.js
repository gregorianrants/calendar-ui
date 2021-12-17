import React from "react";
import JobForm from "./JobForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { editJobThunk } from "../Calendar/calendarSlice";
import {calendarSelectors} from "../Calendar/calendarSlice";
import {useEditJobMutation, useGetJobQuery} from "../api/apiSlice";

export default function EditJobForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  //let job = useSelector(calendarSelectors.eventById(id));

  let {data: job,isFetching} = useGetJobQuery(id);

 const [editJob,{isLoading}] = useEditJobMutation()

  const handleSubmit = (data) => {
    editJob(data)
    history.goBack();
  };

  if(isFetching) return null

  return (
    <JobForm handleSubmit={handleSubmit} initialValues={job} title="Edit Job" />
  );
}
