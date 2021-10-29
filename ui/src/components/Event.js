import React from "react";

import useDrag from "./useDrag";
import styled from "styled-components";
import { editJob } from "../Model/Jobs";

import { fromTop, fromBottom, roundToNearest } from "../utilities/utilities";
import settingsContext from "./Contexts";

import { getTimeFromPosition } from "../utilities/timeConversions.js";
import { mergeDateAndTime } from "../utilities/dateUtilities";
import useDetectBottomEdge from "./useDetectBottomEdge";

const StyledEvent = styled.div`
  position: absolute;
  background-color: ${(props) => props.backgroundColor};
  border: 0.5px solid white;
  cursor: ${(props) => (props.overEdge ? "row-resize" : "default")};
`;

export default function Event({
  top: topProp,
  bottom: bottomProp,
  left,
  right,
  _id,
  start,
  end,
  backgroundColor = "red",
  updateEvent,
  updateDisplayEvent,
}) {
  const [top, setTop] = React.useState(topProp);
  const [bottom, setBottom] = React.useState(bottomProp);
  const { hourHeight } = React.useContext(settingsContext);

  React.useEffect(() => {
    setTop(topProp);
    setBottom(bottomProp);
  }, [topProp, bottomProp]);

  /*
    TODO: write code that doesnt need this comment to make sense, once you can figure out how to.
    this is used to detect whehter mouse cursor is over bottom edge and its value is then used to set
    correct cursor in css
    it is also used as last arg to useDrag and is checked when the drag is started to see what
    drag behaviour is used*/
  const { isCursorOverEdgeState, handleMouseMove, handleMouseLeave } =
    useDetectBottomEdge();

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
    console.log(totalTranslationY);
    if (totalTranslationY !== 0) {
      //TODO do i want to allow a little bit of movement then set back to original value if movement is small
      editJob({
        _id,
        data: {
          start: mergeDateAndTime(start, startTime(top)),
          end: mergeDateAndTime(end, endTime(bottom)),
        },
      })
        .then((data) => {
          console.log(data);
          updateEvent(data.data._id, data.data); //TODO sort out this double use of data looks silly
        })
        .catch(console.error);
    } else {
      console.log("heloooooo");
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
    ></StyledEvent>
  );
}