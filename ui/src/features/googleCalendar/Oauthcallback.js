import React from 'react'
import {useLocation} from "react-router-dom";
import {authorize} from "./gcalApi";


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function OauthCallback(){
    const query = useQuery()

    React.useEffect(()=>{
        const code = query.get("code");

        if(code){
            authorize(code)
                .then((res)=>{
                    console.log(res)
                })
                .catch(console.error)

        }

    },[])

    return <p>hello</p>
}