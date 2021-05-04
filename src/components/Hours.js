import React from "react";
import styled from "styled-components";


const HourStyled = styled.div` 
    height:  ${props=> `${props.height}px`};
    width: 150px;
    &:first-child{
     border-top: ${props=>`${props.border}px solid var(--border-color-light)`};
    }
    border-bottom: ${props=>`${props.border}px solid var(--border-color-light)`}
    
`

/*border-top: ${props=>props.key===0 ? `${props.border}px solid grey` : 0};
    border-bottom: ${props=>`${props.border}px solid grey`};*/

export default function Hours({height, border}) {
    return (
        <div>
            {[...Array(24).keys()]
                .map((index) =>
                        <HourStyled
                            key={index}
                            data-hour={String(index)}
                            height={height}
                            border={border}
                        />


                    /* <div className='hour'
                            key={index}
                            data-hour={String(index)}
                            style={{
                                height: `${height}px`,
                                borderTop: index === 0 ? `${border}px solid grey` : `0`,
                                borderBottom: `${border}px solid grey`,
                            }}
                />
                    */
                )}
        </div>

    )
}