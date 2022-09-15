
/**
   Game board:
 * The game board is an object - module 
 * Game board squares are assigned with coordinate values (123 + abc)
 * 
   Players:
 * Players are objects - factory
 * Making a move pushes coordinate values to two array properties
 * i.e. an array for x coordinates and an array for y coordinates
 * 
   Rounds:
 * A game state object with methods that run for each round?
 * The round logic checks the player object for the predefined winning conditions
 * Use conjunctions of array.includes() to check the arrays for the winning conditions
 * 
 */


const gameBoard = (function() {
    let gameBoardSquares = [];
    const xCoordinateArray = [1, 2, 3];
    const yCoordinateArray = ["A","B","C"];

    for (y = 0; y < yCoordinateArray.length; y++) {

        for (x = 0; x < xCoordinateArray.length; x++) {
            const boardSquare = {
                xCoordinate: xCoordinateArray[x],
                yCoordinate: yCoordinateArray[y],
            };
            gameBoardSquares.push(boardSquare);
        };
    };

    function getSquares() {
        console.table(gameBoardSquares);
    };

    return { getSquares };
})();

gameBoard.getSquares();