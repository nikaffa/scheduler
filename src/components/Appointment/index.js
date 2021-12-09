import React from "react";
import "./styles.scss";

const Appointment = (props) => {
  const showAppointment = () => {
    let text ="";
    if (props.time) {
      text = `Appointment at ${props.time}`;
    } else {
      text = "No appointments";
    }
    return text;
  }
  
  return (
    <article className="appointment">{showAppointment()}</article>
  );
}
 
export default Appointment;