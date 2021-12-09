import React from "react";
import classNames from "classnames"; //utility to join classNames together
import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  //appends a class to the item if a prop's value is true, using classNames utility
  const interviewerClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": props.selected
    });

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img className="interviewers__item-image" src={props.avatar} alt={props.name}/>
      {props.selected && props.name}
    </li>
  );
}
 
export default InterviewerListItem;

