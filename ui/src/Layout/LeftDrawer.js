import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import SettingsIcon from "@material-ui/icons/Settings";
import TableChartIcon from '@material-ui/icons/TableChart';
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,

    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    wrapper: {display: 'flex'}
}));


function LeftDrawer(){
    const classes = useStyles();
    return(
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >

            <div className={classes.drawerContainer}>
               <Toolbar/>
                <List>
                    <ListItem component={Link} to='/calendar'>
                        <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
                        <ListItemText>Calendar</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to='/list'>
                        <ListItemIcon><TableChartIcon/></ListItemIcon>
                        <ListItemText>List</ListItemText>
                    </ListItem>
                    <ListItem component={Link} to='/settings'>
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

export default LeftDrawer