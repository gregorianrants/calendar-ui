import styled from "styled-components";
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const container = styled.div`
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  position: absolute;
`


export function GcalDetails(){
    return (
        <Card>
            <CardContent>
                <Typography>
                    This is a card
                </Typography>
            </CardContent>
        </Card>
    )
}