const board = document.getElementById('board');
const cells = document.getElementsByClassName('cell');
const reset = document.getElementById('reset');
const status = document.createElement('p');
let player = 'X';

const checkWin = () => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[b].innerText === cells[c].innerText) {
            status.innerText = `Player ${player} wins!`;
            board.appendChild(status);
            return true;
        }
    }

    return false;
};

const checkDraw = () => {
    let count = 0;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText) {
            count++;
        }
    }

    if (count === cells.length) {
        status.innerText = 'Draw!';
        board.appendChild(status);
        return true;
    }

    return false;
};

const handleClick = (event) => {
    if (!event.target.innerText) {
        event.target.innerText = player;
        if (checkWin() || checkDraw()) {
            for (let i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', handleClick);
            }
            return;
        }
        player = player === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    status.innerText = '';
    player = 'X';
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleClick);
    }
};

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

reset.addEventListener('click', resetGame);
