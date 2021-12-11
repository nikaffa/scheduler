//Selector accepts state as an argument and returns data that is derived from that state
export function getAppointmentsForDay(state, day) {
  let newAppointments = [];

  state.days.forEach(aday => {
    if (aday.name === day) {
      //console.log('aday.appointments', aday.appointments);
      aday.appointments.forEach(appointment => {
        //console.log('appointment', appointment)
        for (let app in state.appointments) {
          //console.log("app", app)
          if (app == appointment) {
            newAppointments.push(state.appointments[app])
            //console.log('state.appointments[app]', state.appointments[app]);
            //console.log('newAppointments', newAppointments)
          }
        }
      })
    }
  })
  //console.log('newAppointments', newAppointments);
  return newAppointments; //returns an array of appointments for that day
}