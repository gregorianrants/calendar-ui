import React from "react";
import { editJob } from "../../Model/Jobs";
import JobForm from "./JobForm";

export default function EditJobForm({
  updateEvent,
  close,
  toggleModal,
  initialValues,
}) {
  const handleSubmit = (_id, data) => {
    console.log(data);
    editJob({ _id: _id, data: data })
      .then((response) => {
        if (response.status === "success") {
          onSuccess(_id, response.data);
        } else if (
          response.status === "fail" &&
          response.name === "validationError"
        ) {
          console.log("i need validation");
        }
      })
      .catch(console.error);
  };

  function onSuccess(_id, data) {
    updateEvent(_id, data);
    close();
  }

  return (
    <JobForm
      handleSubmit={(editedData) => {
        return handleSubmit(initialValues._id, editedData);
      }}
      toggleModal={toggleModal}
      initialValues={initialValues}
    />
  );
}
