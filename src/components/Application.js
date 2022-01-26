import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  
  const setDay = day => setState({...state, day});
  
  const baseURL = "http://localhost:8001/api";
  
  const getDays = axios.get(`${baseURL}/days`);
  const getAppointments = axios.get(`${baseURL}/appointments`);
  const getInterviewers = axios.get(`${baseURL}/interviewers`);
  let appointments = [];

  useEffect(() => {
    Promise.all([getDays, getAppointments, getInterviewers])
      .then((response) => {
        setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
    },[])

  appointments = getAppointmentsForDay(state, state.day);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`${baseURL}/appointments/${id}`, appointment)
    .then(response => {
      setState({...state, appointments});
    })
    // .catch(err => {
    //   console.log('Error>> ', err);
    // })
  }

  function cancelInterview(id) {
   return axios.delete(`${baseURL}/appointments/${id}`)
   .then(response => {
    setState(...state);
   })
  //  .catch((err) => err)
  }


  const parsedAppointment = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewersForDay = getInterviewersForDay(state, state.day);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
       />
    );
  });

  

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {parsedAppointment}
      </section>
    </main>
  );
}
