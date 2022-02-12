// import axios from 'axios';
// import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import screenListener from './app/listener';
import renderMainScreen from './render/main-screen';
import './styles/styles.scss';

const Game = {
  mode: 'main', // available modes for example : main, main-menu, e-book, sprint, audiocall, stat
  authorized: false, // if false -> render 6 chapters in e-book / else 7 chapters
};
export default Game;
renderMainScreen();
screenListener();
