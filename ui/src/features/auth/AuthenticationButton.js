import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logoutThunk } from "./authSlice";
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';

const Spinner = styled(CircularProgress)({
  color: 'white'
})


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
  const isLoading = useSelector((state) =>state.auth.loading)

  if(isLoading) return <Spinner/>

  else if(isAuthenticated) return <Logout />

  else return <Login />;
}
