/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { token, userId } from '../auth/authorization';
import BASE_URL from '../constants';
import { getUser } from '../render/stat-render';
import { saveState } from './sprint/end-round';
import { sprintStat } from './sprint/sprint';

async function statDataWrite() {
  if (getUser() === 'unregistered') {
    const showUnreg = document.createElement('div');
    showUnreg.classList.add('unreg');
    showUnreg.textContent = 'to display statistics, register or login';
    document.querySelector('.stat-cards').innerHTML = '';
    document.querySelector('.stat-cards').append(showUnreg);
  } else {
    // eslint-disable-next-line no-shadow
    const sprintStat = JSON.parse(localStorage.getItem('sprintStat'));

    document.querySelector('.sprin-header-span').textContent = `User: ${getUser()}`;
    if (sprintStat) {
      document.querySelector('.sprint-nrp').textContent = sprintStat.rounds;
      document.querySelector('.sprint-nca').textContent = sprintStat.rightAnswers.length;
      document.querySelector('.sprint-ncar').textContent = sprintStat.maxSeries;
      document.querySelector('.sprint-nwal').textContent = sprintStat.learned.length;
    }

    await countWords();
    if (wordsStat) {
      document.querySelector('.ebook-nwal').textContent = wordsStat.numberOfLearnt;
      document.querySelector('.ebook-nwadf').textContent = wordsStat.numberOfDifficult;
    }
  }
}
export default statDataWrite;

const wordsStat = { numberOfDifficult: 0, numberOfLearnt: 0 };

async function countWords() {
  const resDiff = await axios(
    `${BASE_URL}/users/${userId}/aggregatedWords?&filter={"userWord.difficulty":"hard"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const numberOfDifficult = await resDiff.data[0].totalCount[0].count;
  wordsStat.numberOfDifficult = numberOfDifficult;

  const resLearnt = await axios(
    `${BASE_URL}/users/${userId}/aggregatedWords?&filter={"userWord.optional.status":"isLearnt"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const numberOfLearnt = await resLearnt.data[0].totalCount[0].count;
  wordsStat.numberOfLearnt = numberOfLearnt;

  localStorage.setItem('wordsStat', JSON.stringify(wordsStat));
}

export async function loadSprintStatRequest() {
  const userID = localStorage.getItem('userId');
  const request = await axios(
    `${BASE_URL}/users/${userID}/statistics`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const loadedSprintStat = request.data.optional.sprinStat;

  for (const key in loadedSprintStat) {
    sprintStat[key] = loadedSprintStat[key];
  }
  saveState();
}
