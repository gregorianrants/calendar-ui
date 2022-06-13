import List from "@material-ui/core/List";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import styled from "styled-components";


const ListStyled = styled(List)`
    padding-top: 0;

  & > li {
    padding-left: 0;
    padding-right: 0;
  }

  & > li:first-child {
    padding-top: 4px;
  }
`


export default function AttendeesList({attendees}){
    return (
        <ListStyled>
            {attendees.map(attendee=>{
                let icon = '!'

                if (attendee.responseStatus === 'accepted') {
                    icon =  <FontAwesomeIcon icon={faCheck}/>
                }
                if (attendee.responseStatus === 'needsAction') {
                    icon =  <FontAwesomeIcon icon={faEnvelope}/>
                }
                if (attendee.responseStatus === 'declined') {
                    icon =  <FontAwesomeIcon icon={faXmark}/>
                }



                return (
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={attendee.email}/>
                    </ListItem>
                )
            })}
        </ListStyled>
    )
}