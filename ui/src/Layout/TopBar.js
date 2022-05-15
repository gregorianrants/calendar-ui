import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import AuthenticationButton from "../features/auth/AuthenticationButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

function TopBar(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        VanCal
                    </Typography>
                    <AuthenticationButton />
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default TopBar