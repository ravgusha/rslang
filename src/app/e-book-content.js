import axios from 'axios';
import Pagination from 'tui-pagination';
import { BASE_URL } from '../constants';

function eBookContent() {
  let currentGroup = localStorage.getItem('group') || 0;
  let currentPage = localStorage.getItem('page') || 0;

  const pagination = new Pagination(document.getElementById('tui-pagination-container'), {
    totalItems: 600,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    page: Number(currentPage) + 1, // Поменять?
  });
  let token;
  let userId;

  async function signIn() {
    const res = await axios.post(`${BASE_URL}/signin`, {
      email: 'raya123456@raya.ru',
      password: '12345678',
    });
    token = await res.data.token;
    userId = await res.data.userId;

    localStorage.setItem('token', token);
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
      }
    );
    const data = await res.data[0].paginatedResults;
    console.log(data);

    contents[6].innerHTML = '';

    data.forEach((card) => {
      const {
        _id,
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
              <button class="card__list-delete"></button>
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
        </div>`
      );
    });
  }

  async function getWords(group, page) {
    console.log(group, page);
    await signIn();
    // Для неавторизованных пользователей
    // const res = await axios(`${BASE_URL}/words?group=${group}&page=${page}`);
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
      }
    );
    const data = await res.data[0].paginatedResults;
    console.log(res.data);

    contents[group].innerHTML = '';
    data.forEach((card) => {
      console.log(card);
      const {
        _id,
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
        userWord,
      } = card;

      let difficulty = 'easy';
      if (userWord) {
        difficulty = card.userWord.difficulty;
      }

      contents[group].insertAdjacentHTML(
        'beforeend',
        `<div class="card" id=${_id}>
          <img class="card__image ${difficulty}" src="${BASE_URL}/${image}"/>
          <div class="card__text">
            <div class="card__header">
              <div class="card__header_left">
                <p class="card__word">${word}</p>
                <p class="card__transcription">&nbsp- ${transcription}</p>
                <p class="card__translate">&nbsp- ${wordTranslate}</p>
                <button class="card__audio">
                <audio class="card__audio-transcription" src="${BASE_URL}/${audio}"></audio>
                <audio class="card__audio-meaning" src="${BASE_URL}/${audioMeaning}"></audio>
                <audio class="card__audio-example" src="${BASE_URL}/${audioExample}"></audio>
                <button title="To difficult" class="card__list"></button>
                <button title="To learnt" class="card__todone">В изученные</button>
                </button>
              </div>
              <div class="card__header_right">
              <img src=${require('../assets/images/svg/done.svg')} class="card__done hidden"></img>
              </div>
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
        </div>`
      );

      // if word is learnt, hide add to learnt button
      if (userWord) {
        const { status } = card.userWord.optional;
        console.log(typeof status, status);
        if (status) {
          document.getElementById(`${_id}`).querySelector('.card__done').classList.remove('hidden');
          document.getElementById(`${_id}`).querySelector('.card__todone').classList.add('hidden');
        }
      }
    });
  }
  async function addToLearnt(e) {
    const currentCard = e.target.closest('.card');
    const wordId = currentCard.id;

    const image = currentCard.querySelector('img');
    let difficulty = 'easy';
    currentCard.querySelector('.card__todone').classList.add('hidden');
    currentCard.querySelector('.card__done').classList.remove('hidden');

    let res;
    if (image.classList.contains('hard')) {
      difficulty = 'hard';
    }

    res = await axios
      .post(
        `${BASE_URL}/users/${userId}/words/${wordId}`,
        {
          difficulty: `${difficulty}`,
          optional: { page: `${currentPage}`, group: `${currentGroup}`, status: 'isLearnt' },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => {
        if (error.response.status !== 200) {
          res = axios.put(
            `${BASE_URL}/users/${userId}/words/${wordId}`,
            {
              difficulty: `${difficulty}`,
              optional: { page: `${currentPage}`, group: `${currentGroup}`, status: 'isLearnt' },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
        }
      });

    const { data } = res;
    console.log(data);
  }

  async function addToDifficult(e) {
    const currentCard = e.target.closest('.card');
    const image = currentCard.querySelector('img');
    const wordId = currentCard.id;

    // mark difficult word
    image.classList.add('hard');
    // delete add to difficult button
    currentCard.querySelector('.card__list').classList.add('hidden');

    let res;
    let status;

    if (currentCard.querySelector('.card__todone').classList.contains('hidden')) {
      status = 'isLearnt';
    }

    res = await axios
      .post(
        `${BASE_URL}/users/${userId}/words/${wordId}`,
        {
          difficulty: 'hard',
          optional: { page: `${currentPage}`, group: `${currentGroup}`, status: `${status}` },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => {
        if (error.response.status !== 200) {
          res = axios.put(
            `${BASE_URL}/users/${userId}/words/${wordId}`,
            {
              difficulty: 'hard',
              optional: { page: `${currentPage}`, group: `${currentGroup}`, status: `${status}` },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
        }
      });

    const { data } = res;
    console.log(data);
  }

  async function removeFromDifficult(e) {
    // mark difficult word
    const currentCard = e.target.closest('.card');
    const wordId = currentCard.id;

    const res = await axios.delete(`${BASE_URL}/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    getDifficultWords();

    const data = await res.data;
    console.log(data);
  }

  pagination.on('beforeMove', (event) => {
    currentPage = event.page - 1;
    if (currentGroup === '6') return;

    localStorage.setItem('page', currentPage);
    localStorage.setItem('group', currentGroup);

    getWords(currentGroup, currentPage);
  });

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

  getWords(currentGroup, currentPage);

  let prevPlayedAudioId;
  let isPlayed = false;

  function playAudio(e) {
    const sounds = document.getElementsByTagName('audio');
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pause();
      sounds[i].currentTime = 0.0;
    }

    const currentAudioId = e.target.closest('.card').id;
    if (prevPlayedAudioId === currentAudioId && isPlayed) {
      isPlayed = false;
      return;
    }
    prevPlayedAudioId = currentAudioId;
    const audio1 = e.target.querySelector('.card__audio-transcription');
    const audio2 = e.target.querySelector('.card__audio-meaning');
    const audio3 = e.target.querySelector('.card__audio-example');
    audio1.play();
    isPlayed = true;

    audio1.onended = () => {
      audio2.play();
    };
    audio2.onended = () => {
      audio3.play();
    };
    audio2.onended = () => {
      isPlayed = false;
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

    if (e.target.classList.contains('card__list-delete')) {
      removeFromDifficult(e);
    }

    if (e.target.classList.contains('card__todone')) {
      addToLearnt(e);
    }
  });
}

export default eBookContent;
