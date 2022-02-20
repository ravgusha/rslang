const menuElement = document.createElement('div');
menuElement.classList.add('menu-wrapper');

menuElement.innerHTML = `<button class="close-menu-btn"></button>
<ul class="menu-list">
  <a href="#/"><li class="menu-list-item"><img src="../assets/images/svg/home-logo.svg" alt="Home">Home</li></a>
  <a href="#/statistics"><li class="menu-list-item"><img src="../assets/images/svg/stat-logo.svg" alt="Stat">Stat</li></a>
  <a href="#/audiocall"><li class="menu-list-item"><img src="../assets/images/svg/audiocall.svg" alt="Audiocall">Audiocall</li></a>
  <a href="#/sprint"><li class="menu-list-item"><img src="../assets/images/svg/sprint.svg" alt="Sprint">Sprint</li></a>
  <a href="#/ebook"><li class="menu-list-item"><img src="../assets/images/png/book.png" alt="E-book">E-book </li></a>
  <ul class="e-book-chapters-list">
 <a href="#/ebook/1"><li data-group="0" class="e-book-chapters-list-item">Chapter 1</li></a>
 <a href="#/ebook/2"><li data-group="1" class="e-book-chapters-list-item">Chapter 2</li></a>
 <a href="#/ebook/3"><li data-group="2" class="e-book-chapters-list-item">Chapter 3</li></a>
 <a href="#/ebook/4"><li data-group="3" class="e-book-chapters-list-item">Chapter 4</li></a>
 <a href="#/ebook/5"><li data-group="4" class="e-book-chapters-list-item">Chapter 5</li></a>
 <a href="#/ebook/6"><li data-group="5" class="e-book-chapters-list-item">Chapter 6</li></a>
 <a href="#/ebook/d"><li data-group="6" class="e-book-chapters-list-item">Chapter 7</li></a>
  </ul>
</ul>`;

function menuOnRender() {
  document.body.appendChild(menuElement);
}

export default menuOnRender;
