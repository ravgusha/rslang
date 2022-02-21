import BASE_URL from '../../constants';
import { GAME_STATE } from '../../Routing/routing';

const { default: axios } = require('axios');

async function requestUnregWords() {
  const res = [];
  const data = await axios.get(`${BASE_URL}/words?page=0&group=${GAME_STATE.sprintLevel}`);

  if (data.status !== 200) {
    console.log('Error');
  }
  data.data.forEach((element) => {
    res.push(element.word);
  });
  return data.data;
}
export default requestUnregWords;
