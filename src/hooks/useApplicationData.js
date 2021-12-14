//Custom hook responsible for loading the initial data from the API
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //updates the dayList
  const setDay = day => setState(prev => ({ ...prev, day }));

  //makes an HTTP request and updates the local state when new interview is booked
  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment };

    //makes a PUT request to update the database with the interview data
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => setState({ ...state, appointments }))
  };

 //makes a HTTP request to delete interview data from database and sets its state to null when delete an interview
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(res => setState(prev => ({ ...prev, appointments: {...prev.appointments, appointment} })))
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
};