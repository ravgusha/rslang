import renderEbookScreen from '../render/e-book';
import renderMainScreen from '../render/main-screen';
import errorPage from '../Pages/errorPage';
import renderAudiocall from '../Pages/audiocallPage';
import renderSprint from '../render/sprint-scr';
import renderStat from '../render/stat-render';

export default [
  { path: '/', component: renderMainScreen },
  { path: '/ebook', component: renderEbookScreen },
  { path: '/error', component: errorPage },
  { path: '/statistics', component: renderStat },
  { path: '/audiocall', component: renderAudiocall },
  { path: '/sprint', component: renderSprint },
  { path: '/ebook/1', component: renderEbookScreen },
  { path: '/ebook/2', component: renderEbookScreen },
  { path: '/ebook/3', component: renderEbookScreen },
  { path: '/ebook/4', component: renderEbookScreen },
  { path: '/ebook/5', component: renderEbookScreen },
  { path: '/ebook/6', component: renderEbookScreen },

];
