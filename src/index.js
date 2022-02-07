import "./styles/main.scss";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min";
import axios from "axios";

const BASE_URL = "https://rslangteam.herokuapp.com";

const tabs = document.getElementById("tabs");
const contents = document.querySelectorAll(".content");

function chooseChapter(e) {
  const group = e.target.getAttribute("data-group");

  // Hide other contents
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
  // Display choosen content
  contents[group].classList.remove("hidden");

  // Down other tabs
  document.querySelector(".active").classList.remove("active");
  // Up choosen tab
  e.target.classList.add("active");

  getWords(group, 1);
}

tabs.addEventListener("click", (e) => {
  chooseChapter(e);
});

async function getWords(group, page) {
  const res = await axios(`${BASE_URL}/words?group=${group}&page=${page}}`);
  const data = await res.data;

  // contents[group].innerHTML = "";
  data.forEach((card) => {
    const { id } = card;
    const { image } = card;
    const { word } = card;
    const { transcription } = card;
    const audioTranscription = card.audio;
    const { audioMeaning } = card;
    const { audioExample } = card;
    const { textMeaning } = card;
    const { textExample } = card;
    // console.log(cardImage)

    contents[group].insertAdjacentHTML(
      "beforeend",
      `<div class="card" id=${id}>
      <img class="card__image" src="${BASE_URL}/${image}"/>
      <div class="card__text">
        <div class="card__header">
          <div class="card__header_left">
            <p class="card__word">${word}</p>
            <p class="card__transcription"> - ${transcription}</p>
          </div>
          <button class="card__audio">
          <audio class="card__audio-transcription" src="${BASE_URL}/${audioTranscription}"></audio>
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

getWords(0, 1);

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
