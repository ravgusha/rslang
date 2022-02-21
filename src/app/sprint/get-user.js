// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { KJUR } from 'jsrsasign';
import BASE_URL from '../../constants';
// import user from './user';

const token = localStorage.getItem('token');
export function getId() {
  return token ? KJUR.jws.JWS.parse(token).payloadObj.id : '';
}

async function getUser() {
  if (token) {
    const user = await axios(
      `${BASE_URL}/users/${getId()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    document.querySelector('.sprin-header-span').textContent = `User: ${user.data.name}`;
    return user.data.name;
  }
  return 'unregistered';
}
export default getUser;

export function getUserFromStorage() {
  const userName = localStorage.getItem('userName');
  document.querySelector('.sprin-header-span').textContent = `User: ${userName || 'unregistered'}`;
}
