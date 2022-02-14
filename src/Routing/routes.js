import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import errorPage from '../Pages/errorPage';
import renderAudiocall from '../Pages/audiocall';

export default [
  { path: '/', component: renderMainScreen },
  { path: '/ebook', component: renderEbookScreen },
  { path: '/error', component: errorPage },
  // { path: '/statistics', component: renderStatistics },
  { path: '/audiocall', component: renderAudiocall },
  // { path: '/sprint', component: renderSprint },
];
