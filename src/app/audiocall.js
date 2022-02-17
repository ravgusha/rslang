import axios from 'axios';
import BASE_URL from '../constants';

const getRandomNum = () => Math.floor(Math.random() * (19 - 1 + 1)) + 1;

const shuffleArr = (arr) => {
  const shuffledArray = arr.slice();

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const stopGame = () => {
  alert('Game over!');
};

const handleResult = (result, rightWord, words, fillWords, counter) => {
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  wrapper.removeEventListener('click', (e) => handleResult(e.target, rightWord, words, fillWords, counter));
  const button = result;
  console.log(result);
  const progress = document.querySelector('.audiocall-progress');
  const updateCounter = counter + 1;
  const learntWords = [];
  progress.innerHTML = `${updateCounter}/20`;
  if (updateCounter === 20) {
    stopGame(learntWords);
  }

  if (result.innerHTML === rightWord.wordTranslate) {
    learntWords.push(result);
    button.classList.remove('wrong');
    playRound(words, fillWords, updateCounter);
  } else {
    button.classList.add('wrong');
    playRound(words, fillWords, updateCounter);
  }
};

const playRound = (words, fillWords, counter) => {
  const rightWord = words[getRandomNum()];
  // eslint-disable-next-line max-len
  const wordsToPlay = [rightWord, fillWords[getRandomNum()], fillWords[getRandomNum()], fillWords[getRandomNum()]];
  const shuffledWords = shuffleArr(wordsToPlay);
  const options = document.querySelectorAll('.audiocall-option-btn');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  const audio = document.querySelector('.audiotag');
  const icon = document.querySelector('.audiocall-icon');
  options.forEach((item, i) => {
    const option = item;
    option.innerHTML = `${shuffledWords[i].wordTranslate}`;
  });
  audio.src = (`${BASE_URL}/${rightWord.audio}`);
  const playAudio = () => {
    setTimeout(() => {
      audio.play();
    }, 150);
    audio.pause();
    audio.currentTime = 0;
  };
  playAudio();
  icon.addEventListener('click', playAudio, true);
  wrapper.addEventListener('click', (e) => handleResult(e.target, rightWord, words, fillWords, counter));
};

const startGame = (words, fillWords) => {
  const start = document.querySelector('.audiocall-button');
  start.classList.add('off');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  wrapper.classList.remove('off');
  const progress = document.querySelector('.audiocall-progress');
  progress.classList.remove('off');
  const icon = document.querySelector('.audiocall-icon');
  icon.classList.remove('off');
  const counter = 0;
  playRound(words, fillWords, counter);
};

export const getWords = async (page = 1, group = 1) => {
  const words = await axios.get(`${BASE_URL}/words?page=${page}&group=${group}`);
  let fillPage = 0;
  let fillGroup = 0;
  if (group >= 0 && group !== 6) {
    fillGroup = group + 1;
  } else if (group === 5) {
    fillGroup = group - 1;
  }
  if (page >= 0 && page !== 29) {
    fillPage = page + 1;
  } else if (page === 29) {
    fillPage = page - 1;
  }
  const fillWords = await axios.get(`${BASE_URL}/words?page=${fillPage}&group=${fillGroup}`);
  const fillData = await fillWords.data;
  const data = await words.data;
  const start = document.querySelector('.audiocall-button');
  if (start) {
    start.addEventListener('click', () => startGame(data, fillData));
  }
};

export default { getWords };
