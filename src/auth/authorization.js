/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-mutable-exports */
import axios from 'axios';
// import { saveSprintStatToServer } from '../app/sprint/end-round';
import { sprintStat } from '../app/sprint/sprint';
import { loadSprintStatRequest } from '../app/stat';
import BASE_URL from '../constants';
import { GAME_STATE } from '../Routing/routing';

export let userId = localStorage.getItem('userId');
export let token = localStorage.getItem('token');
export let userName = localStorage.getItem('userName');
export const validateUser = async (user) => axios.get(`${BASE_URL}/users`, user);

export const createUser = async (user) => {
  await axios.post(`${BASE_URL}/users`, user);
  // await saveSprintStatToServer();
};

export const loginUser = async (user) => {
  const res = await axios.post(`${BASE_URL}/signin`, user);

  token = await res.data.token;
  userId = await res.data.userId;
  userName = await res.data.name;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', userName);
  await loadSprintStatRequest();
};

export const headerLogin = () => {
  const loginForm = document.querySelector('.login-form');
  const loginWrapper = document.querySelector('.login-wrapper');
  const loginModalSumbit = document.querySelector('.login-form__submit');
  const createUserBtn = document.querySelector('.login-form__signup');

  if (token && userId) {
    loginForm.innerHTML = '<img class="logout-img" src="assets/images/svg/lock-open.svg"><p class="logout-text">Do you want to exit?</p><div class="logout-buttons"><button class="logout-yes">Yes</button><button class="logout-no">No</button></div>';
    document.querySelector('.logout-yes').addEventListener('click', successLogout);
    document.querySelector('.logout-no').addEventListener('click', () => {
      loginWrapper.remove();
    });
  }

  if (loginModalSumbit) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      signIn();
    });
  }

  if (createUserBtn) {
    createUserBtn.addEventListener('click', (event) => {
      event.preventDefault();

      loginWrapper.innerHTML = `<form class="signup-form">
      <button type="button" class="signup-form__back">←</button>
      <button class="signup-form__close">X</button>
      <img class="signup-img" src="assets/images/svg/signup.svg">
      <div class="signup-form__inputs">
      <input type="email" name="email" class="signup-form__email"  placeholder="E-mail" required>
      <input type="text" name="name" class="signup-form__name"  placeholder="Name" required>
      <input id="password" value="" name="password" minlength="8" class="signup-form__password" type="password" placeholder="Password" required ></div>
      <p class="signup-form__error hidden">Wrong e-mail or password</p>
      <button class="signup-form__submit">Create</button>
      </form>`;

      document.querySelector('.signup-form__close').addEventListener('click', () => {
        if (document.querySelector('.login-wrapper')) {
          successLogout();
        }
      });
      formSignup();
    });
  }
};

export const formSignup = async () => {
  const signupForm = document.querySelector('.signup-form');
  const signupBack = document.querySelector('.signup-form__back');
  const loginWrapper = document.querySelector('.login-wrapper');

  signupBack.addEventListener('click', () => {
    loginWrapper.innerHTML = `<form class="login-form">
  <button class="login-form__close">X</button>
  <img src="assets/images/svg/lock.svg">
  <div class="login-form__inputs">
  <input type="email" name="email" class="login-form__email"  placeholder="E-mail" required>
  <input minlength="8" id="password" value="" name="password" class="login-form__password" type="password" placeholder="Password" required ></div>
  <p class="login-form__error hidden">Wrong e-mail or password</p>
  <button class="login-form__submit">Sign in</button>
  <a class="login-form__signup">Don't have an account? Sign Up</a>
  </form>`;
    headerLogin();
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      signIn();
    });
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    signUp();
  });
};

export const mainSignup = () => {
  const mainSignupBtn = document.querySelector('.btn-span');
  const mainLoginBlock = document.querySelector('.sign-in');

  if (mainSignupBtn) {
    mainSignupBtn.addEventListener('click', () => {
      mainLoginBlock.innerHTML = `<button class="signup-back">←</button><span class="signup-label">E-mail</span>
    <input class="signup-email" type="email" placeholder="E-mail:" />
    <span class="signup-label">Name</span>
    <input class="signup-name" type="text" placeholder="Name:" />
    <span class="signup-label">Password</span>
    <input class="signup-password" minlength="8" type="password" placeholder="Password" />
    <p class="signup-error hidden">Wrong e-mail or password</p>
    <button class="signup-btn">Sign up</button>`;

      document.querySelector('.signup-btn').addEventListener('click', (event) => {
        event.preventDefault();
        signUp('main');
      });

      document.querySelector('.signup-back').addEventListener('click', () => {
        successLogout();
        mainSignup();
      });
    });
  }
};

export const mainLogin = () => {
  const loginIcon = document.querySelector('.to-logout');
  const loginMainSubmit = document.querySelector('.sign-btn');
  const loginMain = document.querySelector('.sign-in');

  if (token && userId && GAME_STATE.mode !== 'sprint' && GAME_STATE.mode !== 'ebook' && loginIcon) {
    loginIcon.style.backgroundImage = 'url(\'assets/images/png/logout.png\')';
    loginMain.innerHTML = '<button class="sign-btn" id="signout">Sign out</button>';

    document.getElementById('signout').addEventListener('click', successLogout);
  }
  if (loginMainSubmit) {
    loginMainSubmit.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.querySelector('.sign-email').value;
      const password = document.querySelector('.sign-password').value;

      const user = { email, password };

      loginUser(user)
        .then(successLogin)
        .catch((error) => {
          if (error.status !== 200) {
            document.querySelector('.sign-error').classList.remove('hidden');
          }
        });
    });
  }
  if (loginMainSubmit) {
    loginMainSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      signIn('main');
    });
  }
};

export const signIn = (form) => {
  let email;
  let password;

  if (form === 'main') {
    email = document.querySelector('.sign-email').value;
    password = document.querySelector('.sign-password').value;
  } else {
    email = document.querySelector('.login-form__email').value;
    password = document.querySelector('.login-form__password').value;
  }

  const user = { email, password };

  loginUser(user)
    .then(successLogin)
    .catch((error) => {
      if (error.status !== 200) {
        if (form === 'main') {
          document.querySelector('.sign-error').classList.remove('hidden');
        } else {
          document.querySelector('.login-form__error').classList.remove('hidden');
        }
      }
    });
};

export const signUp = (form) => {
  const loginForm = document.querySelector('.signup-form');
  const loginWrapper = document.querySelector('.login-wrapper');
  let name;
  let email;
  let password;
  sprintStat.rounds = 0;
  sprintStat.wrongAnswers = [];
  sprintStat.rightAnswers = [];
  sprintStat.maxSeries = 0;
  sprintStat.maxScore = 0;
  sprintStat.learned = [];
  sprintStat.currentRoundScore = 0;

  if (form === 'main') {
    name = document.querySelector('.signup-name').value;
    email = document.querySelector('.signup-email').value;
    password = document.querySelector('.signup-password').value;
  } else {
    name = document.querySelector('.signup-form__name').value;
    email = document.querySelector('.signup-form__email').value;
    password = document.querySelector('.signup-form__password').value;
  }

  const user = { name, email, password };
  const user1 = { email, password };

  createUser(user)
    .then(() => {
      loginUser(user1);
      if (loginForm) {
        loginForm.innerHTML = '<img class="logout-img" src="assets/images/svg/lock-open.svg"><p class="logout-text">Do you want to exit?</p><div class="logout-buttons"><button class="logout-yes">Yes</button><button class="logout-no">No</button></div>';
        document.querySelector('.logout-yes').addEventListener('click', successLogout);
        document.querySelector('.logout-no').addEventListener('click', () => {
          loginWrapper.remove();
        });
      }
      successLogin();
    })
    .catch((error) => {
      if (error.status !== 200) {
        if (form === 'main') {
          document.querySelector('.signup-error').classList.remove('hidden');
        } else {
          document.querySelector('.signup-form__error').classList.remove('hidden');
        }
      }
    });
};

export const successLogin = () => {
  const loginWrapper = document.querySelector('.login-wrapper');
  const loginMain = document.querySelector('.sign-in');
  if (loginWrapper) {
    loginWrapper.remove();
  }

  const loginIcon = document.querySelector('.to-logout');
  if (loginIcon && loginMain) {
    loginIcon.style.backgroundImage = 'url(\'assets/images/png/logout.png\')';
    loginMain.innerHTML = '<button class="sign-btn" id="signout">Sign out</button>';
    document.getElementById('signout').addEventListener('click', successLogout);
  }
};

export const successLogout = () => {
  const loginMain = document.querySelector('.sign-in');
  const loginWrapper = document.querySelector('.login-wrapper');

  if (loginWrapper) {
    createLoginForm();
  }

  loginMain.innerHTML = ` <span class="sign-label">E-mail</span>
    <input class="sign-email" type="email" placeholder="E-mail:" />
    <span class="sign-label">Password</span>
    <input class="sign-password" type="password" placeholder="Password" />
    <p class="sign-error hidden">Wrong e-mail or password</p>
    <button class="sign-btn">Sign in</button>
    <span class="btn-span" id="signin">Don't have an account? Sign Up</span>;`;

  document.querySelector('.sign-btn').addEventListener('click', (event) => {
    event.preventDefault();
    signIn('main');
  });

  mainSignup();

  const loginIcon = document.querySelector('.to-logout');
  loginIcon.style.backgroundImage = 'url(\'assets/images/svg/sign-logo.svg\')';

  userName = '';
  token = '';
  userId = '';
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('page');
  localStorage.removeItem('group');
  localStorage.removeItem('sprintStat');
  for (const key in sprintStat) {
    sprintStat[key] = 0;
  }
  localStorage.removeItem('wordsStat');
};

const createLoginForm = () => {
  const loginWrapper = document.querySelector('.login-wrapper');
  loginWrapper.innerHTML = `<form class="login-form">
  <button class="login-form__close">X</button>
  <img src="assets/images/svg/lock.svg">
  <div class="login-form__inputs">
  <input name="email" class="login-form__email" type="email" placeholder="E-mail">
  <input id="password" value="" name="password" class="login-form__password" type="password" placeholder="Password"></div>
  <p class="login-form__error hidden">Wrong e-mail or password</p>
  <button class="login-form__submit">Sign in</button>
  <a class="login-form__signup">Don't have an account? Sign Up</a>
  </form>`;

  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    signIn();
  });
  loginWrapper.remove();
};

export const successSignup = () => {
  const loginWrapper = document.querySelector('.login-wrapper');

  if (loginWrapper) {
    createLoginForm();
  }
};

export default headerLogin;
