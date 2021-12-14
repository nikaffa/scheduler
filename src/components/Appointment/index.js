import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import "./styles.scss";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  //conditinally renders a mode within calling useVisualMode:
  //if props.interview contains a value, pass useVisualMode the SHOW mode, otherwise, pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Updates mode to save the created interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)//returnes promise
    .then(() => transition(SHOW))
    .catch((err) => console.log(err)); 
    
  };
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status message="Saving..."/>}
    </article>
  
  );
}
 
export default Appointment;