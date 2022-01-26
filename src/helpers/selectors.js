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

function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  for (let item of state.days) {
    if (item.name === day) {
      interviewersArray = [...item.interviewers];
    }
  }
  const interviewersForDay = interviewersArray.map((id) => state.interviewers[id]);
  return interviewersForDay;
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };