'use strict';

// =============================================================================
// Game State
// =============================================================================
const MIN = 1;
const MAX = 100;

let targetNumber = 0;
let attempts = 0;
let previousGuesses = [];
let isGameOver = false;

// =============================================================================
// DOM Elements
// =============================================================================
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const attemptCount = document.getElementById('attemptCount');
const guessHistory = document.getElementById('guessHistory');
const playAgainBtn = document.getElementById('playAgainBtn');

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Generates a random integer between min and max (inclusive)
 * Formula: Math.floor(Math.random() * (max - min + 1)) + min
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Updates the feedback message and color styling
 */
function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = 'feedback-message';
  if (type) {
    feedback.classList.add(type);
  }
}

/**
 * Triggers a shake animation on the input field for invalid guesses
 */
function triggerShake() {
  guessInput.classList.remove('shake');
  void guessInput.offsetWidth; // Force CSS reflow
  guessInput.classList.add('shake');
}

// =============================================================================
// Core Game Logic
// =============================================================================

/**
 * Handles guess submission and validation
 */
function handleGuess(e) {
  e.preventDefault();
  if (isGameOver) return;

  const rawValue = guessInput.value.trim();
  const guess = Number(rawValue);

  // Validate: Check for empty, non-integer, or out-of-range values
  if (rawValue === '' || isNaN(guess) || !Number.isInteger(guess) || guess < MIN || guess > MAX) {
    setFeedback(`Please enter a valid number between ${MIN} and ${MAX}!`, 'warning');
    triggerShake();
    guessInput.select();
    return; // Do not increment attempt counter for invalid inputs
  }

  // Check for duplicate guesses
  if (previousGuesses.includes(guess)) {
    setFeedback(`You already guessed ${guess}! Try a different number.`, 'warning');
    triggerShake();
    guessInput.select();
    return;
  }

  // Track valid attempt in state
  attempts++;
  previousGuesses.push(guess);

  // Update UI stats
  attemptCount.textContent = attempts;
  guessHistory.textContent = previousGuesses.join(', ');

  // Conditionals: Compare guess with targetNumber
  if (guess === targetNumber) {
    // Win Condition
    isGameOver = true;
    const attemptText = attempts === 1 ? 'attempt' : 'attempts';
    setFeedback(`🎉 Correct! You guessed ${targetNumber} in ${attempts} ${attemptText}!`, 'correct');

    // Disable inputs upon winning
    guessInput.disabled = true;
    submitBtn.disabled = true;
    playAgainBtn.focus();
  } else if (guess < targetNumber) {
    // Too Low
    setFeedback(`📈 Too low! Try a number higher than ${guess}.`, 'too-low');
  } else {
    // Too High
    setFeedback(`📉 Too high! Try a number lower than ${guess}.`, 'too-high');
  }

  // Clear and re-focus input for next turn
  guessInput.value = '';
  if (!isGameOver) {
    guessInput.focus();
  }
}

/**
 * Resets the game state for a new round
 */
function resetGame() {
  // Generate a new random target number
  targetNumber = getRandomNumber(MIN, MAX);
  attempts = 0;
  previousGuesses = [];
  isGameOver = false;

  // Reset UI elements
  attemptCount.textContent = '0';
  guessHistory.textContent = 'None';
  setFeedback('Enter a number to start playing!');

  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = '';
  guessInput.classList.remove('shake');
  guessInput.focus();
}

// =============================================================================
// Event Listeners
// =============================================================================
guessForm.addEventListener('submit', handleGuess);
playAgainBtn.addEventListener('click', resetGame);

// Start game on page load
resetGame();
