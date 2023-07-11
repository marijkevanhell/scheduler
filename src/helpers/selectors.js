function getAppointmentsForDay(state, day) {
  let results = [];

  const filteredDays = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (!filteredDays[0]) return results;

  for (const appointment of filteredDays[0].appointments) {
    results.push(state.appointments[appointment]);
  }
  return results;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

function getInterviewersForDay(state, day) {
  let results = [];

  const filteredDays = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (!filteredDays[0]) return results;

  for (const interviewers of filteredDays[0].interviewers) {
    results.push(state.interviewers[interviewers]);
  }
  return results;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
