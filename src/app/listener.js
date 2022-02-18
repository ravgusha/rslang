import menuOnRender from '../render/menu';
import authOnRender from '../render/auth';
import {
  formLogin, mainLogin, userId, token, successLogin,
} from '../auth/authorization';

function menuOnHndl() {
  const menu = document.querySelector('.menu-on') || document.querySelector('.sprint-menu-on');
  if (menu) {
    menu.addEventListener('click', () => {
      menuOnRender();
      closeMenu();
    });
  }
}

function authHndl() {
  const auth = document.querySelector('.to-logout') || document.querySelector('.sprint-user');

  if (auth) {
    auth.addEventListener('click', () => {
      authOnRender();
      closeAuth();
      formLogin();
    });
  }

  mainLogin();
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
