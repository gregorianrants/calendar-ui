import AuthorizeGcalCard from "../googleCalendar/AuthorizeGcalCard";
import {useFakeDataMutation} from "../api/apiSlice";
import {useGetUserQuery} from "../api/apiSlice";

import {
    ListItem,
    List,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    TextField, Typography, CardContent, CardActions, Button, Grid
} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import {Card,CardHeader} from "@material-ui/core";
import UserDetails from "./UserDetails";
import styled from "styled-components";

function FakeDataButton() {
    const [fakeData] = useFakeDataMutation()


    return (
        <Button
            onClick={fakeData}
            variant="contained" color="primary"
        >
            Fake it
        </Button>
    )
}


const Title = styled.div`
margin-top: 15px;
  margin-bottom: 30px;
`

export default function Settings() {
    return (
        <div style={{maxWidth: '1200px'}}>
            <Title>
                <Typography variant='h4'>Settings</Typography>
            </Title>
            <Grid container spacing={3}>
                <Grid container spacing={3} item xs={6}>
                    <Grid item xs={12}>
                        <AuthorizeGcalCard/>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title='Generate Fake Data'
                            />
                            <CardContent>
                                You can click the button bellow to fake some data for the app.
                                Doing this will remove any previously generated fake data and replace it with with new data.
                                Any Data you have created yourself will remain untouched.
                            </CardContent>
                            <CardActions>
                                <FakeDataButton/>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader
                            title='User Details'
                        />
                        <CardContent>
                            <p>these details will be used to provide details about your company on any invoices sent by VanCal.</p>
                            <p>If a receiver of an invoice replies to the invoice the reply will go to the email address provided here.</p>
                            <UserDetails/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>









            <h2></h2>


        </div>
    )

}