import { Toolbar, Typography, Button } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

import { monthAndYear } from "../utilities/dateUtilities.js";

import { useHistory } from "react-router";

export default function Header({
  currentDate,
  incrementWeek,
  decrementWeek,
  handleShowModal,
}) {
  const history = useHistory();

  return (
    <Toolbar>
      <Button onClick={decrementWeek}>
        <ArrowBack />
      </Button>
      <Typography variant="h4">{monthAndYear(currentDate)}</Typography>

      <Button onClick={incrementWeek}>
        <ArrowForward />
      </Button>

      {/* <Button
        onClick={() => history.push("/calendar/job-form")}
        variant="contained"
        color="primary"
      >
        new job
      </Button> */}
    </Toolbar>
  );
}
