import React from "react";
import {useSelector,useDispatch } from "react-redux";
import {useHistory,useLocation} from "react-router-dom";
import {clearErrors} from "./errorsSlice";


export default function Error(){
    const code = useSelector(state => state.errors.statusCode)
    const message = useSelector(state =>state.errors.message)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const handleGoBack = ()=>{
        dispatch(clearErrors())
        history.push(location.state.from)
    }

    return(
        <div>
            <h1>Oops something went wrong</h1>
            <p>error code: {code}</p>
            <p>error message: {message}</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>

    )
}