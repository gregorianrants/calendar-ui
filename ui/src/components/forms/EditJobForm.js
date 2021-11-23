import React from "react";
import JobForm from "./JobForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { editJobThunk } from "../../features/Calendar/calendarSlice";

export default function EditJobForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let job = useSelector((state) =>
    state.calendar.events.find((event) => event._id == id)
  );

  console.log(job);

  const handleSubmit = (data) => {
    dispatch(editJobThunk(data));
    history.goBack();
  };

  return (
    <JobForm handleSubmit={handleSubmit} initialValues={job} title="Edit Job" />
  );
}
