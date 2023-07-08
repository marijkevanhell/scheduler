import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday", 
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });

const updateSpots = function(appointments) {
  const updatedDays = state.days.map((day) => {
  const emptySpots = day.appointments.filter((appointment) => {
    return !appointments[appointment].interview
  });  
  const spots = emptySpots.length
  return {...day, spots}
})
  setState(prev => ({...prev, days: updatedDays}));
};

const bookInterview = function(id, interview) {
return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    
    updateSpots(appointments);
  })
}

useEffect(() => {
  const dayURL = "/api/days";
  const appointmentURL="/api/appointments";
  const interviewersURL = "/api/interviewers";
 
  Promise.all([
    axios.get(dayURL),
    axios.get(appointmentURL),
    axios.get(interviewersURL)
  ]).then((all) => {
    setState(prev => ({
      ...prev, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
    }));
  }).catch(error => {});
}, [setState]);

const cancelInterview = function(id) {
  return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments, 
        [id]: appointment
      };
      setState({
        ...state, 
        appointments
      })
      updateSpots(appointments);
    })
  }

  return {bookInterview, cancelInterview, setDay, state}
}












