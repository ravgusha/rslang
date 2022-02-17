import menuOnRender from '../render/menu';
import authOnRender from '../render/auth';
import formLogin from '../auth/authorization';

function menuOnHndl() {
  const menu = document.querySelector('.menu-on') || document.querySelector('.sprint-menu-on');
  if (menu) {
    menu.addEventListener('click', () => {
      menuOnRender();
      closeMenu();
    });
  }
}

function authHndl() {
  const auth = document.querySelector('.to-logout') || document.querySelector('.sprint-user');

  if (auth) {
    auth.addEventListener('click', () => {
      authOnRender();
      closeAuth();
      formLogin();
    });
  }
}

// function loginHndl() {
//   const login = document.querySelector('.login-form__submit');

//   if (login) {
//     login.addEventListener('click', () => {
//       const email = document.querySelector('.login-form__email').value;
//       const password = document.querySelector('.login-form__password').value;

//       const user = {
//         email: `${email}`,
//         password: `${password}`,
//       };

//       loginUser(user);
//     });
//   }
// }

function screenListener() {
  menuOnHndl();
  authHndl();
}

export function closeMenu() {
  document.querySelector('.close-menu-btn').addEventListener('click', () => {
    if (document.querySelector('.menu-wrapper')) {
      document.querySelector('.menu-wrapper').remove();
    }
  });
}

export function closeAuth() {
  document.querySelector('.login-form__close').addEventListener('click', () => {
    if (document.querySelector('.login-wrapper')) {
      document.querySelector('.login-wrapper').remove();
    }
  });
}

export default screenListener;
