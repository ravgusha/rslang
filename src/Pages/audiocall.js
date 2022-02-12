import gameHeader from '../UI/miniGamesHeader';

const audiocall = () => {
  const container = document.createElement('div');
  container.className = 'audiocall-container';
  container.append(gameHeader);
  const title = document.createElement('h1');
  title.className = 'audiocall-title';
  title.innerHTML = 'Audio Challange';
  container.append(title);
  const button = document.createElement('button');
  button.className = 'audiocall-button';
  button.innerHTML = 'start';
  container.append(button);

  const icon = document.createElement('img');
  icon.className = 'audiocall-icon';
  icon.src = '../assets/images/svg/sound.svg';
  container.append(icon);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'audiocall-button-wrapper';
  container.append(buttonWrapper);
  for (let i = 0; i < 4; i += 1) {
    const option = document.createElement('button');
    option.className = 'audiocall-option-btn';
    option.innerHTML = `${i + 1}`;
    buttonWrapper.append(option);
  }
  container.append(buttonWrapper);
  document.body.appendChild(container);
  return document.body.innerHTML;
};

const renderAudiocall = {
  render: audiocall(),
};

export default renderAudiocall;
