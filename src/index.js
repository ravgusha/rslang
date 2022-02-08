import axios from "axios";

import Pagination from "tui-pagination";
import "../node_modules/tui-pagination/dist/tui-pagination.min.css";

import renderMainScreen from "./render/main-screen";
import renderEbookScreen from "./render/e-book";
import "./styles/styles.scss";

renderEbookScreen();

const pagination = new Pagination(
  document.getElementById("tui-pagination-container"),
  {
    totalItems: 600,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  }
);

let currentGroup = 0;

pagination.on("beforeMove", (event) => {
  const currentPage = event.page - 1;
  getWords(currentGroup, currentPage);
});

const BASE_URL = "https://rslangteam.herokuapp.com";

const tabs = document.getElementById("tabs");
const contents = document.querySelectorAll(".content");

function chooseChapter(e) {
  currentGroup = e.target.getAttribute("data-group");

  // Hide other contents
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
  // Display choosen content
  contents[currentGroup].classList.remove("hidden");

  // Down other tabs
  document.querySelector(".active").classList.remove("active");
  // Up choosen tab
  e.target.classList.add("active");
  pagination.movePageTo(0);
  getWords(currentGroup, 0);
}

tabs.addEventListener("click", (e) => {
  chooseChapter(e);
});

async function getWords(group, page) {
  const res = await axios(`${BASE_URL}/words?group=${group}&page=${page}}`);
  const data = await res.data;
  //   console.log(res)

  contents[group].innerHTML = "";
  data.forEach((card) => {
    const {
      id,
      image,
      word,
      transcription,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
    } = card;

    contents[group].insertAdjacentHTML(
      "beforeend",
      `<div class="card" id=${id}>
      <img class="card__image" src="${BASE_URL}/${image}"/>
      <div class="card__text">
        <div class="card__header">
          <div class="card__header_left">
            <p class="card__word">${word}</p>
            <p class="card__transcription">&nbsp- ${transcription}</p>
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
          <p class="card__example">
          ${textExample}
          </p>
        </div>
      </div>
    </div>`
    );
  });
}

getWords(0, 0);

function playAudio(e) {
  const sounds = document.getElementsByTagName("audio");
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].pause();
    sounds[i].currentTime = 0.0;
  }

  const audio1 = e.target.querySelector(".card__audio-transcription");
  const audio2 = e.target.querySelector(".card__audio-meaning");
  const audio3 = e.target.querySelector(".card__audio-example");
  audio1.play();

  audio1.onended = function () {
    audio2.play();
  };
  audio2.onended = function () {
    audio3.play();
  };
}

const conContainer = document.querySelector(".content__container");

conContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__audio")) {
    playAudio(e);
  }
});

const createPagination = (params) => {
  const { listLength, perPage, currentPage, numberOfButtons } = params;
  // console.log(params)

  const numberOfPages = Math.ceil(listLength / perPage);

  if (currentPage > numberOfPages || currentPage < 1) {
    return {
      pagination: [],
      currentPage,
    };
  }
  console.log(numberOfPages);
  const buttons = Array(numberOfPages)
    .fill(1)
    .map((e, i) => e + i);
  const sideButtons =
    numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;

  const calculLeft = (rest = 0) => ({
    array: buttons
      .slice(0, currentPage - 1)
      .reverse()
      .slice(0, sideButtons + rest)
      .reverse(),
    rest() {
      return sideButtons - this.array.length;
    },
  });

  const calculRight = (rest = 0) => ({
    array: buttons.slice(currentPage).slice(0, sideButtons + rest),
    rest() {
      return sideButtons - this.array.length;
    },
  });

  const leftButtons = calculLeft(calculRight().rest()).array;
  const rightButtons = calculRight(calculLeft().rest()).array;

  console.log({
    pagination: [...leftButtons],
    currentPage,
  });
};
createPagination({
  listLength: 600,
  perPage: 20,
  currentPage: 5,
  numberOfButtons: 30,
});
