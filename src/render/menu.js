const menuElement = document.createElement('div');
menuElement.classList.add('menu-wrapper');

menuElement.innerHTML = `<button class="close-menu-btn"></button>
<ul class="menu-list">
  <li class="menu-list-item"><img src="../assets/images/svg/home-logo.svg" alt="Home">Home</li>
  <li class="menu-list-item"><img src="../assets/images/svg/stat-logo.svg" alt="Stat">Stat</li>
  <li class="menu-list-item"><img src="../assets/images/svg/audiocall.svg" alt="Audiocall">Audiocall</li>
  <li class="menu-list-item"><img src="../assets/images/svg/sprint.svg" alt="Sprint">Sprint</li>
  <li class="menu-list-item"><img src="../assets/images/png/book.png" alt="E-book">E-book </li>
  <ul class="e-book-chapters-list">
<li class="e-book-chapters-list-item">Chapter 1</li>
<li class="e-book-chapters-list-item">Chapter 2</li>
<li class="e-book-chapters-list-item">Chapter 3</li>
<li class="e-book-chapters-list-item">Chapter 4</li>
<li class="e-book-chapters-list-item">Chapter 5</li>
<li class="e-book-chapters-list-item">Chapter 6</li>
<li class="e-book-chapters-list-item">Chapter 7</li>
  </ul>
</ul>`;

function menuOnRender() {
  document.body.appendChild(menuElement);
}

export default menuOnRender;
