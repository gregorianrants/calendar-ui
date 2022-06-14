import React from "react";
import {useSelector} from "react-redux";
import {revokeGcalThunk} from "../auth/authSlice";
import {useDispatch} from "react-redux";
import {Card, CardHeader, CardContent, CardActions, IconButton, Button} from "@material-ui/core";

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function AuthorizeGcalCard(){
    const authorized = useSelector(state=>state.auth.isAuthorizedToGcal)
    const dispatch = useDispatch()

    function handleAuthorize(){
        fetch(`${BASE_URL}/api/v1/gcal/url`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                window.location.href = res.url;
            });
    }



    return (
        authorized
        ?
        <Card style={{width: '100%'}}>
            <CardHeader
                title={'Google Calendar Authorization'}
            />
            <CardContent>
                you are authorized to Google Calendar yay!
            </CardContent>
            <CardActions>
                  <Button
                      variant="contained" color="primary"
                      onClick={()=>dispatch(revokeGcalThunk())}
                  >
                      revoke authorization
                  </Button>
            </CardActions>
        </Card>
            :
            <Card>
                <CardHeader
                    title={'Google Calendar Authorization'}
                />
                <CardContent>
                    Do you want to authorize VanCal to view your google calendar events? Then click the authorization button and you are there.
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained" color="primary"
                        onClick={handleAuthorize}
                    >
                        Authorize
                    </Button>
                </CardActions>
            </Card>

    )
}

/*
<button onClick={handleAuthorize}>
    authorize
</button>*/
