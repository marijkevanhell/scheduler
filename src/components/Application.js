import React from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import { useState, useEffect } from "react";

import Appointment from "components/Appointment";

import {getAppointmentsForDay, getInterview} from "../helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  

  useEffect(()=>{
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL="http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
   
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) =>{
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav><DayList days={state.days} day={state.day} setDay={setDay}/></nav>
        <nav className="sidebar__menu"></nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
      {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


