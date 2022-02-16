// eslint-disable-next-line import/no-cycle
import { startTimer } from './timer';

let seriesCounter = 0;
const words = ['alcohol', 'water', 'go', 'she', 'he'];
const translate = ['алкоголь', 'вода', 'идти', 'она', 'он'];
function sprintRun() {
  startTimer();
  let xNum = rndNumberWord(words);
  let yNum = rndNumberWord(words);
  let score = 0;

  drawWords(xNum, yNum);

  document.querySelector('.sprint-button-wrapper').addEventListener('click', (event) => {
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
  });
}

function drawWords(wordNum, transNum) {
  document.querySelector('.sprint-word').textContent = `${words[wordNum]}`;
  document.querySelector('.sprint-translate').textContent = `${translate[transNum]}`;
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
