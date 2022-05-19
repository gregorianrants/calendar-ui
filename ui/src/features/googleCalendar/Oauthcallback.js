import React from 'react'
import {useLocation} from "react-router-dom";
import {authorizeGcalThunk} from "../auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function OauthCallback(){
    const query = useQuery()
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuthenticated = useSelector(state=>state.auth.isAuthorizedToGcal)

    React.useEffect(()=>{
        if(isAuthenticated){
            history.push('/calendar')
        }
    },[isAuthenticated])

    React.useEffect(()=>{
        async function asyncHandler(){
            const code = query.get("code");
            if(code){
                dispatch(authorizeGcalThunk(code))
            }
        }
        asyncHandler()
    },[dispatch,query])

    return <p>Authorizing to google calendar...</p>
}