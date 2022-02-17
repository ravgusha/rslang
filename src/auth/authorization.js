import axios from 'axios';
import BASE_URL from '../constants';

export let userId = localStorage.getItem('userId');
export let token = localStorage.getItem('token');
console.log(userId);
export const validateUser = async (user) => axios.get(`${BASE_URL}/users`, user);

export const createUser = async (user) => {
  // await validateUser(user).then((response) => {
  //   if (response.status === 'ok') {
  //     alert('The user already exists');
  //   } else {
  axios.post(`${BASE_URL}/users`, user);
  // }
  // }).catch((error) => console.error(error));
};

export const loginUser = async (user) => {
  const res = await axios.post(`${BASE_URL}/signin`, user);

  token = await res.data.token;
  userId = await res.data.userId;

  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

export const formLogin = () => {
  const loginForm = document.querySelector('.login-form__submit');

  loginForm.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.querySelector('.login-form__email').value;
    const password = document.querySelector('.login-form__password').value;

    const user = { email, password };

    loginUser(user)
      .then(successLogin)
      .catch((error) => {
        if (error.status !== 200) {
          document.querySelector('.login-form__error').classList.remove('hidden');
        }
      });
  });
};

export const successLogin = () => {
  const loginWrapper = document.querySelector('.login-wrapper');
  if (loginWrapper) {
    loginWrapper.remove();
  }

  const loginIcon = document.querySelector('.to-logout');

  loginIcon.style.backgroundImage = 'url(\'../assets/images/png/logout.png\')';
  // remove event listener opening form

  loginIcon.addEventListener('click', () => {

  });
  // Выход при клике на иконку
};

export default formLogin;
