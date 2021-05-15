"use strict";

// Element Selectors
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const diceImg = document.querySelector(`.dice`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);
const currentScore0El = document.querySelector(`#current--0`);
const currentScore1El = document.querySelector(`#current--1`);

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceImg.classList.add(`hidden`);
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//switch player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//dice roll button functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove(`hidden`);
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold score button + winning game functionality
btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      //Finish the game
      playing = false;
      diceImg.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //Switch players if not
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, function () {
  //allow playing again
  playing = true;

  //remove winner from active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);

  //reset conditions to initial starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceImg.classList.add(`hidden`);

  //make active player go back to starting conditions
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--active`);
});
