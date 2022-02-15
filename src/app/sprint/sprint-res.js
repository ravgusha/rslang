import roundResultElement from '../../render/sprin-res-el';

function resultRender() {
  const resWrapper = document.createElement('div');
  resWrapper.classList.add('res-wrapper');
  resWrapper.innerHTML = roundResultElement;
  document.body.append(resWrapper);
}

export default resultRender;
