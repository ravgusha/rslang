import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import menuOnRender from '../render/menu';
import eBookContent from './e-book-content';
import { Game } from '../constants';

function menuListener() {
  if (document.querySelector('.menu-book')) {
    document.querySelector('.menu-book').addEventListener('click', () => {
      if (document.querySelector('.menu-wrapper')) {
        document.querySelector('.menu-wrapper').remove();
      }
      if (Game.mode !== 'e-book') {
        renderEbookScreen();
        eBookContent();
        Game.mode = 'e-book';
      }
    });
  }
}

function menuOnHndl() {
  document.querySelector('.menu-on').addEventListener('click', () => {
    menuOnRender();
    closeMenu();
    menuListener();
  });
}

function eBookBtnHndl() {
  document.querySelector('.e-book-btn').addEventListener('click', () => {
    renderEbookScreen();
    eBookContent();

    Game.mode = 'e-book';
  });
}
function toMainScrHndl() {
  document.querySelector('.to-main').addEventListener('click', () => {
    renderMainScreen();
    screenListener();
    Game.mode = 'main';
  });
}
function screenListener() {
  eBookBtnHndl();
  toMainScrHndl();
  menuOnHndl();
}
export default screenListener;

export function closeMenu() {
  document.querySelector('.close-menu-btn').addEventListener('click', () => {
    if (document.querySelector('.menu-wrapper')) {
      document.querySelector('.menu-wrapper').remove();
    }
  });
}
