# Number Guessing Game

A clean, interactive Number Guessing Game built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. The player tries to guess a randomly generated number between 1 and 100 with real-time higher/lower feedback and attempt tracking.

---

## 1. Approach

The application was built following a lightweight, three-file modular architecture:

1. **Structure (`index.html`):**
   - Clean, semantic HTML5 markup.
   - Form controls with a numeric input field (`min="1"`, `max="100"`), submit button, feedback banner, attempt counter, guess history display, and a reset button.

2. **Styling (`style.css`):**
   - Modern, responsive dark card design with CSS variables.
   - Distinct feedback colors: **Blue** for *Too Low*, **Red** for *Too High*, **Green** for *Correct*, and **Yellow** for *Out-of-range warnings*.
   - Subtle shake animation for invalid inputs.

3. **Logic (`script.js`):**
   - **State Management:** Tracks `targetNumber`, `attempts`, `previousGuesses`, and `isGameOver`.
   - **Randomization:** Uses `Math.floor(Math.random() * (max - min + 1)) + min`.
   - **Validation:** Intercepts invalid, empty, or out-of-range entries before evaluating against the secret number (does not waste an attempt).
   - **Conditionals:** Compares user input against the secret target to output higher/lower hints.
   - **State Reset:** Resets all state variables, clears inputs, and restores initial UI.

---

## 2. Outcome

All assessment deliverables have been successfully implemented:

| Feature | Assessment Deliverable | Status |
| :--- | :--- | :--- |
| **Random Target Number** | Generated within range 1 to 100 | Completed |
| **Higher/Lower Feedback** | Real-time hints guide the player on each guess | Completed |
| **Attempt Counter** | Accurately tracks valid attempts | Completed |
| **Play Again Button** | Resets game state without reloading the page | Completed |
| **Input Validation** | Prevents out-of-range or duplicate guesses | Completed |

---

## 3. Deployment Configuration

Since this is a client-side static web application with zero external dependencies, it can be deployed anywhere with no build step required.

### Option A: Local Run
- Open `index.html` directly in any web browser (Chrome, Edge, Firefox), or run a lightweight local server:
  ```bash
  # Using Python
  python -m http.server 3000
  ```
  Open `http://localhost:3000` in your browser.

### Option B: GitHub Pages
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Number Guessing Game"
   ```
2. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. Go to **Repository Settings > Pages**.
4. Under **Source**, select `Deploy from a branch` -> `main` / `/ (root)` and click **Save**.
5. Your game will be live at: `https://<your-username>.github.io/<repo-name>/`.

### Option C: Vercel / Netlify
- Drag and drop the project folder directly into the [Vercel Dashboard](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop).

---

## 4. Rollback Evidence & Plan

To ensure code stability during assessment iterations, version control tracking and rollback procedures are established:

### Rollback Strategy
1. **Commit History Tracking:** Every major change (e.g., UI adjustments, removing non-essential modules) is recorded with descriptive commit messages.
2. **One-Command Rollback:** If an issue is discovered, restore the previous working state using Git:
   ```bash
   # View commit history
   git log --oneline

   # Rollback to the previous commit
   git revert HEAD --no-edit

   # Or hard reset to a known stable commit hash
   git reset --hard <stable-commit-hash>
   ```
3. **Verification Checklist after Rollback:**
   - [ ] Page loads with card layout centered.
   - [ ] Target number is generated between 1 and 100.
   - [ ] Out-of-range input (e.g., `150`) shows warning and does not count as an attempt.
   - [ ] Higher/lower feedback updates accurately.
   - [ ] "Play Again" button resets attempts and generates a new target.

---

## 5. Interview Questions & Answers

### Q1: How would you generate a random integer in a range?
**Answer:**
```javascript
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
```
- `Math.random()` returns a floating-point number from `0` (inclusive) up to `1` (exclusive).
- Multiplying by `(max - min + 1)` scales the range to `[0, span)`.
- `Math.floor()` rounds down to the nearest whole integer.
- Adding `min` shifts the range to start at `min` and end at `max`.

---

### Q2: How would you give feedback for an out-of-range guess?
**Answer:**
Validate the input before comparing it against the secret number:
```javascript
if (guess < min || guess > max) {
  setFeedback(`Please enter a number between ${min} and ${max}!`, 'warning');
  triggerShake();
  return; // Stop execution: do not count this as an attempt
}
```
This gives immediate visual feedback without penalizing the player's attempt counter.

---

### Q3: How would you reset the game state?
**Answer:**
Create a dedicated reset function that restores initial state and UI:
```javascript
function resetGame() {
  targetNumber = getRandomNumber(min, max); // Generate new target
  attempts = 0;                             // Reset counter
  previousGuesses = [];                     // Clear guess history
  isGameOver = false;                       // Reset game status
  
  // Reset DOM elements
  attemptCount.textContent = '0';
  guessHistory.textContent = 'None';
  feedback.textContent = 'Enter a number to start playing!';
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = '';
  guessInput.focus();
}
```
This allows the player to start a fresh round without reloading the webpage.
