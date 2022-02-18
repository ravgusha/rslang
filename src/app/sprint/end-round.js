/* eslint-disable import/no-cycle */
// import { checkBoxLsnrOff } from './chbxlsnr';
import { btnLsnr } from './sprint';
import resultRender from './sprint-res';

function endOfRound() {
  resultRender();
  // checkBoxLsnrOff();
  document.querySelector('#base-timer-path-remaining').classList.remove('red');
  document.querySelector('#base-timer-path-remaining').classList.add('green');
  document.querySelector('.sprint-button-wrapper').removeEventListener('click', btnLsnr);
}

export default endOfRound;
