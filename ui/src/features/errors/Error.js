import React from "react";
import {useSelector} from "react-redux";


export default function Error(){
    const code = useSelector(state => state.errors.statusCode)
    const message = useSelector(state =>state.errors.message)



    return(
        <div>
            <h1>Oops something went wrong</h1>
            <p>error code: {code}</p>
            <p>error message: {message}</p>
        </div>

    )
}