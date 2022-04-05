
import settingsContext from './Contexts'
import React from "react";
import styled from "styled-components";


const HourTicksStyled = styled.div`
  display: flex;
  flex: 0 0 60px;
`

const TickValuesStyled = styled.div`
  flex: 0 0 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  div{
    flex: 1 0 0;
  }
  p {
    color: grey;
    margin: 0;
    padding: 0;
    font-size: 12px;
    transform: translateY(-7px);//TODO this is just a value i tried that seems to work NOW need to look a the math though so it works for all settings
  }
`;


/*height:  ${props=> `${props.height}px`};*/
const TickLinesStyled = styled.div`
  flex: 1 0 30px;
  
  display: flex;
  flex-direction: column;
  & .tick-line{
    flex: 1 0 0;
    width: 100%;
    border-top: 1px solid lightgray;

    &:last-child{
      border-bottom: 1px solid var(--border-color-light);
    }
  }
`


function TickValues(){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return(
        <TickValuesStyled
            hourHeight={hourHeight}
            borderWidth={borderWidth}

        >
            {[...Array(24).keys()]//TODO something weird happens when i set this to 25?
                .map((index) =>
                    <div className='tick-value'
                        key={index}

                    ><p>{index}</p></div>
                )}
        </TickValuesStyled>
    )

}


function TickLines(){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)
    return (<TickLinesStyled
        hourHeight={hourHeight}
        borderWidth={borderWidth}
    >
        {[...Array(24).keys()]//TODO something weird happens when i set this to 25?
            .map((index) =>
                <div className='tick-line'
                    key={index}
                    height={hourHeight}
                    border={borderWidth}
                />
            )}
    </TickLinesStyled>)
}

export default function HourTicks({headerHeight}){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return (
        <HourTicksStyled headerHeight={headerHeight}>
            <TickValues/>
            <TickLines height={hourHeight} border={borderWidth}/>
        </HourTicksStyled>
    )
}

