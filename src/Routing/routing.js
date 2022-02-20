import errorPage from '../Pages/errorPage';
import routes from './routes';
import eBookContent from '../app/e-book-content';
import screenListener from '../app/listener';
import { defineWords } from '../app/audiocall';

const Routing = () => {
// eslint-disable-next-line no-restricted-globals
  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

  const findComponentByPath = (path) => routes.find((r) => r.path.match(new RegExp(`^${path}$`))) || undefined;

  const router = () => {
    const path = parseLocation();
    const { component = errorPage } = findComponentByPath(path) || {};
    document.body.innerHTML = component.render;
    if (path === '/ebook') { eBookContent(); }
    if (path === '/audiocall') { defineWords(); }
    if (path === '/ebook/1') {
      localStorage.setItem('group', '0');
      eBookContent();
    }
    if (path === '/ebook/2') {
      localStorage.setItem('group', '1');
      eBookContent();
    }
    if (path === '/ebook/3') {
      localStorage.setItem('group', '2');
      eBookContent();
    }
    if (path === '/ebook/4') {
      localStorage.setItem('group', '3');
      eBookContent();
    }
    if (path === '/ebook/5') {
      localStorage.setItem('group', '4');
      eBookContent();
    }
    if (path === '/ebook/6') {
      localStorage.setItem('group', '5');
      eBookContent();
    }
    if (path === '/ebook/6') {
      localStorage.setItem('group', '6');
      eBookContent();
    }

    screenListener();
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

export default Routing;
