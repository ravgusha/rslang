import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import errorPage from '../Pages/errorPage';
<<<<<<< HEAD
import renderAudiocall from '../Pages/audiocallPage';
=======
import renderAudiocall from '../Pages/audiocall';
import renderSprint from '../render/sprint-scr';
>>>>>>> d5bed99cce0c84a75b6f3f8a3bb84dc79225ce84

export default [
  { path: '/', component: renderMainScreen },
  { path: '/ebook', component: renderEbookScreen },
  { path: '/error', component: errorPage },
  // { path: '/statistics', component: renderStatistics },
  { path: '/audiocall', component: renderAudiocall },
  { path: '/sprint', component: renderSprint },
];
