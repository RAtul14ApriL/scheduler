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
  for (let key of state.days) {
    if (key.name === day) {
      interviewersArray = [...key.interviewers];
    }
  }
  const interviewersForDay = interviewersArray.map((id) => state.interviewers[id]);
  return interviewersForDay;
};

// const getInterviewersForDay = (state, day) => {
//   const interviewerIdForDay = [];
//   const interviewerForDay = [];
//   state.days.map(oneDay => {
//     if (oneDay.name === day) {
//       if (oneDay.interview === null) {
//         return interviewerIdForDay;
//       }
//       interviewerIdForDay.push(...oneDay.interviewers);
//     }
//   });
//   interviewerIdForDay.map(interviewer => {
//     interviewerForDay.push(state.interviewers[interviewer]);
//   });
//   return interviewerForDay;
// }

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };