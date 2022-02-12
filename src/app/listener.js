// import renderEbookScreen from '../render/e-book';
// import renderMainScreen from '../render/main-screen';
import menuOnRender from '../render/menu';
import eBookContent from './e-book-content';
import audiocall from '../Audiocall/audiocall';

function menuOnHndl() {
  const menu = document.querySelector('.menu-on');
  if (menu) {
    menu.addEventListener('click', () => {
      menuOnRender();
      closeMenu();
    });
  }
}

function eBookBtnHndl() {
  const book = document.querySelector('.e-book-btn');
  if (book) {
    book.addEventListener('click', () => {
    // renderEbookScreen();
      eBookContent();
    });
  }
}

function toAudiocall() {
  document.querySelector('.audio-call').addEventListener('click', () => {
    audiocall();
  });
}

function screenListener() {
  eBookBtnHndl();
  // toMainScrHndl();
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
