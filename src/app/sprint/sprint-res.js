import BASE_URL from '../../constants';
import roundResultElement, { answerIcon } from '../../render/sprin-res-el';

// eslint-disable-next-line import/no-cycle
import sprintRun, { rightAnswersArr, wrongAnswersArr } from './sprint';

function resultRender() {
  const resWrapper = document.createElement('div');
  resWrapper.classList.add('res-wrapper');
  resWrapper.innerHTML = roundResultElement;
  document.body.append(resWrapper);
  printRightAnwers();
  printWrongAnwers();
  playAudioBtnHndl();
  document.querySelector('.res-btn-repeat').addEventListener('click', () => {
    resWrapper.remove();
    sprintRun();
  });
}

export default resultRender;

function printRightAnwers() {
  rightAnswersArr.forEach((e) => {
    const row = document.createElement('div');
    row.classList.add('res-row');
    row.setAttribute('data-id', `${e.id}`);
    row.innerHTML += `<audio class="${e.id}" src="${BASE_URL}/${e.audio}"></audio>
    <button class="play-btn" data-id="${e.id}"></button>
  <span class="res-word">${e.word}</span>
  <span class="res-translate">${e.wordTranslate}</span>
  ${answerIcon[0]}
`;
    document.querySelector('.words-wrapper').insertBefore(row, document.querySelector('.wrong-answ'));
  });
}
function printWrongAnwers() {
  const arr = deleteDoubleWordsFromWrong(wrongAnswersArr);
  arr.forEach((e) => {
    const row = document.createElement('div');
    row.classList.add('res-row');
    row.setAttribute('data-id', `${e.id}`);
    row.innerHTML += `<audio class="${e.id}" src="${BASE_URL}/${e.audio}"></audio>
    <button class="play-btn" data-id="${e.id}"></button>
  <span class="res-word">${e.word}</span>
  <span class="res-translate">${e.wordTranslate}</span>
  ${answerIcon[1]}
`;
    document.querySelector('.words-wrapper').append(row);
  });
}

function playAudioBtnHndl() {
  const wrapper = document.querySelector('.words-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('play-btn')) {
        const audioClassName = (e.target.getAttribute('data-id'));
        const audio = document.getElementsByClassName(`${audioClassName}`)[0];
        audio.play();
      }
    });
  }
}

function deleteDoubleWordsFromWrong(arr) {
  const res = arr.reduce((o, i) => {
    if (!o.find((v) => v.id === i.id)) {
      o.push(i);
    }
    return o;
  }, []);
  return res;
}
