const containerHtmlData = `
<div class="wrapper">
  <div class="header">
    <h1 class="main-title">
      Play with
      <span>English</span>
    </h1>
    <div class="nav">
      <div class="to-main"></div>
      <div class="to-statistic"></div>
      <div class="to-logout"></div>
    </div>
  </div>
  <main class="main">
    <div class="main-top-wrapper">
      <div class="about">
        <h2>about</h2>
        <p>
          Fugit nobis voluptatibus obcaecati dicta optio! Ipsum! ipsum dolor, sit amet consectetur
          adipisicing elit. Omnis reprehenderit adipisci cupiditate ex voluptatem. Repellendus,
          fghgh ffgfghf accusamus veniam sint incidunt quia ab mollitia omnis, facere ex .
        </p>
      </div>
      <div class="audio-call">
        <h2>audiocall</h2>
        <span class="note">mini game</span>
        <img src="./assets/images/svg/audiocall.svg" alt="sprint-ico" class="game-ico" />
      </div>
      <div class="sprint">
        <h2>sprint</h2>
        <span class="note">mini game</span>
        <img src="./assets/images/svg/sprint.svg" alt="sprint-ico" class="game-ico" />
      </div>
    </div>

    <div class="main-bottom-wrapper">
      <div class="e-book">
        <p class="main-wide-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis reprehenderit adipisci
          officia reiciendis impedit cupiditate ex voluptatem. Repellendus, a.
        </p>
        <button class="button">E-book</button>
      </div>
      <div class="sign-in">
        <span class="sign-label">E-mail</span>
        <input type="email" placeholder="E-mail:" />
        <span class="sign-label">Password</span>
        <input type="password" placeholder="Password" />
        <button class="sign-btn">Sign in</button>
        <span class="btn-span">Not registered? Sign up</span>
      </div>
      <div class="team-wrapper">
        <h3 class="team-title">Dev Team</h3>
        <ul>
          <li>
            <img src="./assets/images/png/Asset 9300.png" alt="team member avatar" />
            <div class="team-member">
              <h4>Sergey</h4>
              <p class="team-member-text">
                Lorem ipsum ipsum amet conse ctetur amet consectetur adipisicing elit.
              </p>
            </div>
          </li>
          <li>
            <img src="./assets/images/png/Asset 10300.png" alt="team member avatar" />
            <div class="team-member">
              <h4>Ravganiyat</h4>
              <p class="team-member-text">
                Lorem ipsum ipsum amet conse ctetur amet consectetur adipisicing elit.
              </p>
            </div>
          </li>
          <li>
            <img src="./assets/images/png/Asset 11300.png" alt="team member avatar" />
            <div class="team-member">
              <h4>Natalia</h4>
              <p class="team-member-text">
                Lorem ipsum ipsum amet conse ctetur amet consectetur adipisicing elit.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>

  <footer class="footer">
    <a href="#"><img class="rs-logo" src="./assets/images/svg/school-logo.svg" alt="rs logo" /></a>
    <div class="gh-links">
      <a href="#"><img src="./assets/images/svg/gh-logo.svg" alt="gh logo" />sergeykagal</a>
      <a href="#"><img src="./assets/images/svg/gh-logo.svg" alt="gh logo" />ravgusha</a>
      <a href="#"><img src="./assets/images/svg/gh-logo.svg" alt="gh logo" />angietune</a>
    </div>
  </footer>
</div>`;
function renderMainScreen() {
  document.body.innerHTML = containerHtmlData;
}
export default renderMainScreen;
