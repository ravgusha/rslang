import Header from '../Pages/layout/header';
import Footer from '../Pages/layout/footer';

const renderMainScreen = {
  render: `
    <div class="wrapper">

      ${Header.render}

      <main class="main">
        <div class="main-top-wrapper">
          <div class="about pad">
            <h2>about</h2>
            <p>
              Fugit nobis voluptatibus obcaecati dicta optio! Ipsum! ipsum dolor, sit amet consectetur
              adipisicing elit. Omnis reprehenderit adipisci cupiditate ex voluptatem. Repellendus,
            int incidunt quia ab mollitia omnis, facere ex .
            </p>
          </div>
          <a class="audio-call pad" href="/#/audiocall">
            <h2>audiocall</h2>
            <span class="note">mini game</span>
            <img src="./assets/images/svg/audiocall.svg" alt="sprint-ico" class="game-ico" />
          </a>
          <a class="sprint pad" href="/#/sprint">
            <h2>sprint</h2>
            <span class="note">mini game</span>
            <img src="./assets/images/svg/sprint.svg" alt="sprint-ico" class="game-ico" />
          </a>
        </div>

        <div class="main-bottom-wrapper">
          <div class="e-book pad">
            <p class="main-wide-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis reprehenderit adipisci
              officia reiciendis impedit cupiditate ex voluptatem. Repellendus, a.
            </p>
            <a href="/#/ebook"><button class="button e-book-btn">E-book</button></a>
          </div>
          <div class="sign-in pad">
            <span class="sign-label">E-mail</span>
            <input type="email" placeholder="E-mail:" />
            <span class="sign-label">Password</span>
            <input type="password" placeholder="Password" />
            <button class="sign-btn">Sign in</button>
            <span class="btn-span">Not registered? Sign up</span>
          </div>
          <div class="team-wrapper pad">
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

      ${Footer.render}

    </div>`,
};
// function renderMainScreen() {
//   document.body.innerHTML = containerHtmlData;
// }
export default renderMainScreen;
