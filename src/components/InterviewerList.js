import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  //renders multiple components using map 
  const newList = props.interviewers.map(interviewer => 
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar = {interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}
    /> 
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{newList}</ul>
    </section>  
  );
}
 
export default InterviewerList;

