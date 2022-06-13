import {Card, CardContent, IconButton, ListItemText} from "@material-ui/core";
import Modal from  '../../components/Modal'
import {useParams} from "react-router-dom";
import {useGetGcalQuery} from "../api/apiSlice";
import {useMemo} from "react";
import { createSelector } from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {ListItem,ListItemIcon} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import {makeStyles} from "@material-ui/core/styles";
import {Toolbar} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import {format} from "date-fns";
import {isSameDay} from "date-fns";
import {useHistory} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";



const useStyles = makeStyles((theme)=>({
    header:{
        paddingBottom: 0
    },
    content: {
        paddingTop: 0,
        overflowY: 'auto',
        maxHeight: '85vh'
    },
    description: {
        whiteSpace: "pre-wrap"
    },
    modal: {
        width: 448,

    },
    toolbar: {
        justifyContent: "flex-end",
        minHeight: 0,
        paddingTop: theme.spacing(2)
    },
    list: {
        paddingTop: 0,
    },
    firstItem: {
        paddingTop: 0
    },
    nestedList: {
        paddingTop: 0,
        marginTop: 0
    }
}))

const NestedList = styled(List)`
  margin-top: 0;
  padding-top: 0;
  
`



export function GcalDetails(){
    const {id}=useParams()
    const history = useHistory()

    console.log(id)

    const classes = useStyles()


    const selectGcalEvent = useMemo(()=>{
        return createSelector(
            res => {
                console.log(res.data)
                return res.data || []
            },
            (res,id) => id,
            (data,id) => {
                console.log(data)
                console.log(id)
                const result =  data?.find(gcalEvent => gcalEvent.id === id) ?? {}
                console.log(result)
                return result
            }
        )

    },[])

    const firstDay = useSelector(state=>state.calendar.firstDay)
    const lastDay = useSelector(state=>state.calendar.lastDay)

    const {gcalEvent} = useGetGcalQuery({from: firstDay, to: lastDay},{
        selectFromResult: (result)=>({
            gcalEvent: selectGcalEvent(result,id)  //name of this field must be the same as name of prop we destructure
        })
    })

    console.log(gcalEvent)



    const start = new Date(gcalEvent?.start)
    const end = new Date(gcalEvent?.end)

    console.log(start)

    function formatDateString(start,end){
        if(isSameDay(start,end)){
            return format(start,"EEEE do MMM H':'mm") + ' - ' + format(end,"H':'mm")
        }
        return format(start,"EEEE do MMM H':'mm") + ' - ' + format(start,"EEEE do MMM H':'mm")
    }

    function htmlBlobToString(htmlBlob){
        if(!htmlBlob) return ''
        return htmlBlob.replace('<html-blob>','')
            .replaceAll('<br><br>','\n')
            .replaceAll('<br>','')
            .replaceAll(/<[^<>]+>/gi, "")
    }

    function handleClose(){
        history.push('/calendar')
    }

    return (
        <Modal >
            <Card className={classes.modal}  >
                <Toolbar className={classes.toolbar}>
                    <IconButton>
                        <CloseIcon onClick={handleClose}/>
                    </IconButton>
                </Toolbar>
                <CardContent className={classes.content}>
                    <List className={classes.list}>
                        <ListItem className={classes.firstItem}>
                            <ListItemIcon><EventIcon/></ListItemIcon>
                            <ListItemText
                                primary={gcalEvent.summary}
                                secondary={formatDateString(start,end)}
                                primaryTypographyProps={{variant: 'h5'}}
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemIcon><SubjectIcon/></ListItemIcon>
                            <ListItemText primary={htmlBlobToString(gcalEvent?.description)} className={classes.description} primaryTypographyProps={{variant: 'body2'}}/>
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemIcon><PeopleIcon/></ListItemIcon>

                                <List className={classes.nestedList}>
                                    {gcalEvent.attendees.map(attendee=>{
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
                                </List>

                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Modal>
    )
}