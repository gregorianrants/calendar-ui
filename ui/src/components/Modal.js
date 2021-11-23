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