import axios from 'axios';
import BASE_URL from '../constants';

export let userId;
export let token;

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
};

export const formLogin = () => {
  const loginForm = document.querySelector('.login-form__submit');
  loginForm.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.querySelector('.login-form__email').value;
    const password = document.querySelector('.login-form__password').value;

    const user = { email, password };
    loginUser(user)
      .then(successLogin())
      .catch((error) => {
        if (error.status !== 200) {
          document.querySelector('.login-form__error').classList.remove('hidden');
        }
      });
  });
};

export const successLogin = () => {
  document.querySelector('.login-wrapper').remove();
  document.querySelector('.to-logout').style.backgroundImage = 'url(\'../assets/images/png/logout.png\')';
};

export default loginUser;
