import React from "react";
import {useSelector} from "react-redux";


export default function AuthorizeGcalButton(){
    const authorized = useSelector(state=>state.auth.isAuthorizedToGcal)


    function handleAuthorize(){
        fetch("http://localhost:8000/api/v1/gcal/url")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                window.location.href = res.url;
            });
    }


    



    return (
            authorized
            ?
            <p>you are authorized to Google Calendar yay!</p>
            :
            <button onClick={handleAuthorize}>
                authorize
            </button>
    )
}