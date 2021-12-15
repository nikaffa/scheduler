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
    .then(res => {

      //updates the spots remaining when save the appointment
      setState(prev => {
        const days = prev.days.map(day => {
          if(day.name === prev.day) {
            day.spots -- ;
          }
          return day;
        });
        return { ...prev, appointments, days };
      });
      
    })
  };

 //makes a HTTP request to delete interview data from database and sets its state to null when delete an interview
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment };
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(res => {
      //before: setState(prev => ({ ...prev, appointments: {...prev.appointments, appointment} })))

      //updates the spots remaining when delete the appointment
      setState(prev => {
        const days = prev.days.map(day => {
          if(day.name === prev.day) {
            day.spots ++;
          }
          return day;
        });
        return { ...prev, appointments, days };
      });
    })
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


//updates the spots remaining
      // let newSpots = 0;
      // if(state.appointments[id].interview === null) {
      //   newSpots = state.days.spots + 1;
      // }else{
      //   newSpots = state.days.spots - 1;
      // }
      //setDay(prev => ({ ...prev, spots: newSpots}))