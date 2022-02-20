function checkBoxLsnrOn() {
  const soundBtn = document.querySelector('#sound-onOff');
  const soundIsOn = JSON.parse(localStorage.getItem('soundOn'));
  if (soundIsOn) {
    soundBtn.checked = true;
  } else {
    soundBtn.checked = false;
  }

  if (soundBtn) {
    soundBtn.addEventListener('change', checkBoxHndl);
  }
}

function checkBoxHndl() {
  const soundBtn = document.querySelector('#sound-onOff');
  localStorage.setItem('soundOn', `${soundBtn.checked}`);
}

export default checkBoxLsnrOn;
