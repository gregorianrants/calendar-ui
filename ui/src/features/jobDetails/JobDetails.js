import Modal from "../../components/Modal";
import {Card, CardContent, CardHeader, IconButton} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';


import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Grid from "@material-ui/core/Grid";

import {makeStyles} from "@material-ui/core/styles";


import {useParams, useHistory} from "react-router";
import {useGetJobQuery,useDeleteJobMutation} from "../api/apiSlice";
import {useLocation} from "react-router-dom";

import {format} from 'date-fns'

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
        overflowY: "auto"
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


export function JobDetails({displayEvent, close, updateEvent}) {
    const classes = useStyles();
    const location = useLocation()

    //TODO
    //returns /calendar/job-details/ckx30y8w2000jpgvags8peqpc

    //may use to know what screen JobDetails has been launched from and select from the
    //the apropriate query to get the data rather than do another network request.


    const history = useHistory();

    let {id} = useParams();

    console.log(id);

    // let job = useSelector((state) =>
    //   state.calendar.events.find((event) => event._id == id)
    // );

    let {data: job, isFetching} = useGetJobQuery(id);
    let [deleteJob] = useDeleteJobMutation()




    //const { start, end, customer, charges, operatives, items, addresses } = job;
    //const { customer } = displayEvent;

    //TODO: map over operatives

    const CustomerDetails = ({customer}) => (
        <Card className={classes.card}>
            <CardHeader title={"Customer Details"}></CardHeader>
            <CardContent>
                <List className={classes.list}>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary={customer.name} secondary="name"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={customer.mobile}
                            secondary="mobile"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={customer.email}
                            secondary="email"
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )

    const Charges = ({charges}) => (
        <Grid container spacing={1} className={classes.pricing}>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title={charges?.hourlyRate}
                        subheader={"per hour"}
                    />
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title={charges?.fuelCharge}
                        subheader={"fuel charge"}
                    />
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title={charges?.travelTime}
                        subheader={"travel time"}
                    />
                </Card>
            </Grid>
        </Grid>
    )

    const Times = ({start, end}) => {
        return (
            <Grid container spacing={1} className={classes.pricing}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title={format(new Date(start), 'PP')}
                            subheader={"date"}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title={format(new Date(start), 'p')}
                            subheader={"start time"}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title={format(new Date(end), 'p')}
                            subheader={"end time"}
                        />
                    </Card>
                </Grid>
            </Grid>
        )

    }

    const Operatives = ({operatives})=>(
        <Card>
            <CardHeader title={"operatives"}/>
            <List>
                {(operatives || []).map(operative=>(
                    <ListItem key={operative._id}>
                        <ListItemIcon>
                            <AccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary={operative.value}/>
                    </ListItem>
                ))}
            </List>
        </Card>
    )

    const Addresses = ({addresses=[]})=>(
        <Card  className={classes.row}>
            <CardHeader title={"Addresses"}/>
            <List>
                {addresses.map(address=>(
                    <ListItem key={address._id}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={address.value}/>
                    </ListItem>
                ))}
            </List>
        </Card>
    )


    if (isFetching) {
        return null
    } else {
        const {customer, charges, items, addresses, operatives, start, end} = job;
        return (
            <Modal>
                <Card style={{width: 1200, backgroundColor: "#F3F3FB"}}>
                    <CardHeader
                        title={customer.name}
                        action={
                            <>
                                <IconButton
                                    onClick={() => {
                                        history.push(`/calendar/edit-job-form/${id}`);
                                    }}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        deleteJob(id)
                                        history.push("/calendar");
                                    }}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        history.push("/calendar");
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>

                            </>
                        }
                    />
                    <CardHeader/>
                    <CardContent className={classes.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <CustomerDetails customer={customer}/>
                                <Charges charges={charges}/>
                                <Times start={start} end={end}/>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardHeader title={"Items"}/>
                                    <CardContent className={classes.items}>{items}</CardContent>
                                </Card>
                            </Grid>
                          <Grid item xs={4}>
                           <Operatives operatives={operatives}/>
                              <Addresses addresses={addresses}/>
                          </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>

        )
    }
}
