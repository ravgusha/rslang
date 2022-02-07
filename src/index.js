import './styles/main.scss';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
// import axios from 'axios';

const tabs = document.getElementById('tabs');
const contents = document.querySelectorAll('.content');

function chooseChapter(e, page) {
  // const color = e.target.style.backgroundColor;
  const group = e.target.getAttribute('data-group');
  contents.forEach((content) => {
    content.classList.add('hidden');
  });
  document.querySelector('.active').classList.remove('active');
  // document.querySelector('.hidden').classList.remove('hidden');
  contents[group].classList.remove('hidden');

  e.target.classList.add('active');
}

tabs.addEventListener('click', (e) => {
  // console.log(e, group)
  chooseChapter(e);
});
