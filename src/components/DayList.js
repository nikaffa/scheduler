import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  //renders multiple components using map 
  const newDays = props.days.map(day => 
    <DayListItem 
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay} 
    /> 
  );

  return (
    <ul>
      {newDays}
    </ul>
  );
}
 
export default DayList;