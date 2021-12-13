import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import "./styles.scss";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //conditinally renders a mode within calling useVisualMode:
  //if props.interview contains a value, pass useVisualMode the SHOW mode, otherwise, pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back(EMPTY)}/>}
    </article>
  
  );
}
 
export default Appointment;