import React from 'react'
import {useLocation} from "react-router-dom";
import {Authorize} from "../Model/googleAuth";


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function OauthCallback(){
    const query = useQuery()



    React.useEffect(()=>{
        const code = query.get("code");

        if(code){
            Authorize(code)
                .then(()=>{
                    console.log('it worked kind off')
                })
                .catch(console.error)

        }

    },[])

    return <p>hello</p>
}