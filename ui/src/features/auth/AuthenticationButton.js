import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logoutThunk } from "./authSlice";

function Login() {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(loginThunk)} color='inherit'>Log In</Button>;
}

function Logout() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(logoutThunk);
      }}
      color='inherit'
    >
      Log Out
    </Button>
  );
}

export default function AuthenticationButton({color = 'inherit'}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Logout /> : <Login />;
}
