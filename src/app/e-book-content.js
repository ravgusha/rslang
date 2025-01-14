/* eslint-disable global-require */
import axios from 'axios';
import Pagination from 'tui-pagination';
import BASE_URL from '../constants';
import { token, userId } from '../auth/authorization';

function eBookContent() {
  let currentGroup = localStorage.getItem('group') || 0;
  let currentPage = localStorage.getItem('page') || 0;

  const pagination = new Pagination(document.getElementById('tui-pagination-container'), {
    totalItems: 600,
    itemsPerPage: 20,
    visiblePages: 3,
    centerAlign: true,
    page: Number(currentPage) + 1, // Pagination starts from 0
  });

  const tabs = document.getElementById('tabs');
  const contents = document.querySelectorAll('.content');

  async function getDifficultWords() {
    const res = await axios(
      `${BASE_URL}/users/${userId}/aggregatedWords?wordsPerPage=100&filter={"userWord.difficulty":"hard"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.data[0].paginatedResults;
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
            <div class="card__header difficult">
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
        </div>`,
      );
    });
    countWords();
  }

  // Count of learnt words on the page
  let learntWordsOnPage = 0;
  const learntPagesInChapter = JSON.parse(localStorage.getItem('learntPagesInChapter')) || [
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  async function getWords(group, page) {
    learntWordsOnPage = 0;
    let data;

    if (token && userId) {
      const res = await axios(
        `${BASE_URL}/users/${userId}/aggregatedWords?wordsPerPage=20&group=${group}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      data = await res.data[0].paginatedResults;
    } else {
      // Для неавторизованных пользователей
      const res = await axios(`${BASE_URL}/words?group=${group}&page=${page}`);
      data = await res.data;
    }

    contents[group].classList.remove('hide');
    contents[group].innerHTML = '<p class="done-page hide">Страница изучена</p>';
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
        userWord,
      } = card;
      console.log(card);
      let difficulty = 'easy';
      if (userWord) {
        difficulty = card.userWord.difficulty;
      }

      contents[group].insertAdjacentHTML(
        'beforeend',
        `<div class="card" id=${_id}>

          <img class="card__image ${difficulty}" src="${BASE_URL}/${image}"/>
          <div class="card__score">
          <p class="card__hit">0</p>
          <span>/</span>
          <p class="card__miss">0</p></div>
          <div class="card__text">
            <div class="card__header">
              <div class="card__header_left">
                <p class="card__word">${word}</p>
                <p class="card__transcription">&nbsp- ${transcription}</p>
                <p class="card__translate">&nbsp- ${wordTranslate}</p>

                </button>
              </div>
              <div class="card__header_center">
              <button class="card__audio">
              <audio class="card__audio-transcription" src="${BASE_URL}/${audio}"></audio>
              <audio class="card__audio-meaning" src="${BASE_URL}/${audioMeaning}"></audio>
              <audio class="card__audio-example" src="${BASE_URL}/${audioExample}"></audio>
              <button title="To difficult" class="card__list"></button>
              <button title="To learnt" class="card__todone"></button>
              <img src=${require('../assets/images/svg/done.svg')} class="card__done hide">
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
        </div>`,
      );

      // if word is learnt, hide add to learnt button
      if (userWord) {
        const { status } = card.userWord.optional;
        if (status) {
          learntWordsOnPage++;
          if (document.getElementById(`${_id}`)) {
            document.getElementById(`${_id}`).querySelector('.card__done').classList.remove('hide');
            document.getElementById(`${_id}`).querySelector('.card__todone').classList.add('hide');
          }
        }
      }

      // if word is difficult, hide add to difficult button
      if (userWord) {
        const { difficulty } = card.userWord;
        if (difficulty === 'hard') {
          if (document.getElementById(`${_id}`)) {
            document.getElementById(`${_id}`).querySelector('.card__list').classList.add('hide');
          }
        }
      }
    });

    if (!token) {
      // delete difficult tab
      if (contents[6] && tabs.children[6]) {
        contents[6].remove();
        tabs.children[6].remove();
      }
      document.querySelectorAll('.card__list').forEach((button) => {
        button.remove();
      });
      document.querySelectorAll('.card__todone').forEach((button) => {
        button.remove();
      });
    }
    checkLeantWords();

    let rightAnswers = [];
    let wrongAnswers = [];
    if (localStorage.getItem('sprintStat')) {
      rightAnswers = JSON.parse(localStorage.getItem('sprintStat')).rightAnswers;
      wrongAnswers = JSON.parse(localStorage.getItem('sprintStat')).wrongAnswers;
    }
    if (rightAnswers) {
      rightAnswers.forEach((id) => {
        if (document.getElementById(id)) {
          const oldNumber = document.getElementById(id).querySelector('.card__hit').innerHTML;
          document.getElementById(id).querySelector('.card__hit').innerHTML = +oldNumber + 1;
        }
      });
    }

    if (wrongAnswers) {
      wrongAnswers.forEach((id) => {
        if (document.getElementById(id)) {
          const oldNumber = document.getElementById(id).querySelector('.card__miss').innerHTML;
          document.getElementById(id).querySelector('.card__miss').innerHTML = +oldNumber + 1;
        }
      });
    }
  }
  const audioCallBtn = document.querySelector('.ebook__audiocall');
  const sprintBtn = document.querySelector('.ebook__sprint');
  function checkLeantWords() {
    if (learntWordsOnPage === 20) {
      document.querySelector('.done-page').classList.remove('hide');

      audioCallBtn.style.backgroundColor = 'grey';
      audioCallBtn.disabled = true;

      sprintBtn.style.backgroundColor = 'grey';
      sprintBtn.disabled = true;

      if (learntPagesInChapter[currentGroup].indexOf(1 + Number(currentPage)) === -1) {
        learntPagesInChapter[currentGroup].push(1 + Number(currentPage));
        localStorage.setItem('learntPagesInChapter', JSON.stringify(learntPagesInChapter));
      }
    } else {
      audioCallBtn.style.backgroundColor = '#3fa9f5';
      audioCallBtn.disabled = false;

      sprintBtn.style.backgroundColor = '#e84e10';
      sprintBtn.disabled = false;
    }

    const navButtons = Array.from(document.querySelectorAll('.tui-page-btn'));
    learntPagesInChapter[currentGroup].forEach((num) => {
      const button = navButtons.find((el) => el.textContent === num.toString());
      if (button) {
        button.classList.add('underline');
      }
    });
  }

  async function addToLearnt(e) {
    const currentCard = e.target.closest('.card');
    const wordId = currentCard.id;

    const image = currentCard.querySelector('img');
    let difficulty = 'easy';
    currentCard.querySelector('.card__todone').classList.add('hide');
    currentCard.querySelector('.card__done').classList.remove('hide');

    if (image.classList.contains('hard')) {
      difficulty = 'hard';
    }
    learntWordsOnPage++;
    await axios
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
        },
      )
      .catch((error) => {
        if (error.response.status !== 200) {
          axios.put(
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
            },
          );
        }
      });

    checkLeantWords();
  }

  async function addToDifficult(e) {
    const currentCard = e.target.closest('.card');
    const image = currentCard.querySelector('img');
    const wordId = currentCard.id;

    // mark difficult word
    image.classList.add('hard');
    // delete add to difficult button
    currentCard.querySelector('.card__list').classList.add('hide');

    let status;

    if (currentCard.querySelector('.card__todone').classList.contains('hide')) {
      status = 'isLearnt';
    }

    await axios
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
        },
      )
      .catch((error) => {
        if (error.response.status !== 200) {
          axios.put(
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
            },
          );
        }
      });
  }

  async function removeFromDifficult(e) {
    // mark difficult word
    const currentCard = e.target.closest('.card');
    const wordId = currentCard.id;

    await axios.delete(`${BASE_URL}/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    getDifficultWords();
  }

  pagination.on('beforeMove', (event) => {
    currentPage = event.page - 1;

    localStorage.setItem('page', currentPage);
    localStorage.setItem('group', currentGroup);

    if (currentGroup === '6') {
      document.querySelector('.ebook__pag').style.opacity = '0';
      getDifficultWords();
    } else {
      getWords(currentGroup, currentPage);
      document.querySelector('.ebook__pag').style.opacity = '1';
    }
  });

  function chooseChapter(e) {
    learntWordsOnPage = 0;
    currentGroup = e.target.getAttribute('data-group');

    // Hide other contents
    contents.forEach((content) => {
      content.classList.add('hide');
    });
    // Display choosen content
    contents[currentGroup].classList.remove('hide');

    // Down other tabs
    document.querySelector('.active').classList.remove('active');
    // Up choosen tab
    e.target.classList.add('active');
    if (currentGroup === '6') {
      getDifficultWords();
      document.querySelector('.ebook__pag').classList.add('hidden');
    }
    pagination.movePageTo(0);
    document.querySelector('.ebook__pag').classList.remove('hidden');
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

  const wordsStat = { numberOfDifficult: 0, numberOfLearnt: 0 };

  async function countWords() {
    const resDiff = await axios(
      `${BASE_URL}/users/${userId}/aggregatedWords?&filter={"userWord.difficulty":"hard"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const numberOfDifficult = await resDiff.data[0].totalCount[0].count;
    wordsStat.numberOfDifficult = numberOfDifficult;

    const resLearnt = await axios(
      `${BASE_URL}/users/${userId}/aggregatedWords?&filter={"userWord.optional.status":"isLearnt"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const numberOfLearnt = await resLearnt.data[0].totalCount[0].count;
    wordsStat.numberOfLearnt = numberOfLearnt;

    localStorage.setItem('wordsStat', JSON.stringify(wordsStat));
  }
}

export default eBookContent;
