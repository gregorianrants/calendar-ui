import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function LoginPage(){
    const history = useHistory()

    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
    const loading = useSelector(state=>state.auth.loading)

    React.useEffect(()=>{
        if(isAuthenticated){
            history.push('/calendar')
        }

    },[isAuthenticated,history])


    return (
        loading ?
            <div>
                <h2>Loading...</h2>
                <CircularProgress />
            </div>

            :
            <div>
                <p>You need to login to use the application</p>
                <p>The login button can be found at the top right hand side of the screen</p>
            </div>

    )
}