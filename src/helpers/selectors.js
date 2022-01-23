function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  for (let key of state.days) {
    if (key.name === day) {
      appointmentsArray = [...key.appointments];
    }
  }
  const appointmentsOfDay = appointmentsArray.map((id) => state.appointments[id]);
  return appointmentsOfDay;
};

function getInterview(state, interview) {

  if (interview === null) {
    return null
  }
  let interviewInfo = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviewInfo;
};


module.exports = {getAppointmentsForDay, getInterview};