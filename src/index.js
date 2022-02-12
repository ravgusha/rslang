// import axios from 'axios';
// import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
// import containerHtmlData from './render/main-screen';
import './styles/styles.scss';
import screenListener from './app/listener';
import Routing from './Routing/routing';

const Game = {
  mode: 'main', // available modes for example : main, main-menu, e-book, sprint, audiocall, stat
  authorized: false, // if false -> render 6 chapters in e-book / else 7 chapters
};
export default Game;
// renderMainScreen();
Routing();

window.onload = () => {
  screenListener();
};
