import errorPage from '../Pages/errorPage';
import routes from './routes';
import eBookContent from '../app/e-book-content';
import screenListener from '../app/listener';
import sprintRun from '../app/sprint/sprint';
import { defineWords } from '../app/audiocall';

export const GAME_STATE = {
  mode: 'main',
  menu: false,
};

const Routing = () => {
// eslint-disable-next-line no-restricted-globals
  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

  const findComponentByPath = (path) => routes.find((r) => r.path.match(new RegExp(`^${path}$`))) || undefined;

  const router = () => {
    const path = parseLocation();
    const { component = errorPage } = findComponentByPath(path) || {};
    document.body.innerHTML = component.render;

    if (path === '/') {
      GAME_STATE.mode = 'main';
    }
    if (path === '/ebook') {
      GAME_STATE.mode = 'ebook';
      eBookContent();
    }
    if (path === '/sprint') {
      GAME_STATE.mode = 'sprint';
      sprintRun();
    }

    if (path === '/audiocall') {
      GAME_STATE.mode = 'audiocall';
      defineWords();
    }
    if (path === '/ebook/1') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '0');
      eBookContent();
    }
    if (path === '/ebook/2') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '1');
      eBookContent();
    }
    if (path === '/ebook/3') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '2');
      eBookContent();
    }
    if (path === '/ebook/4') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '3');
      eBookContent();
    }
    if (path === '/ebook/5') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '4');
      eBookContent();
    }
    if (path === '/ebook/6') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '5');
      eBookContent();
    }
    if (path === '/ebook/6') {
      GAME_STATE.mode = 'ebook';
      localStorage.setItem('group', '6');
      eBookContent();
    }
    localStorage.setItem('GAME_STATE', JSON.stringify(GAME_STATE));
    screenListener();
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

export default Routing;
