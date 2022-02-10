import axios from "axios";
import { BASE_URL } from "../constants";


export const createUser = async user => {
    const rawResponse = await axios.post(`${BASE_URL}/users`, user).then(response => {
            const addedUser = response.data;
            console.log(`POST: user is added`, addedUser);
        })
        .catch(error => console.error(error));
    return rawResponse;
}

export const loginUser = async user => {
  await axios.post(`${BASE_URL}/signin`, user);
};

export const formRegister = () => {
const loginForm = document.querySelector('form');
const formEvent = loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = { email, password };
    createUser(user);
});
}
