import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Centre = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Spinner = styled(CircularProgress)`
margin: 0 auto;
  width: 100px;
`

export default function Loading(){
    return (
        <Centre>
            <Spinner size={150}/>
        </Centre>
    )
}