// import axios from 'axios';
// import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
// import containerHtmlData from './render/main-screen';
import errorPage from './Pages/errorPage';
import './styles/styles.scss';
import routes from './routes';
import screenListener from './app/listener';
// eslint-disable-next-line no-restricted-globals
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path) => routes.find((r) => r.path.match(new RegExp(`^${path}$`))) || undefined;

const router = () => {
  const path = parseLocation();
  const { component = errorPage } = findComponentByPath(path) || {};
  document.body.innerHTML = component.render;
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

const Game = {
  mode: 'main', // available modes for example : main, main-menu, e-book, sprint, audiocall, stat
  authorized: false, // if false -> render 6 chapters in e-book / else 7 chapters
};
export default Game;
// renderMainScreen();
window.onload = () => {
  screenListener();
};
