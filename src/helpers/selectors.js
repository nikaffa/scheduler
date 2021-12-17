//Selectors as helpers accept state as an argument and return data that is derived from that state

//returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let newAppointments = [];

  state.days.forEach(aday => {
    if (aday.name === day) {
      aday.appointments.forEach(appointment => {
        for (let app in state.appointments) {
          if (app == appointment) {
            newAppointments.push(state.appointments[app])
          }
        }
      })
    }
  })
  return newAppointments;
};

//returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  let newInterviewers = [];

  state.days.forEach(aday => {
    if (aday.name === day) {
      aday.interviewers.forEach(interviewer => {
        for (let int in state.interviewers) {
          if (int == interviewer) {
            newInterviewers.push(state.interviewers[int])
          }
        }
      })
    }
  })
  return newInterviewers;
}

//returns an object with interview data when there is an interviewer in state object; otherwise, returns null
export function getInterview(state, interview) {
  let newInterview = {};
  
  if (interview === null) {
    return null;
  } else {
    newInterview.student = interview.student;

    let interviewerId = interview.interviewer;

    for (let interviewer in state.interviewers) {
      if (interviewer == interviewerId) {
        newInterview.interviewer = state.interviewers[interviewer];
      }  
    }
  }
  return newInterview;
}