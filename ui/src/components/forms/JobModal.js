import Modal from "./Modal";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import JobForm from "./JobForm";
import { PersonOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    fontVariant: "small-caps",
    color: "#324191",
  },
  group: {
    marginBottom: "0.5em",
  },
  content: {
    paddingTop: 0,
  },
  li: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  container: {
    marginTop: 20,
    backgroundColor: "#F3F3FB",
  },
  list: {
    padding: 0,
    "& > li": {
      padding: 0,
    },
  },
  pricing: {
    marginTop: theme.spacing(2), //TODO use row class for top margin
    textAlign: "center",
  },
  items: {
    whiteSpace: "pre-line",
  },
  row: {
    marginTop: theme.spacing(2),
  },
}));

export default function JobModal({ displayEvent, close, updateEvent }) {
  const classes = useStyles();
  const [editMode, setEditMode] = React.useState(false);

  const { start, end, customer, charges, operatives, items, addresses } =
    displayEvent;

  //const { customer } = displayEvent;

  //TODO: map over operatives
  return (
    <Modal>
      {editMode ? (
        <Card style={{ width: 600, backgroundColor: "#F3F3FB" }}>
          <CardContent>
            <JobForm
              title="Edit Job"
              initialValues={displayEvent}
              updateEvent={updateEvent}
              close={close}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Card style={{ width: 1200, backgroundColor: "#F3F3FB" }}>
            <CardHeader
              title={customer.name}
              action={
                <>
                  <IconButton
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={close}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
            />
            <CardHeader />
            <CardContent className={classes.content}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardHeader title={"Customer Details"}></CardHeader>
                    <CardContent>
                      <List className={classes.list}>
                        <ListItem>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={customer.name}
                            secondary="name"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={customer.mobile}
                            secondary="mobile"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <EmailIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={customer.email}
                            secondary="email"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                  <Grid container spacing={1} className={classes.pricing}>
                    <Grid item xs={4}>
                      <Card>
                        <CardHeader
                          title={charges.hourlyRate}
                          subheader={"per hour"}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card>
                        <CardHeader
                          title={charges.fuelCharge}
                          subheader={"fuel charge"}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card>
                        <CardHeader
                          title={charges.travelTime}
                          subheader={"travel time"}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardHeader title={"Items"} />
                    <CardContent className={classes.items}>{items}</CardContent>
                  </Card>
                </Grid>
                {/* <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardHeader title={"Removal Operatives"}></CardHeader>
                    <CardContent>
                      <List className={classes.list}>
                        <ListItem>
                          <ListItemIcon>
                            <AccessibilityNewIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={operatives[0].value}
                            secondary="first man"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AccessibilityNewIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={operatives[1].value}
                            secondary="second man"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Modal>

    /* editMode
        ?
        <EditJobModal data={displayEvent} addToEvents={addToEvents}/>
            :
        <Modal
        open={true}
        >
            <Card style={{width: 300}}>
                <CardHeader
                    title={summary}
                    action={
                        <>
                            <IconButton>
                                <EditIcon onClick={()=>{setEditMode(true)}}/>
                            </IconButton>
                            <IconButton>
                                <CloseIcon onClick={close}/>
                            </IconButton>
                        </>

                    }
                />
                <CardContent className={classes.content}>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            location
                        </Typography>
                        <Typography variant='body2'>
                            {location}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            start
                        </Typography>
                        <Typography variant='body1'>
                            {start.toLocaleString()}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            end
                        </Typography>
                        <Typography variant='body1'>
                            {end.toLocaleString()}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            description
                        </Typography>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                    </div>




                    <Typography>

                    </Typography>


                </CardContent>
            </Card>
        </Modal>*/
  );
}
