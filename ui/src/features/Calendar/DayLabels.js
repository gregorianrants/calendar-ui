import styled from "styled-components";
import du from "../../utilities/dateUtilities.js"




const DayLabelsStyled=styled.div`
/*height: 80px;*/
    text-align: center;
    display: flex;
    border-top: 1px solid lightgray;
    height: 100%;
    
    .day{
      flex: 1 0 100px;
      //TODO had a bit of problem here i getting borders line up
      //with those from day ithink its todo with the way flex distributes 
      //extra space need to look into math of grow and shrink
      border-left: 1px solid var(--border-color-light);
      align-items: stretch;

      &:last-child{
        border-right: 1px solid var(--border-color-light);
      }
      
      p {
        margin: 0.5em auto 0.5em;
      }
  }
`

export default function DayLabels({days}){
    return (
        <DayLabelsStyled>
                {days
                    .map((date,i)=>(
                        <div className='day' key={i}>
                            <p>{du.dayOfWeek(date)}</p>
                            <p>{date.getDate()}</p>
                        </div>
                    ))}
        </DayLabelsStyled>
    )
}