const userName = localStorage.getItem('userName');

const userIcon = document.createElement('div');
userIcon.className = 'user-icon';
if (userName) {
  userIcon.innerHTML = userName;
} else {
  userIcon.innerHTML = 'Guest';
}

export default userIcon;
