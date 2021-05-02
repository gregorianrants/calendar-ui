import React from "react";


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

    const handleMouseMove = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        mouseMoveF(e.movementY)
    },[])

    const handleMouseUp = React.useCallback((e)=>{
        dispatch({type: 'mouseUp'})
        mouseUpF(totalTranslationY.current)
    },[])

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
                console.log('cleaning up')
            }
        }

    },[mouse])

    return ()=>{dispatch({type: 'down'})}
}