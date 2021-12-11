import React from 'react'
import {useLocation} from "react-router-dom";
import {authorizeGcalThunk} from "../auth/authSlice";
import {useDispatch} from "react-redux";


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function OauthCallback(){
    const query = useQuery()
    const dispatch = useDispatch()

    React.useEffect(()=>{
        async function asyncHandler(){
            const code = query.get("code");
            if(code){
                dispatch(authorizeGcalThunk(code))
            }
        }
        asyncHandler()
    },[])

    return <p>hello</p>
}