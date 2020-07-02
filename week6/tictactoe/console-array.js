
var rows = 4;
var columns = 6;
var board = [];

for(var i = 0; i < rows; i++) {

    if(!board[i]) {
        board[i] = [];
    }

    for(var j = 0; j < columns; j++) {
        if (j % 2 == 0) {
            board[i][j] = 'x';
        } else {
            board[i][j] = 'o';
        }
        
    }

}

console.log(board)