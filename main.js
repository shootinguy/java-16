const player_red = "R";
const player_black = "B";
const rows = 6;
const columns = 7;
let current_player = player_red;
let game_over = false;
let board;
let current_columns = [];

window.onload = function() {
    set_game();
}

function set_game() {
    board = [];
    current_columns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        const row = [];

        for (let c = 0; c < columns; c++) {
            row.push("");
            
            const tile = document.createElement("div");
            tile.id = `tile_${r}_${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", set_piece);
            document.querySelector("#board").append(tile);
        }

        board.push(row);
    }
}

function set_piece() {
    if (game_over) { return; }

    const coords = this.id.replace("tile_", "").split("_");
    let r = parseInt(coords[0]);
    const c = parseInt(coords[1]);

    r = current_columns[c];

    if (r < 0) { return; }

    board[r][c] = current_player;
    const tile = document.querySelector(`#tile_${r}_${c}`);

    if (current_player === player_red) {
        tile.classList.add("red_piece");
        current_player = player_black;
    } else {
        tile.classList.add("black_piece");
        current_player = player_red;
    }

    current_columns[c] = r - 1;
    check_winner();
}

function check_winner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== "" &&
                board[r][c] === board[r][c+1] &&
                board[r][c+1] === board[r][c+2] &&
                board[r][c+2] === board[r][c+3]
            ) {
                set_winner(r, c);
                return;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== "" &&
                board[r][c] === board[r+1][c] &&
                board[r+1][c] === board[r+2][c] &&
                board[r+2][c+2] === board[r+3][c]
            ) {
                set_winner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== "" &&
                board[r][c] === board[r+1][c+1] &&
                board[r+1][c+1] === board[r+2][c+2] &&
                board[r+2][c+2] === board[r+3][c+3]
            ) {
                set_winner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== "" &&
                board[r][c] === board[r-1][c+1] &&
                board[r-1][c+1] === board[r-2][c+2] &&
                board[r-2][c+2] === board[r-3][c+3]
            ) {
                set_winner(r, c);
                return;
            }
        }
    }
}

function set_winner(r, c) {
    const winner = document.querySelector("#winner");
    winner.innerText = (board[r][c] === player_red ? "Red Wins" : "Black Wins");
    game_over = true;
}
