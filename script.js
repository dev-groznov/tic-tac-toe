const gameboard = (() => {
    let lastChange = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    let moveCount = 0;
    let currentTurn;

    function switchCurrentTurn() {
        currentTurn = (moveCount % 2 === 0) ? 'X' : '0';
    }

    function getGameboard() {
        for (let i = 0; i < 3; i++) {
            let row = '';
            for (let j = 0; j < 3; j++) {
                row += '|';
                row += lastChange[i][j];
            }
            row += '|';
            console.log(row);
        }
    }

    function isCellEmpty(x, y) {
        return (lastChange[x][y] === ' ') ? true : false;
    }

    function isRowsWin() {
        for (let i = 0; i < 3; i++) {
            if ((lastChange[i][0] != " ") && (lastChange[i][0] === lastChange[i][1]) && (lastChange[i][0] === lastChange[i][2])) {
                return true;
            }
        }
        return false;
    }

    function isColumnsWin() {
        for (let i = 0; i < 3; i++) {
            if ((lastChange[0][i] != " ") && (lastChange[0][i] === lastChange[1][i]) && (lastChange[0][i] === lastChange[2][i])) {
                return true;
            }
        }
        return false;
    }

    function isDiagonalsWin() {
        if ((lastChange[0][0] != " ") && (lastChange[0][0] === lastChange[1][1]) && (lastChange[0][0] === lastChange[2][2])) {
            return true;
        }
        if ((lastChange[0][2] != " ") && (lastChange[0][2] === lastChange[1][1]) && (lastChange[0][2] === lastChange[2][0])) {
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
                if (lastChange[i][j] === " ") {
                    return false
                }
            }
        }
        return true
    }

    const move = (x, y) => {
        switchCurrentTurn();

        if (isCellEmpty(x, y)) {
            lastChange[x][y] = currentTurn;

            if (isWin()) {
                console.log("Won ", (moveCount % 2 === 0) ? "X!" : "0!")
            }
            if (isDraw()) {
                console.log("Draw!")
            }

            moveCount += 1;
        } else {
            console.log("This cell is occupied")
        }

        return getGameboard();
    }

    return { move };
})();