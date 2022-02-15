import { startTimer } from './timer';

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
        console.log(xNum, yNum);
      }
    }
    if (event.target.classList.contains('spring-wrong')) {
      if (xNum !== yNum) {
        score += 10;
        document.querySelector('.sprint-score span').textContent = score;
      }
    }
    xNum = rndNumberWord(words);
    yNum = rndNumberWord(words);
    drawWords(xNum, yNum);
  });
  // document.querySelector('.spring-wrong').addEventListener('click', () => {
  //   console.log('No');
  // });
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
