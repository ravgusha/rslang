// eslint-disable-next-line import/no-cycle
import requestUnreg from './spr-request';
// eslint-disable-next-line import/no-cycle
import { startTimer } from './timer';

let seriesCounter = 0;
let words = ['alcohol', 'water', 'go', 'she', 'he'];

let score = 0;
let xNum = 0;
let yNum = 0;

async function sprintRun() {
  words = await requestUnreg();

  startTimer();
  removeSeries();
  xNum = rndNumberWord(words);
  yNum = rndNumberWord(words);
  score = 0;
  seriesCounter = 0;
  drawWords(xNum, yNum);
  document.querySelector('.sprint-score span').textContent = score;
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
}

function removeSeries() {
  const crArr = document.querySelectorAll('.circle');
  crArr.forEach((e, i) => {
    if (e.classList.contains(`cr${i}`)) {
      e.classList.remove(`cr${i}`);
    }
    seriesCounter = 0;
  });
}
export function btnLsnr(event) {
  if (event.target.classList.contains('spring-correct')) {
    if (xNum === yNum) {
      score += 10;
      document.querySelector('.sprint-score span').textContent = score;
      addSeries();
    } else {
      removeSeries();
    }
  }
  if (event.target.classList.contains('spring-wrong')) {
    if (xNum !== yNum) {
      score += 10;
      document.querySelector('.sprint-score span').textContent = score;
      addSeries();
    } else {
      removeSeries();
    }
  }
  xNum = rndNumberWord(words);
  yNum = rndNumberWord(words);
  drawWords(xNum, yNum);
}
