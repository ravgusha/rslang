import menuIcon from './menuIcon';
import userIcon from './userName';

const gameHeader = document.createElement('header');
gameHeader.className = 'game-header';
gameHeader.append(menuIcon);
gameHeader.append(userIcon);

export default gameHeader;
