const loginElement = document.createElement('div');
loginElement.classList.add('login-wrapper');

loginElement.innerHTML = `<form class="login-form">
<button class="login-form__close">X</button>
<img src="assets/images/svg/lock.svg">
<div class="login-form__inputs">
<input type="email" name="email" class="login-form__email"  placeholder="E-mail" required>
<input id="password" value="" name="password" class="login-form__password" type="password" placeholder="Password" required ></div>
<p class="login-form__error hidden">Wrong e-mail or password</p>
<button class="login-form__submit">Sign in</button>
<a class="login-form__signup">Don't have an account? <span class="login-form__link">Sign Up</span></a>
</form>`;

function authOnRender() {
  document.body.appendChild(loginElement);
}

export default authOnRender;
