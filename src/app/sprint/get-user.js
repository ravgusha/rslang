// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { KJUR } from 'jsrsasign';
import BASE_URL from '../../constants';

const token = localStorage.getItem('token');
export function getId() {
  return KJUR.jws.JWS.parse(token).payloadObj.id;
}

async function getUser() {
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
export default getUser;
