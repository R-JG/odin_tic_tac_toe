
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

const winScenarios = {
    horizontalA: ["A1", "A2", "A3"],
    horizontalB: ["B1", "B2", "B3"],
    horizontalC: ["C1", "C2", "C3"],
    verticalOne: ["A1", "B1", "C1"],
    verticalTwo: ["A2", "B2", "C2"],
    verticalThree: ["A3", "B3", "C3"],
    diagonalFirst: ["A1", "B2", "C3"],
    diagonalSecond: ["A3", "B2", "C1"],
}
// is there a way to constrain the possible win scenarios based on the coordinates of a given square object?


const newPlayer = function() {
    let moves = [];
    return { moves };
}


const gameBoard = (function() {

    let gameBoardSquares = [];
    const xCoordinateArray = [1, 2, 3];
    const yCoordinateArray = ["A","B","C"];

    for (let y = 0; y < yCoordinateArray.length; y++) {

        for (let x = 0; x < xCoordinateArray.length; x++) {
            const boardSquare = {
                xCoordinate: xCoordinateArray[x],
                yCoordinate: yCoordinateArray[y],
            };
            gameBoardSquares.push(boardSquare);
        };
    };

    function createDisplay() {

        const gameBoardElement = document.querySelector("#game-board");

        for (let i = 0; i < gameBoardSquares.length; i++) {
            const boardSquareElement = document.createElement("div");
            boardSquareElement.classList.add("board-square");
   
            boardSquareElement.addEventListener("click", (e) => {
                playerMove(playerOne, gameBoardSquares[i].xCoordinate, gameBoardSquares[i].yCoordinate);
            });

            gameBoardElement.appendChild(boardSquareElement);
        };
    };

    return { createDisplay };
})();

function playerMove(player, xCoordinate, yCoordinate) {
    const move = yCoordinate + xCoordinate;
    player.moves.push(move);

    // check if the player meets one of the win conditions:
    for (coordiantes in winScenarios) {
        if (winScenarios[coordiantes].every((coordinate) => player.moves.includes(coordinate))) {
            console.log("you win!")
            break;
        };
    };
};



gameBoard.createDisplay();

let playerOne = newPlayer();