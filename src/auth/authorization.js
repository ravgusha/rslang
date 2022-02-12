import axios from 'axios';
import BASE_URL from '../constants';

export const validateUser = async (user) => axios.get(`${BASE_URL}/users`, user);

export const createUser = async (user) => {
  await validateUser(user).then((response) => {
    if (response.status === 'ok') {
      alert('The user already exists');
    } else {
      axios.post(`${BASE_URL}/users`, user);
    }
  }).catch((error) => console.error(error));
};

export const loginUser = async (user) => {
  await axios.post(`${BASE_URL}/signin`, user);
};

export const formRegister = () => {
  // const loginForm = document.querySelector('form');
  // const formEvent = loginForm.addEventListener('submit', (event) => {
  //   event.preventDefault();

  //   const email = document.querySelector('#email').value;
  //   const password = document.querySelector('#password').value;

  //   const user = { email, password };
  //   createUser(user);
  // });
};
