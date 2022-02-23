/* eslint-disable import/no-cycle */
// import { checkBoxLsnrOff } from './chbxlsnr';

import axios from 'axios';
import { token } from '../../auth/authorization';
import BASE_URL from '../../constants';
import {
  btnLsnr, rightAnswersArr, seriesCounter, sprintKeyLsnr, sprintStat, wrongAnswersArr,
} from './sprint';
import resultRender from './sprint-res';

async function endOfRound() {
  resultRender();
  showRoundScore();
  updateStat();
  saveState();
  await saveSprintStatToServer();
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

export function saveState() {
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

export async function saveSprintStatToServer() {
  const userID = localStorage.getItem('userId');

  if (userID) {
    await axios.put(
      `${BASE_URL}/users/${userID}/statistics`,
      {
        learnedWords: sprintStat.learned.length,
        optional: {
          sprinStat: sprintStat,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
