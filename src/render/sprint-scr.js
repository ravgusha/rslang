import { remainingPathColor } from '../app/sprint/timer';

function cls() {
  document.body.innerHTML = '';
}

const headerElement = `<div class="sprint-wrapper">
<header class="sprint-header">
<img src="../assets/images/svg/burger-sprint.svg" alt="menu" title="menu" class="sprint-menu-on">
  <div class="sprint-user">User: unregistered<img
  src="../assets/images/svg/sign-logo-sprint.svg"
  alt="sign-in"
  title="sign-in"
  class="sprint-sign-logo"
/></div>
</header>
<h2 class="sprint-title">sprint</h2>
<div class="sprint-info-wrapper">
<div><div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
    <path
    id="base-timer-path-remaining"
    stroke-dasharray="283"
    class="base-timer__path-remaining ${remainingPathColor}"
    d="
      M 50, 50
      m -45, 0
      a 45,45 0 1,0 90,0
      a 45,45 0 1,0 -90,0
    "
  ></path>
  </g>
</svg>
<span id="base-timer-label" class="base-timer__label">
 
</span>
  </div></div>
  
  <div class="sprint-series-wrapper"><div class="sprint-series">
    <div class="circle cr-default "></div>
    <div class="circle cr-default "></div>
    <div class="circle cr-default "></div>
    <div class="circle cr-default "></div>
  </div></div>
  
  <div class="sprint-score">Score: <span>0</span></div>
</div>
<div class="sprint-action-wrapper">
  <h3 class="sprint-word"></h3>
  <h4 class="sprint-translate"></h4>
  <div class="sprint-button-wrapper">
    <button class="spring-btn spring-wrong">No</button>
    <button class="spring-btn spring-correct">Yes</button>
  </div>
  <div class="spring-arrow-wrapper">
    <img src="../assets/images/svg/Arrow-L.svg" alt="arrow left">
    <img src="../assets/images/svg/Arrow-R.svg" alt="arrow right">
  </div>
</div>
</div>`;

const sprint = () => {
  cls();
  const sprintWrapper = document.createElement('div');
  sprintWrapper.classList.add('sprint-wrapper');
  sprintWrapper.innerHTML = headerElement;
  return sprintWrapper.innerHTML;
};

const renderSprint = {
  render: sprint(),
};
export default renderSprint;
