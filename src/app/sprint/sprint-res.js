import roundResultElement from '../../render/sprin-res-el';

// eslint-disable-next-line import/no-cycle
import sprintRun from './sprint';

function resultRender() {
  const resWrapper = document.createElement('div');
  resWrapper.classList.add('res-wrapper');
  resWrapper.innerHTML = roundResultElement;
  document.body.append(resWrapper);
  document.querySelector('.res-btn-repeat').addEventListener('click', () => {
  //  console.log('new round');
    resWrapper.remove();
    sprintRun();
  });
}

export default resultRender;
