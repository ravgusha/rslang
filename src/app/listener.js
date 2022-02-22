import menuOnRender from '../render/menu';
import authOnRender from '../render/auth';
import {
  headerLogin, mainLogin, userId, token, successLogin, mainSignup,
} from '../auth/authorization';
// eslint-disable-next-line import/no-cycle
import { GAME_STATE } from '../Routing/routing';

function menuOnHndl() {
  const menu = document.querySelector('.menu-on') || document.querySelector('.sprint-menu-on');
  if (menu) {
    menu.addEventListener('click', () => {
      console.log('menu');
      GAME_STATE.menu = true;
      localStorage.setItem('GAME_STATE', JSON.stringify(GAME_STATE));
      menuOnRender();
      closeMenu();
    });
  }
}

function authHndl() {
  const auth = document.querySelector('.to-logout');

  if (auth) {
    auth.addEventListener('click', () => {
      authOnRender();
      closeAuth();
      headerLogin();
    });
  }

  mainLogin();
  mainSignup();
}

function checkLogin() {
  if (userId && token) {
    successLogin();
  }
}

function screenListener() {
  menuOnHndl();
  authHndl();
  checkLogin();
}

export function closeMenu() {
  document.querySelector('.close-menu-btn').addEventListener('click', () => {
    if (document.querySelector('.menu-wrapper')) {
      GAME_STATE.menu = false;
      localStorage.setItem('GAME_STATE', JSON.stringify(GAME_STATE));
      document.querySelector('.menu-wrapper').remove();
    }
  });
}

export function closeAuth() {
  document.querySelector('.login-form__close').addEventListener('click', () => {
    if (document.querySelector('.login-wrapper')) {
      document.querySelector('.login-wrapper').remove();
    }
  });
}

export default screenListener;
