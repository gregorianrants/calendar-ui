import React from "react";
import JobForm from "./JobForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { editJobThunk } from "../Calendar/calendarSlice";
import {calendarSelectors} from "../Calendar/calendarSlice";

export default function EditJobForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let job = useSelector(calendarSelectors.eventById(id));

  console.log(job);

  const handleSubmit = (data) => {
    dispatch(editJobThunk(data));
    history.goBack();
  };

  return (
    <JobForm handleSubmit={handleSubmit} initialValues={job} title="Edit Job" />
  );
}
