import axios from 'axios';
import BASE_URL from '../constants';

let counter = 0;

const getRandomNum = () => Math.floor(Math.random() * (20 - 1 + 1)) + 1;

const shuffleArr = (arr) => {
  const shuffledArray = arr.slice();

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const handleResult = (result, rightWord, words) => {
  const progress = document.querySelector('.audiocall-progress');
  progress.innerHTML = `${++counter}/20`;
  console.log('counter should increase by 1');
  if (result.innerHTML === rightWord.wordTranslate) {
    console.log('result: right');
    playRound(words);
  } else {
    console.log('result: wrong');
    playRound(words);
  }
};

const playRound = (words) => {
  const rightWord = words[getRandomNum()];
  // eslint-disable-next-line max-len
  const wordsToPlay = [rightWord, words[getRandomNum()], words[getRandomNum()], words[getRandomNum()]];
  const shuffledWords = shuffleArr(wordsToPlay);
  const options = document.querySelectorAll('.audiocall-option-btn');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  const icon = document.querySelector('.audiocall-icon');
  options.forEach((item, i) => {
    const option = item;
    option.innerHTML = `${shuffledWords[i].wordTranslate}`;
  });
  const audio = new Audio(`${BASE_URL}/${rightWord.audio}`);
  audio.play();
  icon.addEventListener('click', () => audio.play());
  wrapper.addEventListener('click', (e) => handleResult(e.target, rightWord, words));
};

const startGame = (words) => {
  const start = document.querySelector('.audiocall-button');
  start.classList.add('off');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  wrapper.classList.remove('off');
  const progress = document.querySelector('.audiocall-progress');
  progress.classList.remove('off');
  const icon = document.querySelector('.audiocall-icon');
  icon.classList.remove('off');
  playRound(words);
};

export const getWords = async (page = 1, group = 1) => {
  const words = await axios.get(`${BASE_URL}/words?page=${page}&group=${group}`);
  const data = await words.data;
  const start = document.querySelector('.audiocall-button');

  if (start) {
    start.addEventListener('click', () => startGame(data));
  }
};

export default { getWords };
