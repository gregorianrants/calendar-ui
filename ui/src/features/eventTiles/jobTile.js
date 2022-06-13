import React from "react";

import useDrag from "./useDrag";
import styled from "styled-components";

import {fromTop, fromBottom, roundToNearest} from "../../utilities/utilities";
import settingsContext from "../Calendar/Contexts";

import {getTimeFromPosition} from "../../utilities/timeConversions.js";
import {mergeDateAndTime} from "../../utilities/dateUtilities";
import useDetectBottomEdge from "./useDetectBottomEdge";
import {StyledEvent} from "./styles";


import {useHistory} from "react-router";
import {useEditJobMutation} from "../api/apiSlice";
import {TimeText,StyledSummaryText} from "./styles";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";

function EventHeading({start, end, summary}) {


    return (
        <>
            <TimeText>{format(start, 'p') + ' - ' + format(end, 'p')}</TimeText>
            <StyledSummaryText variant="subtitle2"><span>{summary}</span></StyledSummaryText>
        </>
    )

}



export default function JobTile({
                                  top: topProp,
                                  bottom: bottomProp,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  customer,
                                  backgroundColor = "red",
                              }) {
    const [top, setTop] = React.useState(topProp);
    const [bottom, setBottom] = React.useState(bottomProp);
    const {hourHeight} = React.useContext(settingsContext);

    const history = useHistory();

    const parentElement = React.useRef(null)


    const [editJob] = useEditJobMutation()

    React.useEffect(() => {
        setTop(topProp);
        setBottom(bottomProp);
    }, [topProp, bottomProp]);

    const updateDisplayEvent = () => {
        history.push(`calendar/job-details/${_id}`);
    };

    /*
      TODO: write code that doesnt need this comment to make sense, once you can figure out how to.
      this is used to detect whehter mouse cursor is over bottom edge and its value is then used to set
      correct cursor in css
      it is also used as last arg to useDrag and is checked when the drag is started to see what
      drag behaviour is used*/
    const {isCursorOverEdgeState, handleMouseMove, handleMouseLeave} =
        useDetectBottomEdge(parentElement.current);

    function startTime(top) {
        return getTimeFromPosition(top, hourHeight * 24);
    }

    function endTime(bottom) {
        return getTimeFromPosition(hourHeight * 24 - bottom, hourHeight * 24);
    }

    const eventHeight = React.useRef(0);
    const initialTop = React.useRef(0);
    const initialBottom = React.useRef(0);

    const onDragStart = React.useCallback(() => {
        initialTop.current = top;
        initialBottom.current = bottom;
        eventHeight.current = fromTop(bottom, 24 * hourHeight) - top;
    }, [top, bottom, hourHeight]);

    const onDragBottomEdge = (translationY, movementY) => {
        const trackedBottom = initialBottom.current - translationY;
        const snappedBottom = roundToNearest(trackedBottom, hourHeight);
        if (fromTop(snappedBottom, hourHeight * 24) > top) setBottom(snappedBottom);
    };

    const onDragElement = (translationY) => {
        const tracked = initialTop.current + translationY;
        const snappedTop = roundToNearest(tracked, hourHeight);
        setTop(snappedTop);
        const bottom = fromBottom(
            snappedTop + eventHeight.current,
            hourHeight * 24
        );
        setBottom(bottom);
    };

    const onDragEnd = (totalTranslationY) => {
        if (totalTranslationY !== 0) {

            editJob({
                _id,
                start: mergeDateAndTime(start, startTime(top)),
                end: mergeDateAndTime(end, endTime(bottom)),
            })

        } else {
            updateDisplayEvent(_id);
        }
    };

    const drag = useDrag(
        onDragStart,
        onDragElement,
        onDragBottomEdge,
        onDragEnd,
        isCursorOverEdgeState
    );

    return (
        <StyledEvent
            ref={parentElement}
            data-component={"event"}
            data-id={_id}
            className="event"
            onMouseDown={(e) => {
                drag(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            overEdge={isCursorOverEdgeState}
            draggable="false"
            backgroundColor={backgroundColor}
            style={{
                backgroundColor: backgroundColor,
                top: top + "px",
                bottom: bottom + "px",
                left,
                right,
            }}
        >
            <EventHeading start={start} end={end} summary={customer.name}/>
        </StyledEvent>
    );
}
