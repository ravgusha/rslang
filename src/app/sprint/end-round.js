/* eslint-disable import/no-cycle */
// import { checkBoxLsnrOff } from './chbxlsnr';

import {
  btnLsnr, rightAnswersArr, seriesCounter, sprintKeyLsnr, sprintStat, wrongAnswersArr,
} from './sprint';
import resultRender from './sprint-res';

function endOfRound() {
  resultRender();
  showRoundScore();
  updateStat();
  saveState();
  // checkBoxLsnrOff();
  document.querySelector('#base-timer-path-remaining').classList.remove('red');
  document.querySelector('#base-timer-path-remaining').classList.add('green');
  document.querySelector('.sprint-button-wrapper').removeEventListener('click', btnLsnr);
  document.removeEventListener('keydown', sprintKeyLsnr);
}

export default endOfRound;

function updateStat() {
  sprintStat.rounds++;
  sprintStat.maxScore = Math.max(sprintStat.maxScore, sprintStat.currentRoundScore);
  answerHndl(rightAnswersArr);
  answerHndl(wrongAnswersArr);
  checkLearnedWords();
  // sprintStat.wrongAnswers.push(wrongAnswersArr);
  sprintStat.maxSeries = Math.max(sprintStat.maxSeries, seriesCounter);
}

function showRoundScore() {
  document.querySelector('.score-points').textContent = sprintStat.currentRoundScore;
}

function saveState() {
  localStorage.setItem('sprintStat', JSON.stringify(sprintStat));
}
function answerHndl(arr) {
  if (arr === wrongAnswersArr) {
    wrongAnswersArr.forEach((e) => {
      sprintStat.wrongAnswers.push(e.id);
    });
  }
  if (arr === rightAnswersArr) {
    rightAnswersArr.forEach((e) => {
      sprintStat.rightAnswers.push(e.id);
    });
  }
}

function checkLearnedWords() {
  sprintStat.rightAnswers.forEach((e) => {
    let counter = 0;
    sprintStat.rightAnswers.forEach((el) => {
      if (e === el) {
        counter++;
      }

      if (counter > 2) {
        sprintStat.learned.push(el);
        deleteLearnedFromRightAnws(el);
      }
    });
  });
}

function deleteLearnedFromRightAnws(id) {
  sprintStat.rightAnswers = sprintStat.rightAnswers.filter((e) => e !== id);
}
