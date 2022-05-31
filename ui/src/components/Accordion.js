import React from 'react'
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ExpandLess} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

//ATTENTION WHEN I MAKE CHANGES HERE I HAVE TO REFRESH THE PAGE FOR SOME REASON BEFORE THEY TAKE EFFECT

const Drawer = styled.div`
  max-height: ${props=> props.open ? 0 : '100%'};
  transition: max-height 0.25ms cubic-bezier(0.5, 0, 0.1, 1);
  overflow: hidden;
`

const SummaryText = styled.div`

`

const Chevron = styled.div`

`

const Flex = styled.div`
display: flex;
  justify-content: space-between;
`

const Context = React.createContext({})

function Accordion({children}){
    const [open,setOpen] = React.useState(false)
    const value = React.useMemo(()=>({
        open,
        toggleOpen: ()=>{
            setOpen(val=>!val)
        }
    }),[open,setOpen])


    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

function Summary ({color,children}){
    return(
        <Context.Consumer>{
            ({open, toggleOpen}) => (
                <div onClick={()=>{
                    toggleOpen()
                }}>
                    <Flex>
                        <SummaryText>
                            {children}
                        </SummaryText>
                        <IconButton>
                            {open
                                ?
                                <ExpandMoreIcon style={{color: color}} />
                                :
                                <ExpandLess style={{color: color}}/>
                            }
                        </IconButton>
                    </Flex>
                </div>
            )}
        </Context.Consumer>
    )
}

function Description  ({children}){
    return (
        <Context.Consumer>{
            ({open}) => (
                <Drawer open={open} >
                    {children}
                </Drawer>
            )}
        </Context.Consumer>
    )
}

export default {
    Accordion,
    Description,
    Summary,
}