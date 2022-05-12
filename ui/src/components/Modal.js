import styled from "styled-components";
import React from "react";


const BackGround = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  & {
    margin-top: 64px;//this is to push modal content down to accomadate top bar and centre content within the main view
  }//TODO i dont like this what if i change the height of the top bar maybe create a constant for the topbar height
  
`

/*
const ModalStyled = styled.div`
  background-color: white;
  padding: 1.5em;
`
*/

export default function Modal({children}){
    return (
        <BackGround>
                    {children}
        </BackGround>
    )
}