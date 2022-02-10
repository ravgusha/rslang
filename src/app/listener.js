import renderEbookScreen from '../render/e-book';
import eBookContent from './e-book-content';

function screenListener() {
  const screen = document.querySelector('.wrapper');
  screen.addEventListener('click', (event) => {
    const { classList } = event.target;
    if (classList.contains('e-book-btn')) {
      renderEbookScreen();
      eBookContent();
    }
  });
}
export default screenListener;
