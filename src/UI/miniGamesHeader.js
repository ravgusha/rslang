import menuIcon from './menuIcon';
import userIcon from './userName';

const gameHeader = document.createElement('header');
gameHeader.className = 'game-header';
gameHeader.append(userIcon);
gameHeader.append(menuIcon);

export default gameHeader;
