import gameHeader from '../UI/miniGamesHeader';

const audiocall = () => {
  const gameWrapper = document.createElement('div');
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

  const progress = document.createElement('div');
  progress.className = 'audiocall-progress off';
  progress.innerHTML = '0/20';
  container.append(progress);

  const icon = document.createElement('div');
  icon.className = 'audiocall-icon off';
  container.append(icon);

  const audiotag = document.createElement('audio');
  audiotag.className = 'audiotag';
  icon.append(audiotag);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'audiocall-button-wrapper off';
  for (let i = 0; i <= 3; i++) {
    const option = document.createElement('button');
    option.className = 'audiocall-option-btn';
    option.innerHTML = ' ';
    buttonWrapper.append(option);
  }

  container.append(buttonWrapper);
  gameWrapper.append(container);
  return gameWrapper.innerHTML;
};

const renderAudiocall = {
  render: audiocall(),
};

export default renderAudiocall;
