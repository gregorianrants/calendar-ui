import styled from "styled-components";
import {Card, CardContent, CardHeader, IconButton, ListItemText} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
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

const useStyles = makeStyles((theme)=>({
    header:{
        paddingBottom: 0
    },
    content: {
        paddingTop: 0
    },
    description: {
        whiteSpace: "pre-wrap"
    },
    modal: {
        width: 448
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
    }
}))


const container = styled.div`
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  position: absolute;
`


export function GcalDetails(){
    const {id}=useParams()

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

    const {summary} = gcalEvent

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

    return (
        <Modal >
            <Card className={classes.modal} >
                <Toolbar className={classes.toolbar}>
                    <CloseIcon />
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
                    </List>
                </CardContent>
            </Card>
        </Modal>
    )
}