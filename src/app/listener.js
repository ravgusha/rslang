import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import eBookContent from './e-book-content';

function eBookBtnHndl() {
  document.querySelector('.e-book-btn').addEventListener('click', () => {
    renderEbookScreen();
    eBookContent();
  });
}
function toMainScrHndl() {
  document.querySelector('.to-main').addEventListener('click', () => {
    renderMainScreen();
    screenListener();
  });
}
function screenListener() {
  eBookBtnHndl();
  toMainScrHndl();
}
export default screenListener;
