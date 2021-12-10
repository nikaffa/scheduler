import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";


const Appointment = (props) => {
  // const showAppointment = () => {
  //   let text ="";
  //   if (props.time) {
  //     text = `Appointment at ${props.time}`;
  //   } else {
  //     text = "No appointments";
  //   }
  //   return text;
  // }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
      
    </article>
  
  );
}
 
export default Appointment;