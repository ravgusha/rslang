/* eslint-disable import/no-cycle */
// import { checkBoxLsnrOff } from './chbxlsnr';
import { btnLsnr, sprintStat } from './sprint';
import resultRender from './sprint-res';

function endOfRound() {
  resultRender();
  showRoundScore();
  updateStat();
  // checkBoxLsnrOff();
  document.querySelector('#base-timer-path-remaining').classList.remove('red');
  document.querySelector('#base-timer-path-remaining').classList.add('green');
  document.querySelector('.sprint-button-wrapper').removeEventListener('click', btnLsnr);
}

export default endOfRound;

function updateStat() {
  sprintStat.rounds++;
  console.log(sprintStat);
}

function showRoundScore() {
  document.querySelector('.score-points').textContent = sprintStat.currentRoundScore;
}
