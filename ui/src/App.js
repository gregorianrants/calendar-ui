import "./App.css";
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import LeftDrawer from "./Layout/LeftDrawer";
import Content from './Layout/Content'
import TopBar from './Layout/TopBar'
import {
  BrowserRouter as Router,
} from "react-router-dom";

//TODO will need to read through code at some point and chekc the math, not sure i am accounting for border width when looking
//at height of each hour/day
//also need to think about the implciations of the fact that a pixel values in css can be rounded may need to put in some code to account for
//border width being set by a user to something that gets rounded

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100%'
    },
    root: {
        height: '100%'
    }
}));

function App() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <TopBar />
          <div className={classes.wrapper}>
              <LeftDrawer />
              <Content />
            </div>
      </Router>
    </div>
  );
}

export default App;
