import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // updates the dayList
  const setDay = day => setState(prev => ({ ...prev, day }));

  // creates an array of appointments for the given day
  const appointments = getAppointmentsForDay(state, state.day);
  // creates interviewers for the given day
  const interviewers = getInterviewersForDay(state, state.day);

  //makes an HTTP request and updates the local state when new interview is booked
  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment };

    //makes a PUT request to update the database with the interview data
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => setState({ ...state, appointments }))
    //.catch((err) => console.log(err.response.data)); 
  };

 //makes a HTTP request to delete interview data from database and sets its state to null when delete an interview
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(res => setState(prev => ({ ...prev, appointments: {...prev.appointments, appointment} })))
    //.catch((err) => console.log(err.response.data)); 
  }

  const schedule = appointments.map(app => {
    //getInterview returns an object that contains the interview data if it is passed an object that contains an interviewer
    const interview = getInterview(state, app.interview);
    //console.log('interview', interview)
    
    return (
      <Appointment
      key={app.id}
      id={app.id}
      time={app.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      
      />
    )    
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      //console.log(all[2].data);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList 
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       {schedule}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
