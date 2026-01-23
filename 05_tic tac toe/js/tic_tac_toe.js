"use strict";

// flag: "pen-flag" = penguin's turn, "bear-flag" = bear's turn
let flag = "pen-flag"; // A

// Turn counter: Total 9 squares
let counter = 9; // C

// Get DOM elements for the squares
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// Get audio elements
const soundPenClick = document.getElementById("soundPenClick");
const soundBearClick = document.getElementById("soundBearClick");
const soundPenWin = document.getElementById("soundPenWin");
const soundBearWin = document.getElementById("soundBearWin");
const soundDraw = document.getElementById("soundDraw");

// Get New Game button
const playAgainBtn = document.getElementById("playAgain");

// Messages
const msgtxt1 =
  '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 =
  '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!</p>';
const msgtxt3 =
  '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__flash">Draw!!</p>';
const msgWinPen =
  '<p class="image animate__animated animate__bounce"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__tada">Penguins Win!</p>';
const msgWinBear =
  '<p class="image animate__animated animate__bounce"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__tada">WhiteBear Wins!</p>';

// Initialize when page loads
window.addEventListener(
  "DOMContentLoaded",
  function () {
    setMessage("pen-turn"); // Set initial message
  },
  false
);

// Play Again button click handler (using event delegation)
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "playAgain") {
    resetGame();
  }
});

// Click Events for Squares
a_1.addEventListener("click", () => {
  isSelect(a_1);
});
a_2.addEventListener("click", () => {
  isSelect(a_2);
});
a_3.addEventListener("click", () => {
  isSelect(a_3);
});
b_1.addEventListener("click", () => {
  isSelect(b_1);
});
b_2.addEventListener("click", () => {
  isSelect(b_2);
});
b_3.addEventListener("click", () => {
  isSelect(b_3);
});
c_1.addEventListener("click", () => {
  isSelect(c_1);
});
c_2.addEventListener("click", () => {
  isSelect(c_2);
});
c_3.addEventListener("click", () => {
  isSelect(c_3);
});

// Function runs when a square is clicked
function isSelect(selectSquare) {
  if (flag === "pen-flag") {
    // Penguin's turn logic
    selectSquare.classList.add("js-pen-checked");
    selectSquare.classList.add("js-unclickable");

    // Play penguin click sound
    soundPenClick.currentTime = 0;
    soundPenClick.play();

    // Switch turn to Bear
    flag = "bear-flag";
  } else {
    // Bear's turn logic
    selectSquare.classList.add("js-bear-checked");
    selectSquare.classList.add("js-unclickable"); // Disable click

    // Play bear click sound
    soundBearClick.currentTime = 0;
    soundBearClick.play();

    // Switch turn to Penguin
    flag = "pen-flag";
  }

  // Decrement counter
  counter--;

  // Check for Win (Priority 1)
  const winResult = checkWin();
  if (winResult) {
    // Disable all squares
    const squares = [a_1, a_2, a_3, b_1, b_2, b_3, c_1, c_2, c_3];
    squares.forEach((square) => {
      square.classList.add("js-unclickable");
    });

    // Highlight winning squares with colored border
    const winClass =
      winResult.winner === "pen-win" ? "js-win-pen" : "js-win-bear";
    winResult.squares.forEach((square) => {
      square.classList.add(winClass);
    });

    // Play win sound and show snow effect
    if (winResult.winner === "pen-win") {
      soundPenWin.currentTime = 0;
      soundPenWin.play();
      snow("pen-win");
    } else if (winResult.winner === "bear-win") {
      soundBearWin.currentTime = 0;
      soundBearWin.play();
      snow("bear-win");
    }

    // Display win message and show New Game button
    setMessage(winResult.winner);
    playAgainBtn.classList.remove("js-hidden");
    return;
  }

  // Check for Draw (Priority 2)
  if (counter === 0) {
    // Play draw sound
    soundDraw.currentTime = 0;
    soundDraw.play();

    // Display draw message and show New Game button
    setMessage("draw");
    playAgainBtn.classList.remove("js-hidden");
    return;
  }

  // Continue game - show next player's turn
  if (flag === "pen-flag") {
    setMessage("pen-turn");
  } else {
    setMessage("bear-turn");
  }
}

// Win Detection Function
function checkWin() {
  // Define all 8 winning combinations
  const winPatterns = [
    // Horizontal rows
    [a_1, a_2, a_3],
    [b_1, b_2, b_3],
    [c_1, c_2, c_3],
    // Vertical columns
    [a_1, b_1, c_1],
    [a_2, b_2, c_2],
    [a_3, b_3, c_3],
    // Diagonals
    [a_1, b_2, c_3],
    [a_3, b_2, c_1],
  ];

  // Check each winning pattern
  for (let pattern of winPatterns) {
    const [sq1, sq2, sq3] = pattern;

    // Check if all 3 squares have penguin's mark
    if (
      sq1.classList.contains("js-pen-checked") &&
      sq2.classList.contains("js-pen-checked") &&
      sq3.classList.contains("js-pen-checked")
    ) {
      return { winner: "pen-win", squares: pattern };
    }

    // Check if all 3 squares have bear's mark
    if (
      sq1.classList.contains("js-bear-checked") &&
      sq2.classList.contains("js-bear-checked") &&
      sq3.classList.contains("js-bear-checked")
    ) {
      return { winner: "bear-win", squares: pattern };
    }
  }

  return null; // No winner yet
}

// Message Switching Function
function setMessage(id) {
  const msgtext = document.getElementById("msgtext");

  switch (id) {
    case "pen-turn":
      msgtext.innerHTML = msgtxt1;
      break;
    case "bear-turn":
      msgtext.innerHTML = msgtxt2;
      break;
    case "pen-win":
      msgtext.innerHTML = msgWinPen;
      break;
    case "bear-win":
      msgtext.innerHTML = msgWinBear;
      break;
    case "draw":
      msgtext.innerHTML = msgtxt3;
      break;
    default:
      break;
  }
}

// Reset Game Function
function resetGame() {
  // Clear snow effect
  $(document).snowfall("clear");

  // Get all squares
  const squares = [a_1, a_2, a_3, b_1, b_2, b_3, c_1, c_2, c_3];

  // Clear all square classes
  squares.forEach((square) => {
    square.classList.remove("js-pen-checked");
    square.classList.remove("js-bear-checked");
    square.classList.remove("js-unclickable");
    square.classList.remove("js-win-pen");
    square.classList.remove("js-win-bear");
  });

  // Reset game state
  flag = "pen-flag";
  counter = 9;

  // Hide New Game button
  playAgainBtn.classList.add("js-hidden");

  // Set initial message back to penguin's turn
  setMessage("pen-turn");
}

function snow(winner) {
  // Set flake color based on winner
  let flakeColor;
  if (winner === "pen-win") {
    flakeColor = "rgb(255, 240, 245)"; // Pink/white for penguin
  } else if (winner === "bear-win") {
    flakeColor = "rgb(175, 238, 238)"; // Cyan for bear
  }

  $(document).snowfall({
    flakeColor: flakeColor,
    maxSpeed: 3,
    minSpeed: 1,
    maxSize: 20,
    minSize: 10,
    round: true,
  });
}