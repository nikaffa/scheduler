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

  //updates the spots remaining when book/edit/cancel appointment
  const updateSpots = (requestType) => {
    const days = state.days.map(day => {
      if(day.name === state.day) {
        if (requestType === 'bookInterview') {
          return { ...day, spots: day.spots - 1 }
        }else {
          return { ...day, spots: day.spots + 1 }
        }
      }
      return { ...day };
    });
    return days;
  }

  //updates the dayList
  const setDay = day => setState(prev => ({ ...prev, day }));

  //makes an HTTP request and updates the local state when new interview booked
  const bookInterview = (id, interview) => {
  
    const appointment = { ...state.appointments[id] };
    //helper to define the request type
    const bookOrEdit = appointment.interview ? 'edit' : 'book';
    appointment.interview = { ...interview };
    const appointments = { ...state.appointments, [id]: appointment };
    
    let days = state.days;
    if (bookOrEdit === 'book') {
      days = updateSpots('bookInterview');
    } 

    //makes a PUT request to update the database with the interview data
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {
      
      setState({ ...state, appointments, days });
      // setState(prev => {
      //   const days = prev.days.map(day => {
      //     if(day.name === prev.day) {
      //       day.spots -- ;
      //     }
      //     return day;
      //   });
      //   return { ...prev, appointments, days };
      // });
      
    })
  };

 //makes a HTTP request to delete interview data from database and sets its state to null when delete an interview
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment };
    const days = updateSpots();
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(res => {
      setState({ ...state, appointments, days });
      //before: setState(prev => ({ ...prev, appointments: {...prev.appointments, appointment} })))

      //updates the spots remaining when delete the appointment
      // setState(prev => {
      //   const days = prev.days.map(day => {
      //     if(day.name === prev.day) {
      //       day.spots ++;
      //     }
      //     return day;
      //   });
      //   return { ...prev, appointments, days };
      // });
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
