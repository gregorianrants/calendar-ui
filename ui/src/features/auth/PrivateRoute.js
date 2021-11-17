import { useSelector } from "react-redux";
import {
        BrowserRouter as Router,
        Route,
        Redirect,
      } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  let auth = useSelector((state) => state.auth.authed);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
