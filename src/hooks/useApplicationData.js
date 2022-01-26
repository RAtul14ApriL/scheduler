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

  const updateSpots = () => {
    return axios.get(`/api/days`)
    .then((response) => {
      setState(prev => ({...prev, days: response.data }));
      })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        updateSpots();
        setState(prev => ({ ...prev, appointments }));
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({...state, days: state.days});
        updateSpots();
      })
  }

  return { cancelInterview, bookInterview, setDay, state }
} 