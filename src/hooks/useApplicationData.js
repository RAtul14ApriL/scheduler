import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const getDays = axios.get(`/api/days`);
  const getAppointments = axios.get(`/api/appointments`);
  const getInterviewers = axios.get(`/api/interviewers`);

  useEffect(() => {
    Promise.all([getDays, getAppointments, getInterviewers])
      .then((response) => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const getDay = state.days.find(day => day.appointments.includes(id));
    const days = state.days.map(day => {
      if (day.name === getDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      })
      .catch(err => err);
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const getDay = state.days.find(day => day.appointments.includes(id));
    const days = state.days.map(day => {
      if (day.name === getDay.name) {
        return { ...day, spots: day.spots + 1 };
      }
      else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({ ...state, appointments, days });
      })
  }

  return { cancelInterview, bookInterview, setDay, state }
} 