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
  <div class="timer">18</div>
  <div class="sprint-series-wrapper"><div class="sprint-series">
    <div class="circle cr-default cr1"></div>
    <div class="circle cr-default cr2"></div>
    <div class="circle cr-default cr3"></div>
    <div class="circle cr-default cr4"></div>
  </div></div>
  
  <div class="sprint-score">Score: <span>100</span></div>
</div>
</div>`;

const sprint = () => {
  cls();
  const sprintWrapper = document.createElement('div');
  sprintWrapper.classList.add('sprint-wrapper');
  sprintWrapper.innerHTML = headerElement;
  // document.body.appendChild(sprintWrapper);
  return sprintWrapper.innerHTML;
};

const renderSprint = {
  render: sprint(),
};
export default renderSprint;
