const gameboard = (() => {
    let gameState = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    let moveCount = 0;

    const getGameState = () => gameState
    
    const getCurrentTurn = () => (moveCount % 2 === 0) ? 'X' : '0';
    
    function isCellEmpty(x, y) {
        return (gameState[x][y] === ' ') ? true : false;
    }

    function isRowsWin() {
        for (let i = 0; i < 3; i++) {
            if ((gameState[i][0] != " ") && (gameState[i][0] === gameState[i][1]) && (gameState[i][0] === gameState[i][2])) {
                return true;
            }
        }
        return false;
    }

    function isColumnsWin() {
        for (let i = 0; i < 3; i++) {
            if ((gameState[0][i] != " ") && (gameState[0][i] === gameState[1][i]) && (gameState[0][i] === gameState[2][i])) {
                return true;
            }
        }
        return false;
    }

    function isDiagonalsWin() {
        if ((gameState[0][0] != " ") && (gameState[0][0] === gameState[1][1]) && (gameState[0][0] === gameState[2][2])) {
            return true;
        }
        if ((gameState[0][2] != " ") && (gameState[0][2] === gameState[1][1]) && (gameState[0][2] === gameState[2][0])) {
            return true;
        }
        return false;
    }

    function isWin() {
        return isRowsWin() || isColumnsWin() || isDiagonalsWin();
    }
    
    function isDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameState[i][j] === " ") {
                    return false
                }
            }
        }
        return true
    }

    const move = (x, y) => {
        if (isCellEmpty(x, y)) {
            gameState[x][y] = getCurrentTurn();
            moveCount += 1;

            if (isWin()) {
                return "Won " + ((moveCount % 2 === 1) ? "X!" : "0!")
            } else if (isDraw() && !isWin()) {
                return "Draw!"
            } else {
                return ""
            }
        } else {
            return "This cell is occupied! "
        }
    }

    return { getGameState , getCurrentTurn , move };
})();

const ScreenController = (() => {
    const gameState = gameboard.getGameState();
    const comment = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateComment = (text) => {
        if (comment.textContent !== "Draw!" && !comment.textContent.includes("Won")) {
            if (text === "Draw!" || text.includes("Won")) {
                comment.textContent = text
            }
            else {
                comment.textContent = text + gameboard.getCurrentTurn() + "'s turn";
            }
        }
    }

    const updateBoard = () => {
        boardDiv.textContent = "";
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.textContent = gameState[i][j];
                boardDiv.appendChild(cellButton);

                cellButton.addEventListener('click', () => clickHandlerCell(i, j));
            }
        }
    }

    function clickHandlerCell(x, y) {
        round = gameboard.move(x, y);
        updateComment(round);
        updateBoard();
    }

    updateComment("");
    updateBoard();
})();