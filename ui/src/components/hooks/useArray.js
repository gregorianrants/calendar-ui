import React from 'react'
import cuid from 'cuid'

export function useArray(initialValues=[]){
    const [state,setState] = React.useState(
        init(initialValues)
    )

    function init(initialValues){
        return initialValues.map(el=>wrapInObject(el))
    }

    function wrapInObject(el){
        return {
            value: el,
            id: cuid()
        }
    }

    const addElement =(el)=>{
        setState(prevState=>(
            [...prevState,wrapInObject(el)]
        ))
    }

    function filterOut(arr,id){
        return arr.filter(el=>el.id !== id)
    }

    const removeElement=(id)=>{
        setState(prevState => (
            filterOut(prevState,id)
        ))
    }

    return {
        value: state,
        addElement,
        removeElement
    }
}