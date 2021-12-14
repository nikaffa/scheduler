import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "./styles.scss";

const Appointment = (props) => {
  //different modes of Appointment component
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  //conditinally renders a mode within calling useVisualMode:
  //if props.interview contains a value, pass useVisualMode the SHOW mode, otherwise, pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //updates mode to save the created interview
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

 //updates mode when deleting appointment
  const deleting = () => {
    transition(DELETING)

    props.cancelInterview(props.id)//returnes promise
    .then(() => transition(EMPTY))
    .catch((err) => console.log(err)); 
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM, true)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onConfirm={deleting} message="Are you sure you want to delete?"/>}
    </article>
  
  );
}
 
export default Appointment;