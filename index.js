const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let = currentPlayer = CROSS
let size = 3
let gameOver = 0
let end = 0
const container = document.getElementById('fieldWrapper');
startGame();
addResetListener();
let pole = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
function startGame () {
    renderGrid(3);
}

function renderGrid (size) {
    container.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    if (pole[row][col] != EMPTY || gameOver) {
        return;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
    end += 1
    if (end === 9) {
        alert('Победила дружба');
        gameOver = 1;
        return;
    }
    if (currentPlayer == CROSS) {
        renderSymbolInCell(CROSS, row, col)
        currentPlayer = ZERO
        pole[row][col] = CROSS
    } else {
        renderSymbolInCell(ZERO, row, col)
        currentPlayer = CROSS
        pole[row][col] = ZERO
    }
    const result = checkWinner()
    if (result) {
        gameOver = 1;
        if (result === 'draw') {
            alert('Победила дружба')
        }
        else {
            alert(`Победил ${result.symbol}`)
            result.cells.forEach(([row, col]) => {
                renderSymbolInCell(result.symbol, row, col, 'red')});
        }
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}
function checkWinner() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const symbol = pole[row][col];
            if (symbol === EMPTY) continue;
            if (col + 2 < size && 
                pole[row][col+1] === symbol && 
                pole[row][col+2] === symbol) {
                return { symbol, cells: [[row, col], [row, col+1], [row, col+2]] };
            }
            if (row + 2 < size && 
                pole[row+1][col] === symbol && 
                pole[row+2][col] === symbol) {
                return { symbol, cells: [[row, col], [row+1, col], [row+2, col]] };
            }
            if (row + 2 < size && col + 2 < size &&
                pole[row+1][col+1] === symbol && 
                pole[row+2][col+2] === symbol) {
                return { symbol, cells: [[row, col], [row+1, col+1], [row+2, col+2]] };
            }
            if (row + 2 < size && col - 2 >= 0 &&
                pole[row+1][col-1] === symbol && 
                pole[row+2][col-2] === symbol) {
                return { symbol, cells: [[row, col], [row+1, col-1], [row+2, col-2]] };
            }
        }
    }

    // Ничья
    return getEmptyCells().length === 0 ? { symbol: 'draw' } : null;
}


function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    pole = [];
    currentPlayer = CROSS;
    gameOver = 0;
    end = 0;
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
          row.push(EMPTY);
          renderSymbolInCell(EMPTY, i, j)
        }
        pole.push(row);
      };
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
