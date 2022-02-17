import menuOnRender from '../render/menu';

function menuOnHndl() {
  const menu = document.querySelector('.menu-on') || document.querySelector('.sprint-menu-on');
  if (menu) {
    menu.addEventListener('click', () => {
      menuOnRender();
      closeMenu();
    });
  }
}

function screenListener() {
  menuOnHndl();
}
export default screenListener;

export function closeMenu() {
  document.querySelector('.close-menu-btn').addEventListener('click', () => {
    if (document.querySelector('.menu-wrapper')) {
      document.querySelector('.menu-wrapper').remove();
    }
  });
}
