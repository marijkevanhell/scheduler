import React from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import { useState, useEffect } from "react";

import Appointment from "components/Appointment";

import getAppointmentsForDay from "../helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  

  useEffect(()=>{
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL="http://localhost:8001/api/appointments";
   
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL)
    ]).then((all) =>{
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data}));
    })
  },[]);

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
        {dailyAppointments.map(appointment => (<Appointment key={appointment.id} {...appointment} />))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


