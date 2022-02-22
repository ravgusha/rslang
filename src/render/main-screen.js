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
            The applications allow you to learn English through games and a e-book. The student will be offered exercises of different difficulty levels. With the help of the app you will learn new words, master the correct pronunciation.
            </p>
          </div>
          <a class="audio-call pad" href="#/audiocall">
            <h2>audiocall</h2>
            <span class="note">mini game</span>
            <img src="./assets/images/svg/audiocall.svg" alt="sprint-ico" class="game-ico" />
          </a>
          <a class="sprint pad" href="#/sprint">
            <h2>sprint</h2>
            <span class="note">mini game</span>
            <img src="./assets/images/svg/sprint.svg" alt="sprint-ico" class="game-ico" />
          </a>
        </div>

        <div class="main-bottom-wrapper">
          <div class="e-book pad">
            <p class="main-wide-text">
            The e-book consists of six sections of increasing difficulty. Each word card includes an image, transcription, word translation, and pronunciation. There you can add words to compound words and mark them as learned.
            </p>
            <a href="#/ebook"><button class="button e-book-btn">E-book</button></a>
          </div>
          <div class="sign-in pad">
            <span class="sign-label">E-mail</span>
            <input class="sign-email" type="email" placeholder="E-mail:" />
            <span class="sign-label">Password</span>
            <input class="sign-password" type="password" placeholder="Password" />
            <p class="sign-error hidden">Wrong e-mail or password</p>
            <button class="sign-btn">Sign in</button>
            <span class="btn-span">Don't have an account?  <span>Sign Up</span>      </span>
          </div>
          <div class="team-wrapper pad">
            <h3 class="team-title">Dev Team</h3>
            <ul>
              <li>
                <img src="./assets/images/png/Asset 9300.png" alt="team member avatar" />
                <div class="team-member">
                  <h4>Sergey</h4>
                  <p class="team-member-text">
                  Project build. Sprint. Main screen styles. Stats.
                  </p>
                </div>
              </li>
              <li>
                <img src="./assets/images/png/Asset 10300.png" alt="team member avatar" />
                <div class="team-member">
                  <h4>Ravganiyat</h4>
                  <p class="team-member-text">
                    Authorization. E-book. Word list. Debugging. 
                  </p>
                </div>
              </li>
              <li>
                <img src="./assets/images/png/Asset 11300.png" alt="team member avatar" />
                <div class="team-member">
                  <h4>Natalia</h4>
                  <p class="team-member-text">
                  Design. Backend. Audiochallange. UI. Routing.
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
export default renderMainScreen;
