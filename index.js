const winScenarios = {
    horizontalA: ["A1", "A2", "A3"],
    horizontalB: ["B1", "B2", "B3"],
    horizontalC: ["C1", "C2", "C3"],
    verticalOne: ["A1", "B1", "C1"],
    verticalTwo: ["A2", "B2", "C2"],
    verticalThree: ["A3", "B3", "C3"],
    diagonalFirst: ["A1", "B2", "C3"],
    diagonalSecond: ["A3", "B2", "C1"],
};

const newPlayer = function(newName) {
    let name = newName;
    let moves = [];
    let wins = 0;
    return { name, moves, wins };
};

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
                gameState.playerMove(gameBoardSquares[i].xCoordinate, gameBoardSquares[i].yCoordinate);
            });
    
            gameBoardElement.appendChild(boardSquareElement);
        };
    };
    return { createDisplay };
})();

const gameState = (function() {
    let playerOne;
    let playerTwo;
    let activePlayer;

    function initializeGame() {
        const startButton = document.querySelector("#start-button");
        startButton.addEventListener("click", (e) => {
            const playerOneName = prompt("Enter a name for player 1:");
            const playerTwoName = prompt("Enter a name for player 2:");
    
            playerOne = newPlayer(playerOneName);
            playerTwo = newPlayer(playerTwoName);
            activePlayer = playerOne;
    
            startButton.style.display = "none";
            gameBoard.createDisplay();
        });
    };

    function playerMove(xCoordinate, yCoordinate) {
        const move = yCoordinate + xCoordinate;
        activePlayer.moves.push(move);
    
        //test
        console.log(`activePlayer ${activePlayer.name}: ${activePlayer.moves}`);
        console.log(`playerOne ${playerOne.name}: ${playerOne.moves}`);
        console.log(`playerTwo ${playerTwo.name}: ${playerTwo.moves}`);
    
        // check if the active player meets one of the win conditions:
        for (scenario in winScenarios) {
            if (winScenarios[scenario].every((coordinate) => activePlayer.moves.includes(coordinate))) {
                console.log(`${activePlayer.name} wins!`);
                break;
            };
        };
    };

    return { playerOne, playerTwo, activePlayer, initializeGame, playerMove };
})();

function main() {
    gameState.initializeGame();

    do {
        console.log(`${gameState[activePlayer].name}, make a move!`);
    
        // alternate player one and two's turns:
        switch (gameState.activePlayer) {
            case gameState.playerOne: 
                gameState.activePlayer = gameState.playerTwo;
                break;
            case gameState.playerTwo:
                gameState.activePlayer = gameState.playerOne;
        }
    } while ((gameState[playerOne].wins === 0) && (gameState[playerTwo].wins === 0));
};

main();