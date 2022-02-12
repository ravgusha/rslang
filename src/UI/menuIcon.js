export const menuIcon = document.createElement('div');
menuIcon.className = 'menu-icon';
const span = document.createElement('span');
span.className = 'menu-span';
for (let i = 0; i <= 3; i++) {
    menuIcon.append(span);
}