'use strict';

/**
 *
 * we can always add classes (remove or add hidden) to classes on html files in order to hide elements from the ui.
 * We can also use the option toggle to switch properties within the players
 *
 *
 * there is a state variable (playing) it has a boolean value and it is very common.
 */

// Selecting elements

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const current0El = document.getElementById(`current--0`);
const score1El = document.getElementById(`score--1`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// action Switch players

const switchPlayers = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Initial conditions
let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let playing = true;

// Init function ------> very common and useful :)
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  btnRoll.classList.remove(`hidden`);
  btnHold.classList.remove(`hidden`);
  diceEl.classList.add(`hidden`);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);

  document.getElementById(`name--${activePlayer}`).textContent =
    activePlayer === 0 ? `player 1` : `player 2`;

  scores = [0, 0];
  activePlayer = 0;
  current = 0;
  playing = true;
};

init();
// rolling dice functionality

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Create a sandom number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice

    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //3. Check if the dice is 1
    if (dice !== 1) {
      // Add dice to the current score
      current += dice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      //   Switch players
      switchPlayers();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // Add current score to the Total score.
    scores[`${activePlayer}`] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    // Check if the score is > 100 if so
    if (scores[`${activePlayer}`] >= 20) {
      // Finish the game
      diceEl.classList.add(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `Winner !!!`;
    } else {
      // player wins otherwise switch players
      switchPlayers();
    }
  }
});

btnNew.addEventListener(`click`, init);
