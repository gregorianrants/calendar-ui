import React from "react";


/*
function reducer(state,action){
    if(action.type==='down'){
        return{
            ...state,
            down: true,
            listening: true
        }
    }
    else if(action.type==='mouseUp'){
        return{
            ...state,
            down: false
        }
    }
    else if(action.type==='stopListening'){
        return{
            ...state,
            listening: false
        }
    }
}


export default function useDrag(mouseMoveF,mouseUpF){
    const [mouse,dispatch]=React.useReducer(reducer,{
        down: false,
        listening: false,
        up: true,
    })

    const totalTranslationY = React.useRef(0)
    const initialTop = React.useRef(0)
    const height = React.useRef(0)

    const handleMouseMove = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        mouseMoveF(e.movementY,totalTranslationY.current,initialTop.current,height.current)
    },[mouseMoveF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    const handleMouseUp = React.useCallback((e)=>{
        console.log(document.elementFromPoint(e.clientX, e.clientY))
        dispatch({type: 'mouseUp'})
        mouseUpF(totalTranslationY.current)
    },[mouseUpF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    React.useEffect(()=>{
        if(mouse.down) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup',handleMouseUp)
        }
        if(!mouse.down & mouse.listening){
            window.removeEventListener('mousemove',handleMouseMove)
            window.removeEventListener('mouseup',handleMouseUp)
            dispatch({type: 'stopListening'})
        }

        return ()=>{
            if(mouse.listening){
                window.removeEventListener('mousemove',handleMouseMove)
                window.removeEventListener('mouseup',handleMouseUp)
            }
        }
    },[mouse,handleMouseMove,handleMouseUp])//added handleMOuseMove handleMouseUp dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    return (top,initialHeight)=>{
        dispatch({type: 'down'})
        totalTranslationY.current = 0
        initialTop.current = top
        height.current = initialHeight
        console.log('height' , height.current)
    }
}

*/


/*function reducer(state,action){
    if(action.type==='down'){
        return{
            ...state,
            down: true,
            listening: true
        }
    }
    else if(action.type==='mouseUp'){
        return{
            ...state,
            down: false
        }
    }
    else if(action.type==='stopListening'){
        return{
            ...state,
            listening: false
        }
    }
}*/


export default function useDrag(onDragStart,dragElementF,dragBottomEdgeF,mouseUpF,overEdge){
    const [drag,setDrag]=React.useState(false)
    const totalTranslationY = React.useRef(0)


    const handleDragElement = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        dragElementF(totalTranslationY.current,e.movementY)
    },[dragElementF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    const handleDragBottomEdge = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        dragBottomEdgeF(totalTranslationY.current,e.movementY)
    },[dragBottomEdgeF])

    const handleMouseUp = React.useCallback((e)=>{
       setDrag(false)
        mouseUpF(totalTranslationY.current)
    },[mouseUpF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    React.useEffect(()=>{
        if(drag==='body') {
            window.addEventListener('mousemove', handleDragElement)
            window.addEventListener('mouseup',handleMouseUp)
        }

        if(drag==='edge') {
            window.addEventListener('mousemove', handleDragBottomEdge)
            window.addEventListener('mouseup',handleMouseUp)
        }

        return ()=>{
                window.removeEventListener('mousemove',handleDragElement)
                window.removeEventListener('mousemove',handleDragBottomEdge)
                window.removeEventListener('mouseup',handleMouseUp)
        }
    },[drag,handleDragElement,handleDragBottomEdge,handleMouseUp])//added handleMOuseMove handleMouseUp dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    return (e)=>{
        e.preventDefault()
        setDrag(overEdge ? 'edge' : 'body')
        onDragStart()
        totalTranslationY.current = 0
    }
}


