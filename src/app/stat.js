function statDataWrite() {
  const sprintStat = JSON.parse(localStorage.getItem('sprintStat'));
  console.log(sprintStat);
  document.querySelector('.sprint-nrp').textContent = sprintStat.rounds;
  document.querySelector('.sprint-nca').textContent = sprintStat.rightAnswers.length;
  document.querySelector('.sprint-ncar').textContent = sprintStat.maxSeries;
  document.querySelector('.sprint-nwal').textContent = sprintStat.learned.length;
}
export default statDataWrite;
