const items = [
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🫐",
  // "🍒",
  // "🍑",
  // "🥭",
  // "🍍",
  // "🥥",
  // "🥝",
];
const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const result = document.getElementById("result");
const balanceDisplay = document.getElementById("balance");
const stakeInput = document.getElementById("stakeInput");
let cells = [];
let balance = 1000;

function updateBalanceDisplay() {
  balanceDisplay.textContent = `Баланс: ${balance} злотих`;
}

function initializeGrid() {
  grid.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
    cells.push(cell);
  }
}

function startGame() {
  const stake = parseInt(stakeInput.value, 10);
  if (balance < stake) {
    alert("Недостатньо коштів для гри.");
    return;
  }

  balance -= stake;
  updateBalanceDisplay();
  result.textContent = "";

  cells.forEach((cell, index) => {
    setTimeout(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      cell.textContent = randomItem;
      cell.style.transform = "rotateY(360deg)";
      setTimeout(() => {
        cell.style.transform = "rotateY(0)";
      }, 300);
    }, index * 100);
  });

  setTimeout(() => checkForMatches(stake), 1200);
}

function checkForMatches(stake) {
  const checkMatch = (arr) =>
    arr.every(
      (cell) =>
        cell.textContent === arr[0].textContent && cell.textContent !== ""
    );

  let totalWin = 0;

  for (let row = 0; row < 3; row++) {
    const line = cells.slice(row * 3, row * 3 + 3);
    if (checkMatch(line)) {
      totalWin += (items.indexOf(line[0].textContent) + 1) * stake;
    }
  }

  for (let col = 0; col < 3; col++) {
    const line = [cells[col], cells[col + 3], cells[col + 6]];
    if (checkMatch(line)) {
      totalWin += (items.indexOf(line[0].textContent) + 1) * stake;
    }
  }

  const diag1 = [cells[0], cells[4], cells[8]];
  if (checkMatch(diag1)) {
    totalWin += (items.indexOf(diag1[0].textContent) + 1) * stake;
  }

  const diag2 = [cells[2], cells[4], cells[6]];
  if (checkMatch(diag2)) {
    totalWin += (items.indexOf(diag2[0].textContent) + 1) * stake;
  }

  balance += totalWin;
  updateBalanceDisplay();

  if (totalWin > 0) {
    result.textContent = `Ви виграли: ${totalWin} злотих!`;
  } else {
    result.textContent = "На жаль, виграшів немає.";
  }
}

startButton.addEventListener("click", startGame);
initializeGrid();
updateBalanceDisplay();
