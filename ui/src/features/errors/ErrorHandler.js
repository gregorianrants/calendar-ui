import { Route, Redirect } from "react-router-dom";
import { useSelector} from "react-redux";
import {clearErrors} from "./errorsSlice";


export default function ErrorHandler({children,...rest}){
    const isError = useSelector((state)=> state.errors.status)




    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isError ? (
                    <Redirect
                        to={{
                            pathname: "/error",
                            state: { from: location },
                        }}
                    />
                ) :
                    children
            }}
        />
    )
}