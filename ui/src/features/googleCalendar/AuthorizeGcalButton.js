import React from "react";
import {useSelector} from "react-redux";
import {revokeGcalThunk} from "../auth/authSlice";
import {useDispatch} from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function AuthorizeGcalButton(){
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
                <div>
                    <p>you are authorized to Google Calendar yay!</p>

                    <button onClick={()=>dispatch(revokeGcalThunk())}>
                        revoke authorization
                    </button>
                </div>

            :
            <button onClick={handleAuthorize}>
                authorize
            </button>
    )
}