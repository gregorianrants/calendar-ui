import React from "react";
import JobForm from "./JobForm";
import { useHistory, useLocation } from "react-router";
import { parseISO, setHours } from "date-fns";

import {useAddJobMutation} from "../api/apiSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function CreateJobForm() {

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

  const [addNewJob] = useAddJobMutation()



  const initialValues = getInitialValuesFromQuery();

  const handleSubmit = async (data) => {
   /* console.log("sadfasdfasdfsadfsad");
    dispatch(createJobThunk(data));
    history.goBack();*/
    try {
      await addNewJob(data).unwrap()
      history.goBack()
    }catch(err){
      console.error('failed to save the new job')
    }
  };

  return (
    <JobForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      title="Create Joby"
    />
  );
}
