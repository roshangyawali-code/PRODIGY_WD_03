// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleClick = (e) => {
        const cell = e.target;
        const index = cell.dataset.index;

        if (board[index] === "" && !checkWin()) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            if (checkWin()) {
                message.textContent = `${currentPlayer} WINS!`;
                highlightWinningCells();
            } else if (board.every(cell => cell !== "")) {
                message.textContent = "IT'S A DRAW!!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `PLAYER ${currentPlayer}'S TURN`;
            }
        }
    };

    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    };

    const highlightWinningCells = () => {
        winningCombinations.forEach(combination => {
            if (combination.every(index => board[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].classList.add('win');
                });
            }
        });
    };

    const restartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        message.textContent = `PLAYER ${currentPlayer}'S TURN`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o', 'win');
        });
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);

    message.textContent = `PLAYER ${currentPlayer}'S TURN`;
});
