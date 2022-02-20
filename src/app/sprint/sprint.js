/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-cycle
import getUser from './get-user';
import requestUnreg from './sprint-request';
// eslint-disable-next-line import/no-cycle
import { startTimer } from './timer';
import checkBoxLsnrOn from './check-box-listener';
// eslint-disable-next-line import/no-mutable-exports
export let seriesCounter = 0;
let words = [];

let xNum = 0;
let yNum = 0;
// eslint-disable-next-line no-unused-vars
let user = {};

export const sprintStat = {
  rounds: 0,
  currentRoundScore: 0,
  maxScore: 0,
  maxSeries: 0,
  rightAnswers: [],
  wrongAnswers: [],
  learned: [],
};

export const rightAnswersArr = [];
export const wrongAnswersArr = [];

async function sprintRun() {
  words = await requestUnreg();
  user = await getUser();
  deletePreloader();

  loadSprintState();
  rightAnswersArr.splice(0, rightAnswersArr.length);
  wrongAnswersArr.splice(0, wrongAnswersArr.length);
  checkBoxLsnrOn();
  startTimer();
  removeSeries();
  xNum = rndNumberWord(words);
  yNum = wrongNum(xNum);
  sprintStat.currentRoundScore = 0;
  seriesCounter = 0;
  drawWords(xNum, yNum);
  document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
  document.querySelector('.sprint-button-wrapper').addEventListener('click', btnLsnr);
}

function drawWords(wordNum, transNum) {
  document.querySelector('.sprint-word').textContent = `${words[wordNum].word}`;
  document.querySelector('.sprint-translate').textContent = `${words[transNum].wordTranslate}`;
}

function rndNumberWord(arr) {
  const index = Math.round(Math.random() * (arr.length - 1));
  return index;
}
export default sprintRun;

function addSeries() {
  const crArr = document.querySelectorAll('.circle');
  if (seriesCounter < 4) {
    crArr[seriesCounter].classList.add(`cr${seriesCounter}`);
    seriesCounter++;
  }
  if (seriesCounter > 3) {
    seriesCounter++;
  }
}

function removeSeries() {
  const crArr = document.querySelectorAll('.circle');
  crArr.forEach((e, i) => {
    if (e.classList.contains(`cr${i}`)) {
      e.classList.remove(`cr${i}`);
    }
    sprintStat.maxSeries = Math.max(sprintStat.maxSeries, seriesCounter);
    seriesCounter = 0;
  });
}
export function btnLsnr(event) {
  if (event.target.classList.contains('spring-correct')) {
    if (xNum === yNum) {
      sprintStat.currentRoundScore += 10;
      document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
      addSeries();
      rightAnswHndl(xNum);
      playSound(0);
    } else {
      removeSeries();
      wrongAnswerHndl(xNum);
      playSound(1);
    }
  }
  if (event.target.classList.contains('spring-wrong')) {
    if (xNum !== yNum) {
      sprintStat.currentRoundScore += 10;
      document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
      addSeries();
      rightAnswHndl(xNum);
      playSound(0);
    } else {
      removeSeries();
      wrongAnswerHndl(xNum);
      playSound(1);
    }
  }
  xNum = rndNumberWord(words);
  yNum = wrongNum(xNum);
  drawWords(xNum, yNum);
}

function rightAnswHndl(num) {
  rightAnswersArr.push(words[num]);
  words.splice(num, 1);
}

function wrongAnswerHndl(num) {
  wrongAnswersArr.push(words[num]);
  words.splice(num, 1);
}

function wrongNum(num) {
  const index = Math.round(Math.random() * (words.length - 1));
  const rndY = Math.round(Math.random());
  const arr = [num, index];
  return arr[rndY];
}

function playSound(num) {
  let sound;
  if (num === 0) {
    sound = document.querySelector('.right-snd');
  } else {
    sound = document.querySelector('.wrong-snd');
  }
  if (document.querySelector('#sound-onOff').checked) sound.play();
}

function loadSprintState() {
  if (sprintStat.rounds === 0) {
    const loadedStat = JSON.parse(localStorage.getItem('sprintStat'));
    for (const key in loadedStat) {
      sprintStat[key] = loadedStat[key];
    }
    console.log('LOAD', loadedStat);
  }
}

function deletePreloader() {
  if (document.querySelector('.preloader')) {
    document.querySelector('.preloader').classList.add('loaded');
  }
}
