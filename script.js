const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);

const wiiningMessageButton = document.querySelector(
  "[data-winner-message-button]"
);

const winningMessage = document.querySelector("[data-winning-message]");
let isCircleTurn;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerText = "Empate!";
  } else {
    winningMessageText.innerText = isCircleTurn ? "Circulo Venceu" : "X Venceu";
  }
  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (e) => {
  // colocar x ou circulo
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);
  //verificar por vitória
  const isWin = checkForWin(classToAdd);

  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    //mudar simbolo
    swapTurns();
  }
};

startGame();

wiiningMessageButton.addEventListener("click", startGame);
