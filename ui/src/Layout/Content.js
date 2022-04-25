import {Redirect, Route, Switch} from "react-router-dom";
import Error from "../features/errors/Error";
import ErrorHandler from "../features/errors/ErrorHandler";
import PrivateRoute from "../features/auth/PrivateRoute";
import SettingsContext from "../features/Calendar/Contexts";
import Calendar from "../features/Calendar/Calendar";
import {JobDetails} from "../features/jobDetails/JobDetails";
import {GcalDetails} from "../features/Calendar/GcalDetails";
import EditJobForm from "../features/forms/EditJobForm";
import CreateJobForm from "../features/forms/CreateJobForm";
import Auth from "../features/auth/Auth";
import AuthorizeGcalButton from "../features/googleCalendar/AuthorizeGcalButton";
import LoginPage from "../features/auth/LoginPage";
import OauthCallback from "../features/googleCalendar/Oauthcallback";
import {makeStyles} from "@material-ui/core/styles";
import {Toolbar} from "@material-ui/core";

const settingsValue = {
    borderWidth: 1,
    hourHeight: 60,
};


const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    // title: {
    //   flexGrow: 1,
    // },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    wrapper: {display: 'flex'}
}));


function Content(){
    const classes = useStyles();
    return (
        <Switch>
            <div className={classes.content}>
                <Toolbar />
                <Route path="/error">
                    <Error />
                </Route>
                <ErrorHandler>
                    <Switch>
                        <Route path="/calendar">
                            <PrivateRoute>
                                <SettingsContext.Provider value={settingsValue}>
                                    <Calendar />
                                </SettingsContext.Provider>
                                <Switch>
                                    <Route path="/calendar/job-details/:id">
                                        <JobDetails />
                                    </Route>
                                    <Route  path="/calendar/gcal-details/:id">
                                        <GcalDetails />
                                    </Route>
                                    <Route path="/calendar/edit-job-form/:id">
                                        <EditJobForm />
                                    </Route>
                                    <Route path="/calendar/create-job-form">
                                        <CreateJobForm />
                                    </Route>
                                </Switch>
                            </PrivateRoute>
                        </Route>
                        <Route path='/auth'>
                            <Auth />
                        </Route>
                        <Route path="/gcal">
                            <AuthorizeGcalButton />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>

                        {/*auth handles call back from Auth0*/}
                        <Route path="/oauthcallback">
                            <OauthCallback />
                        </Route>
                        <Route>
                            <Redirect to="/calendar" />
                        </Route>
                    </Switch>
                </ErrorHandler>
            </div>

        </Switch>

    )

}

export default Content