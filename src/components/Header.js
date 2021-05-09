import dateUtilities from "dateUtilities";
import styled from "styled-components";

const HeaderStyled = styled.div`
display: flex


`

export default function Header({firstDayOfWeek,
                                   incrementWeek,
                               decrementWeek}){
    return (
        <HeaderStyled>
            <button
                onClick={decrementWeek}

            >-</button>
            <p>{dateUtilities.monthAndYear(firstDayOfWeek)}</p>

            <button
            onClick={incrementWeek}

            >+</button>
        </HeaderStyled>
    )
};