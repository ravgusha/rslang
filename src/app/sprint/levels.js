import { GAME_STATE } from '../../Routing/routing';
import sprintRun from './sprint';

function getSprintLevel() {
  const levels = document.createElement('div');
  levels.classList.add('sprint-levels');
  levels.innerHTML = '<h2 class="sprint-level-title">choose sprint level</h2>';
  const levelBtnWrapper = document.createElement('div');
  levels.append(levelBtnWrapper);
  levelBtnWrapper.classList.add('level-btn-wrapper');

  for (let i = 0; i < 6; i++) {
    levelBtnWrapper.innerHTML += `<button class="sprint-level-btn" data-level="${i + 1}">Level ${i + 1}</button>`;
  }
  document.body.append(levels);
  if (document.querySelector('.preloader')) {
    document.querySelector('.preloader').classList.add('loaded');
  }
  levelBtnHndl();
}

export default getSprintLevel;

function levelBtnHndl() {
  if (document.querySelector('.level-btn-wrapper')) {
    document.querySelector('.level-btn-wrapper').addEventListener('click', (e) => {
      if (e.target.classList.contains('sprint-level-btn')) {
        GAME_STATE.sprintLevel = Number(e.target.getAttribute('data-level')) - 1;
        GAME_STATE.sprintPage = 0;
        localStorage.setItem('GAME_STATE', JSON.stringify(GAME_STATE));
        document.querySelector('.sprint-levels').remove();
        if (document.querySelector('.preloader')) {
          document.querySelector('.preloader').classList.remove('loaded');
        }
        sprintRun();
      }
    });
  }
}

export function getLevelFromEbook() {
  const currentEbookGroup = localStorage.getItem('group');
  const currentEbookPage = localStorage.getItem('page');
  GAME_STATE.sprintLevel = Number(currentEbookGroup);
  GAME_STATE.sprintPage = Number(currentEbookPage);

  localStorage.setItem('GAME_STATE', JSON.stringify(GAME_STATE));
  sprintRun();
}
