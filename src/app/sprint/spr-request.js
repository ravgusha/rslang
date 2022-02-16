import BASE_URL from '../../constants';

const { default: axios } = require('axios');

async function requestUnregWords() {
  const res = [];
  const data = await axios.get(`${BASE_URL}/words?page=2&group=0`);
  data.data.forEach((element) => {
    res.push(element.word);
  });
  return data.data;
}
export default requestUnregWords;
