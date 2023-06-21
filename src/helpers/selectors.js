export default function getAppointmentsForDay(state, day) {

  let results = [];

  const filteredDays = state.days.filter(currentDay => currentDay.name === day);

  if (!filteredDays[0]) return results;

  for (const appointment of filteredDays[0].appointments) {
    results.push(state.appointments[appointment]);

}
console.log(results)
return results;

};

