import "./App.css";
import React from 'react'
import Calendar from "./features/Calendar/Calendar";
import AuthorizeGcalButton from './features/googleCalendar/AuthorizeGcalButton'


import SettingsContext from "./features/Calendar/Contexts";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { JobDetails } from "./features/jobDetails/JobDetails";

import EditJobForm from "./features/forms/EditJobForm";
import CreateJobForm from "./features/forms/CreateJobForm";


import Auth from "./features/auth/Auth";
import AuthenticationButton from "./features/auth/AuthenticationButton";
import PrivateRoute from "./features/auth/PrivateRoute";
import Drawer from '@material-ui/core/Drawer';
import {List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SettingsIcon from '@material-ui/icons/Settings';
import OauthCallback from "ui/src/features/googleCalendar/Oauthcallback";
import LoginPage from "./features/auth/LoginPage";



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
    Link
} from "react-router-dom";

const settingsValue = {
  borderWidth: 1,
  hourHeight: 30,
};

//TODO will need to read through code at some point and chekc the math, not sure i am accounting for border width when looking
//at height of each hour/day
//also need to think about the implciations of the fact that a pixel values in css can be rounded may need to put in some code to account for
//border width being set by a user to something that gets rounded

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopBar(){
  const classes = useStyles();
  const [drawerState,setDrawerState] = React.useState(false)
  const toggleDrawer = ()=>setDrawerState(state=>!state)
  return (
      <>
        <Drawer open={drawerState}
                ModalProps={{ onBackdropClick: toggleDrawer }}>
          <List>
            <ListItem component={Link} to='/calendar'>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText>Calendar</ListItemText>
            </ListItem>
            <ListItem component={Link} to='/gcal'>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText>google calendar</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                VanCal
              </Typography>
              <AuthenticationButton />
            </Toolbar>
          </AppBar>
        </div>
      </>
  )
}

function Content(){
  return (
      <Switch>
        <Route path="/calendar/job-details/:id">
          <SettingsContext.Provider value={settingsValue}>
            <Calendar />
          </SettingsContext.Provider>
          <JobDetails />
        </Route>
        <Route path="/calendar/edit-job-form/:id">
          <SettingsContext.Provider value={settingsValue}>
            <Calendar />
          </SettingsContext.Provider>
          <EditJobForm />
        </Route>
        <Route path="/calendar/create-job-form">
          <SettingsContext.Provider value={settingsValue}>
            <Calendar />
          </SettingsContext.Provider>
          <CreateJobForm />
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
        <Route path="/calendar">
          <PrivateRoute>
            <SettingsContext.Provider value={settingsValue}>
              <Calendar />
            </SettingsContext.Provider>
          </PrivateRoute>
        </Route>
        {/*auth handles call back from Auth0*/}

        <Route path="/oauthcallback">
          <OauthCallback />
        </Route>
        <Route>
          <Redirect to="/calendar" />
        </Route>
      </Switch>
      )

}




function App() {



  return (
    <div className="App">
      <Router>
        <TopBar />
        <Content />
      </Router>
    </div>
  );
}

export default App;
