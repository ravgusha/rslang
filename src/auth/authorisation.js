import axios from "axios";



export const createUser = async user => {
    const rawResponse = await axios.post('https://rslangteam.herokuapp.com/users', user).then(response => {
            const addedUser = response.data;
            console.log(`POST: user is added`, addedUser);
        })
        .catch(error => console.error(error));
    return rawResponse;
}

export const loginUser = async user => {
  const rawResponse = await fetch('https://rslangteam.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
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
