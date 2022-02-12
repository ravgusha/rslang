import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import menuOnRender from '../render/menu';
import eBookContent from './e-book-content';
import audiocall from '../Audiocall/audiocall';

function menuOnHndl() {
  document.querySelector('.menu-on').addEventListener('click', () => {
    menuOnRender();
    closeMenu();
  });
}

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

function toAudiocall() {
  document.querySelector('.audio-call').addEventListener('click', () => {
    audiocall();
  });
}

function screenListener() {
  eBookBtnHndl();
  toMainScrHndl();
  menuOnHndl();
  toAudiocall();
}
export default screenListener;

export function closeMenu() {
  document.querySelector('.close-menu-btn').addEventListener('click', () => {
    if (document.querySelector('.menu-wrapper')) {
      document.querySelector('.menu-wrapper').remove();
    }
  });
}
