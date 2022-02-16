import roundResultElement, { answerIcon, sounButtonImg } from '../../render/sprin-res-el';

// eslint-disable-next-line import/no-cycle
import sprintRun, { rightAnswersArr } from './sprint';

function resultRender() {
  const resWrapper = document.createElement('div');
  resWrapper.classList.add('res-wrapper');
  resWrapper.innerHTML = roundResultElement;
  document.body.append(resWrapper);
  printRightAnwers();
  document.querySelector('.res-btn-repeat').addEventListener('click', () => {
  //  console.log('new round');
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
    row.innerHTML += `<button>${sounButtonImg}</button>
  <span class="res-word">${e.word}</span>
  <span class="res-translate">${e.wordTranslate}</span>
  ${answerIcon[0]}
`;
    document.querySelector('.words-wrapper').insertBefore(row, document.querySelector('.wrong-answ'));
  });
}
