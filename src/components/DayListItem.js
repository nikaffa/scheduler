import React from "react";
import classNames from "classnames"; //utility to join classNames together
import "components/DayListItem.scss";

export default function DayListItem(props) {
  //appends a class to the item if a prop's value is true, using classNames utility
  const dayClass = classNames(
    'day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots===0)
    });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" onClick={props.setDay}>{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}