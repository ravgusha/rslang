export const audiocall = (user = null) => {
 const container = document.createElement('div');
 container.className = 'container';
 const title = container.createElement('h1');
 title.className = 'title';
 title.innerHTML = 'Aodio Challange';
 const button = container.createElement('button');
 button.className = 'button';
 button.innerHTML = 'start';
 const icon = container.createElement('img');
 icon.className = 'icon';
 icon.src = '../assets/images/svg/sound.svg';
 const buttonWrapper = document.createElement('div');
 buttonWrapper.className = 'button-wrapper';
 const option = document.createElement('button');
 option.className = 'option-btn';
 for (let i = 0; i <=4; i++) {
    option.innerHTML = `${word[i]}`;
    buttonWrapper.append(option);
 }
 document.body.append(container)
}