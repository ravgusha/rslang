import errorPage from '../Pages/errorPage';
import routes from './routes';

const Routing = () => {
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
};

export default Routing;
