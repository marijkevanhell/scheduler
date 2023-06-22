function getAppointmentsForDay(state, day) {

  let results = [];

  const filteredDays = state.days.filter(currentDay => currentDay.name === day);

  if (!filteredDays[0]) return results;

  for (const appointment of filteredDays[0].appointments) {
    results.push(state.appointments[appointment]);

}
return results;

};


function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

export { getAppointmentsForDay, getInterview };