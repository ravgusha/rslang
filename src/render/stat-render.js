import { cls } from './sprint-scr';

const statContent = `
<div class="stat-wrapper">
<header class="sprint-header">
<img src="assets/images/svg/burger-sprint.svg" alt="menu" title="menu" class="sprint-menu-on" />
<div class="sprint-user">
  <span class="sprin-header-span">User: unregistered</span>
</div>
</header>
<div class="stat-cards">
<div class="stat sprint-stat">
<h2 class="stat-title">Sprint stats</h2>
<ul class="sprint-stat-list">
  <li class="stat-list-item">Number of rounds played <span>15</span></li>
  <li class="stat-list-item">Number of correct answers <span>4</span></li>
  <li class="stat-list-item">Max number of correct answers in a row <span>2</span></li>
  <li class="stat-list-item">Number of words added to learned <span>4</span></li>
</ul>
</div>
<div class="stat audio-stat">
<h2 class="stat-title">Audiochallenge stats</h2>
<ul class="audio-stat-list">
  <li class="stat-list-item">Number of rounds played <span>15</span></li>
  <li class="stat-list-item">Number of correct answers <span>4</span></li>
  <li class="stat-list-item">Number of words added to learned <span>2</span></li>
</ul>
</div>
<div class="stat ebook-stat">
<h2 class="stat-title">E-book stats</h2>
<ul>
  <li class="stat-list-item">Number of words added to learned <span>4</span></li>
  <li class="stat-list-item">Number of words added to difficult <span>4</span></li>
</ul>
</div>
</div>
</div>
`;

const stat = () => {
  cls();
  const statElement = document.createElement('div');
  statElement.classList.add('stat-wrapper');
  statElement.innerHTML = statContent;
  return statElement.innerHTML;
};

const renderStat = {
  render: stat(),
};
export default renderStat;
