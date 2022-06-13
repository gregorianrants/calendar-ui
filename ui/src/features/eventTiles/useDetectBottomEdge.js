import React from 'react'

export default function useDetectBottomEdge(target){
    const [overEdge,setOverEdge]=React.useState(false)

    const handleMouseMove = (e)=> {
        const bottomOfEl = e.currentTarget.getBoundingClientRect().bottom
        const pointerY = e.clientY
        const upper = bottomOfEl - 10

        if (pointerY < bottomOfEl && pointerY > upper) {
            setOverEdge(true)
        } else {
            setOverEdge(false)
        }
    }

    const handleMouseLeave=(e)=>{
        setOverEdge(false)
    }

    return {isCursorOverEdgeState: overEdge,handleMouseMove,handleMouseLeave}
}