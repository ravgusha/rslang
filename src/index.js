import axios from 'axios';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import renderMainScreen from './render/main-screen';
import renderEbookScreen from './render/e-book';
import './styles/styles.scss';

renderEbookScreen();

let currentGroup = 0;
let currentPage = 0;

const pagination = new Pagination(
  document.getElementById('tui-pagination-container'),
  {
    totalItems: 600,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  },
);

const BASE_URL = 'https://rslangteam.herokuapp.com';
let token;
let userId;

async function signIn() {
  const res = await axios.post(`${BASE_URL}/signin`, {
    email: 'raya@raya.ru',
    password: '12345678',
  });
  token = await res.data.token;
  userId = await res.data.userId;

  localStorage.setItem('token', token);
  ex();
}

async function createUserWords() {
  const res = await axios(`${BASE_URL}/words?group=${currentGroup}&page=${currentPage}}`);
  const data = await res.data;

  data.forEach((word) => {
    const { id } = word;

    const response = axios.post(
      `${BASE_URL}/users/${userId}/words/${id}`,
      {
        difficulty: 'easy',
        optional: { page: `${currentPage}`, group: `${currentGroup}` },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response, data);
  });
}


const tabs = document.getElementById('tabs');
const contents = document.querySelectorAll('.content');

async function getDifficultWords() {
  const res = await axios(
    `${BASE_URL}/users/${userId}/aggregatedWords?filter={"$and":[{"userWord.difficulty":"hard"}]}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.data[0].paginatedResults;
  console.log(data);

  contents[6].innerHTML = '';

  data.forEach((card) => {
    const {
      _id,
      image,
      word,
      transcription,git 
      wordTranslate,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textMeaningTranslate,
      textExample,
      textExampleTranslate,
    } = card;

    contents[6].insertAdjacentHTML(
      'beforeend',
      `<div class="card" id=${_id}>
        <img class="card__image" src="${BASE_URL}/${image}"/>
        <div class="card__text">
          <div class="card__header">
            <div class="card__header_left">
              <p class="card__word">${word}</p>
              <p class="card__transcription">&nbsp- ${transcription}</p>
              <p class="card__translate">&nbsp- ${wordTranslate}</p>
            </div>
            <button class="card__audio">
            <audio class="card__audio-transcription" src="${BASE_URL}/${audio}"></audio>
            <audio class="card__audio-meaning" src="${BASE_URL}/${audioMeaning}"></audio>
            <audio class="card__audio-example" src="${BASE_URL}/${audioExample}"></audio>
            </button>
            <button class="card__list"></button>
          </div>
          <div class="card__description">
            <p class="card__meaning">
            ${textMeaning}
            </p>
            <p class="card__meaning-translate">
            ${textMeaningTranslate}
            </p>
            <p class="card__example">
            ${textExample}
            </p>
            <p class="card__example-translate">
            ${textExampleTranslate}
            </p>
          </div>
        </div>
      </div>`,
    );
  });
}

async function getWords(group, page) {
  await signIn();
  // Для неавторизованных пользователей
  // const res = await axios(`${BASE_URL}/words?group=${group}&page=${page}}`);
  // const data = await res.data;

  // Для авторизованных
  const res = await axios(
    `${BASE_URL}/users/${userId}/aggregatedWords?group=${group}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.data[0].paginatedResults;

  contents[group].innerHTML = '';
  data.forEach((card) => {
    const {
      id,
      image,
      word,
      transcription,
      wordTranslate,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textMeaningTranslate,
      textExample,
      textExampleTranslate,
    } = card;

    contents[group].insertAdjacentHTML(
      'beforeend',
      `<div class="card" id=${id}>
        <img class="card__image" src="${BASE_URL}/${image}"/>
        <div class="card__text">
          <div class="card__header">
            <div class="card__header_left">
              <p class="card__word">${word}</p>
              <p class="card__transcription">&nbsp- ${transcription}</p>
              <p class="card__translate">&nbsp- ${wordTranslate}</p>
            </div>
            <button class="card__audio">
            <audio class="card__audio-transcription" src="${BASE_URL}/${audio}"></audio>
            <audio class="card__audio-meaning" src="${BASE_URL}/${audioMeaning}"></audio>
            <audio class="card__audio-example" src="${BASE_URL}/${audioExample}"></audio>
            </button>
            <button class="card__list"></button>
          </div>
          <div class="card__description">
            <p class="card__meaning">
            ${textMeaning}
            </p>
            <p class="card__meaning-translate">
            ${textMeaningTranslate}
            </p>
            <p class="card__example">
            ${textExample}
            </p>
            <p class="card__example-translate">
            ${textExampleTranslate}
            </p>
          </div>
        </div>
      </div>`,
    );
  });
}

async function addToDifficult(e) {
  // mark difficult word
  const currentCard = e.target.closest('.card');
  const image = currentCard.querySelector('img');
  const wordId = currentCard.id;
  //   console.log(currentCard, wordId);

  image.classList.add('difficult');

  const res = await axios.post(
    `${BASE_URL}/users/${userId}/words/${wordId}`,
    {
      difficulty: 'hard',
      optional: { page: `${currentPage}`, group: `${currentGroup}` },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await res.data;
  console.log(data);
}

pagination.on('beforeMove', (event) => {
  currentPage = event.page - 1;
  getWords(currentGroup, currentPage);
});

async function ex() {
  const res2 = await axios(`${BASE_URL}/users/${userId}/aggregatedWords`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data2 = await res2.data;

  console.log(data2);
}

function chooseChapter(e) {
  currentGroup = e.target.getAttribute('data-group');

  // Hide other contents
  contents.forEach((content) => {
    content.classList.add('hidden');
  });
  // Display choosen content
  contents[currentGroup].classList.remove('hidden');

  // Down other tabs
  document.querySelector('.active').classList.remove('active');
  // Up choosen tab
  e.target.classList.add('active');
  pagination.movePageTo(0);

  if (currentGroup === '6') {
    getDifficultWords();
  } else getWords(currentGroup, 0);
}

tabs.addEventListener('click', (e) => {
  chooseChapter(e);
});

getWords(0, 0);

function playAudio(e) {
  const sounds = document.getElementsByTagName('audio');
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].pause();
    sounds[i].currentTime = 0.0;
  }

  const audio1 = e.target.querySelector('.card__audio-transcription');
  const audio2 = e.target.querySelector('.card__audio-meaning');
  const audio3 = e.target.querySelector('.card__audio-example');
  audio1.play();

  audio1.onended = () => {
    audio2.play();
  };
  audio2.onended = () => {
    audio3.play();
  };
}

const conContainer = document.querySelector('.content__container');

conContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__audio')) {
    playAudio(e);
  }

  if (e.target.classList.contains('card__list')) {
    addToDifficult(e);
  }
});
