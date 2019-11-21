const values = ['one', 'two', 'three', 'four', 'five', 'six'];
const specialValues = ['ship', 'ship', 'ship', 'yellow', 'green', 'blue'];

let dices = null;
let special = null;
let red = null;
let white = null;
let rollButton = null;

const init = () => {
  dices = document.getElementsByClassName('dice');
  special = document.getElementById('special');
  red = document.getElementById('red');
  white = document.getElementById('white');
  rollButton = document.getElementById('roll');
};

const getDiceValue = () => {
  const i = Math.floor(Math.random() * Math.floor(values.length));
  return values[i];
};

const getSpecialValue = () => {
  const i = Math.floor(Math.random() * Math.floor(specialValues.length));
  return specialValues[i];
};

const throwDices = () => {
  for (let dice of dices) {
    dice.classList.add('flipped');
    let newDiceValue;
    if (dice.id === 'special') newDiceValue = getSpecialValue();
    else newDiceValue = getDiceValue();
    dice.querySelector(
      '.front'
    ).style.backgroundImage = `url('./assets/icons/${newDiceValue}.png')`;
    setTimeout(() => dice.classList.add('spin'), 500);
    setTimeout(() => dice.classList.remove('flipped'), 2000);
    setTimeout(() => dice.classList.remove('spin'), 2000);
  }
};

window.onload = () => {
  init();

  rollButton.addEventListener('click', () => throwDices(dices));
};
