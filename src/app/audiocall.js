import axios from 'axios';
import BASE_URL from '../constants';
import getRandomNum from '../helpers/getRandomNum';
import shuffleArr from '../helpers/shuffleArr';

let counter;

const roundData = {};

const user = localStorage.getItem('userId');
const page = Number(localStorage.getItem('page'));
let group = Number(localStorage.getItem('group'));

const playAudio = () => {
  const audio = document.querySelector('.audiotag');
  setTimeout(() => {
    audio.play();
  }, 150);
};

export const audioStat = {
  rounds: 0,
  currentRoundScore: 0,
  maxScore: 0,
  maxSeries: 0,
  rightAnswers: [],
  wrongAnswers: [],
  learned: [],
};

const updateStat = () => {
  const userStat = axios.get(`${BASE_URL}/users/${user}`);
  console.log(userStat);
};

const stopGame = () => {
  const icon = document.querySelector('.audiocall-icon');
  const progress = document.querySelector('.audiocall-progress');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  const container = document.querySelector('.audiocall-container');
  let result = document.querySelector('.audiocall-result');
  wrapper.classList.add('off');
  progress.classList.add('off');
  icon.classList.add('off');
  const errors = roundData.questions.filter((el) => !el.correct);
  const rights = roundData.questions.filter((el) => el.correct);
  if (!result) {
    result = document.createElement('div');
    result.className = 'audiocall-result';
  } else {
    result.classList.remove('off');
    result.innerHTML = '';
  }
  const errorTitle = document.createElement('h3');
  errorTitle.className = 'audiocall-subtitle';
  errorTitle.innerHTML = `Errors: ${errors.length}`;
  result.append(errorTitle);
  errors.forEach((question) => {
    const line = document.createElement('div');
    line.className = 'audiocall-result-line';
    result.append(line);
    const answer = document.createElement('div');
    answer.innerHTML = `${question.word} - ${question.wordTranslate}`;
    const sound = document.createElement('div');
    sound.className = 'audiocall-icon-small';
    const audio = document.createElement('audio');
    audio.className = 'audiotag';
    audio.src = `${BASE_URL}/${question.audio}`;
    line.append(sound);
    line.append(answer);
    sound.append(audio);
  });
  const rightTitle = document.createElement('h3');
  rightTitle.className = 'audiocall-subtitle';
  rightTitle.innerHTML = `I know: ${rights.length}`;
  result.append(rightTitle);
  rights.forEach((question) => {
    const line = document.createElement('div');
    line.className = 'audiocall-result-line';
    result.append(line);
    const answer = document.createElement('div');
    answer.innerHTML = `${question.word} - ${question.wordTranslate}`;
    const sound = document.createElement('div');
    sound.className = 'audiocall-icon-small';
    const audio = document.createElement('audio');
    audio.className = 'audiotag';
    audio.src = `${BASE_URL}/${question.audio}`;
    line.append(sound);
    line.append(answer);
    sound.append(audio);
  });
  const btns = document.createElement('div');
  btns.className = 'audiocall-result-btns';
  const restart = document.createElement('button');
  restart.className = 'result-btn';
  restart.innerHTML = 'restart';
  restart.onclick = startGame;
  btns.append(restart);
  const contin = document.createElement('button');
  contin.className = 'result-btn';
  contin.innerHTML = 'continue';
  contin.onclick = () => {
    group++;
    startGame();
  };
  btns.append(contin);
  const toStat = document.createElement('a');
  toStat.className = 'result-btn';
  toStat.innerHTML = 'statistics';
  toStat.href = '#/statistics';
  btns.append(toStat);
  result.append(btns);
  container.append(result);
  if (user) {
    updateStat();
  }
};

const handleResult = (e) => {
  const button = e.target;
  const progress = document.querySelector('.audiocall-progress');
  progress.innerHTML = `${counter}/20`;
  if (button.innerHTML === roundData.questions[counter - 1].wordTranslate) {
    roundData.questions[counter - 1].correct = true;
  } else {
    roundData.questions[counter - 1].correct = false;
  }
  playRound();
};

const resetState = () => {
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
};

const showQuestion = (rightWord) => {
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  const audio = document.querySelector('.audiotag');
  audio.src = (`${BASE_URL}/${rightWord.audio}`);
  audio.pause();
  audio.currentTime = 0;
  playAudio();
  const wordsToPlay = shuffleArr([{ word: rightWord.wordTranslate, correct: true },
    { word: roundData.answers[counter].wordTranslate, correct: false },
    { word: roundData.answers1[counter].wordTranslate, correct: false },
    { word: roundData.answers2[counter].wordTranslate, correct: false }]);
  wordsToPlay.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.word;
    button.classList.add('audiocall-option-btn', 'btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    if (button) {
      button.addEventListener('click', (e) => {
        counter++;
        handleResult(e);
      });
    }
    wrapper.appendChild(button);
  });
};

const playRound = () => {
  resetState();
  if (roundData.questions[counter] === undefined) {
    stopGame();
  } else {
    showQuestion(roundData.questions[counter]);
  }
};

const startGame = () => {
  const start = document.querySelector('.audiocall-button');
  const icon = document.querySelector('.audiocall-icon');
  const progress = document.querySelector('.audiocall-progress');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  const groupDif = document.querySelector('.audiocall-group');
  const result = document.querySelector('.audiocall-result');
  if (result) {
    result.classList.add('off');
  }
  if (start) {
    start.classList.add('off');
  }
  if (groupDif) {
    groupDif.classList.add('off');
  }
  wrapper.classList.remove('off');
  progress.classList.remove('off');
  icon.classList.remove('off');
  if (icon) {
    icon.addEventListener('click', playAudio);
  }
  counter = 0;
  if (progress) {
    progress.innerHTML = `${counter}/20`;
  }
  playRound();
};

const getWords = async () => {
  const words = await axios.get(`${BASE_URL}/words?page=${page}&group=${group}`);
  let fillPage2 = 0;
  let fillGroup2 = 0;
  if (group >= 0 && group !== 5) {
    fillGroup2 = group + 1;
  } else if (group === 5) {
    fillGroup2 = group - 1;
  }
  if (page >= 0 && page !== 29) {
    fillPage2 = page + 3;
  } else if (page === 29) {
    fillPage2 = page - 3;
  }
  const fillWords2 = await axios.get(`${BASE_URL}/words?page=${fillPage2}&group=${fillGroup2}`);
  const fillWords1 = await axios.get(`${BASE_URL}/words?page=${fillPage2 + 1}&group=${fillGroup2}`);
  const fillWords = await axios.get(`${BASE_URL}/words?page=${fillPage2 + 2}&group=${fillGroup2}`);

  const fillData2 = await fillWords2.data;
  const fillData = await fillWords.data;
  const fillData1 = await fillWords1.data;

  const data = await words.data;
  roundData.questions = shuffleArr(data);
  roundData.answers = shuffleArr(fillData);
  roundData.answers1 = shuffleArr(fillData1);
  roundData.answers2 = shuffleArr(fillData2);
  startGame();
};

export const defineWords = () => {
  if (!page || !group) {
    const groupDiff = document.querySelector('.audiocall-group');
    groupDiff.classList.remove('off');
    if (groupDiff) {
      for (let i = 0; i < 6; i++) {
        const dif = document.createElement('div');
        dif.className = 'audiocall-group-diff';
        dif.innerHTML = `${i + 1}`;
        groupDiff.append(dif);
        const groupNum = i;
        dif.addEventListener('click', () => getWords(groupNum, getRandomNum(29)));
      }
    }
  } else if (page && group) {
    const start = document.querySelector('.audiocall-button');
    start.classList.remove('off');
    if (start) {
      start.addEventListener('click', () => getWords());
    }
  }
};

export default { defineWords };
