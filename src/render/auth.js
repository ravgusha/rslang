const loginElement = document.createElement('div');
loginElement.classList.add('login-wrapper');

loginElement.innerHTML = `<form class="login-form">
<button class="login-form__close">X</button>
<img src="../assets/images/svg/lock.svg">
<div class="login-form__inputs">
<input name="email" class="login-form__email" type="email" placeholder="E-mail">
<input id="password" value="" name="password" class="login-form__password" type="password" placeholder="Password"></div>
<p class="login-form__error hidden">Wrong e-mail or password</p>
<button class="login-form__submit" type="submit">Sign in</button>
<a class="login-form__signup">Don't have an account? Sign Up</a>
</form>`;

function authOnRender() {
  document.body.appendChild(loginElement);
}

export default authOnRender;
