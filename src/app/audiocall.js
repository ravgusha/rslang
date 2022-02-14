import axios from 'axios';
import BASE_URL from '../constants';

export const startGame = () => {
  const start = document.querySelector('.audiocall-button');
  start.classList.add('off');
  const wrapper = document.querySelector('.audiocall-button-wrapper');
  wrapper.classList.remove('off');
  const progress = document.querySelector('.audiocall-progress');
  progress.classList.remove('off');
  const icon = document.querySelector('.audiocall-icon');
  icon.classList.remove('off');
};

export const getWords = async (page = 1, group = 1) => {
  const words = await axios.get(`${BASE_URL}/words?page=${page}&group=${group}`).then((res) => res.data);
  const options = document.querySelectorAll('.audiocall-option-btn');
  options.forEach((item, i) => {
    const option = item;
    option.innerHTML = `${words[i].wordTranslate}`;
  });
  const start = document.querySelector('.audiocall-button');
  start.addEventListener('click', startGame);
};

export default getWords;
