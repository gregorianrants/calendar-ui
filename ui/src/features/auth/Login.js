import { logIn } from "./authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import React from "react";
import { CLIENT_ID, API_KEY } from "./constants";
import { divide } from "lodash-es";
import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: space-around;
`;

const ButtonStyled = styled.div`
  width: 300px;
  justify-content: space-around;
  margin: 0 auto;
`;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleCredentialResponse(credential) {
    console.log(credential);
    dispatch(logIn());
    history.push("/");
  }

  const myRef = React.useRef(null);

  React.useEffect(() => {
    console.log(myRef);
    let loginContainer = document.getElementById("login-container");
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(myRef.current, {});
  }, []);

  return (
    <FlexColumn>
      <ButtonStyled id="login-container" ref={myRef}></ButtonStyled>
    </FlexColumn>
  );
}
