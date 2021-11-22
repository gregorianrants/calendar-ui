import React from "react";
import JobForm from "./JobForm";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { createJobThunk } from "../Calendar/calendarSlice";
import { parseISO, setHours } from "date-fns";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function CreateJobForm() {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  function getInitialValuesFromQuery() {
    const date = parseISO(query.get("iso-date"));
    const start = setHours(date, query.get("hour") * 1);
    const end = setHours(date, query.get("hour") * 1 + 1);
    return {
      start,
      end,
    };
  }

  const initialValues = getInitialValuesFromQuery();

  const handleSubmit = (data) => {
    console.log("sadfasdfasdfsadfsad");
    dispatch(createJobThunk(data));
    history.goBack();
  };

  return (
    <JobForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      title="Create Joby"
    />
  );
}
