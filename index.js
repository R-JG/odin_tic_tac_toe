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

const newPlayer = function(newName, symbolChar) {
    let name = newName;
    let symbol = symbolChar;
    let moves = [];
    let wins = 0;
    return { name, symbol, moves, wins };
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
                playerSymbol: "",
            };
            gameBoardSquares.push(boardSquare);
        };
    };

    function createDisplay() {
        const gameBoardElement = document.querySelector("#game-board");

        for (let i = 0; i < gameBoardSquares.length; i++) {
            const boardSquareElement = document.createElement("div");
            boardSquareElement.classList.add("board-square");
    
            // on a click of the square, call the gameState method that handles the move stage, and then update the element's text to the player's symbol
            boardSquareElement.addEventListener("click", (e) => {
                gameState.playerMove(gameBoardSquares[i].xCoordinate, gameBoardSquares[i].yCoordinate);
                boardSquareElement.textContent = gameBoardSquares[i].playerSymbol;
                // make the color different according to the symbol:
                switch (boardSquareElement.textContent) {
                    case "X":
                        boardSquareElement.style.color = "brown";
                        break;
                    case "O":
                        boardSquareElement.style.color = "darkslateblue";
                }
            });
    
            gameBoardElement.appendChild(boardSquareElement);
        };
    };
    return { gameBoardSquares, createDisplay };
})();

const gameState = (function() {
    const gameBoardElement = document.querySelector("#game-board");
    let playerOne;
    let playerTwo;
    let activePlayer;

    function initializeGame() {
        const startButton = document.querySelector("#start-button");
        startButton.addEventListener("click", (e) => {
            const playerOneName = prompt("Enter a name for player 1:");
            const playerTwoName = prompt("Enter a name for player 2:");
    
            playerOne = newPlayer(playerOneName, "X");
            playerTwo = newPlayer(playerTwoName, "O");
            activePlayer = playerOne;
    
            startButton.style.display = "none";
            gameBoard.createDisplay();
        });
        return new Promise((resolve) => {
            startButton.onclick = () => resolve();
        });
    };

    function playerMove(xCoordinate, yCoordinate) {
        let roundOver = false;

        const selectedSquare = gameBoard.gameBoardSquares.find(
            square => (square.xCoordinate === xCoordinate) && (square.yCoordinate === yCoordinate)
        );

        // if the square has already been claimed, return:
        if (selectedSquare.playerSymbol != "") return;

        // add the square's corrdinates to the player's moves array, and place their symbol on the square:
        const move = yCoordinate + xCoordinate;
        activePlayer.moves.push(move);
        selectedSquare.playerSymbol = activePlayer.symbol;
    
        //test
        console.log(`activePlayer ${activePlayer.name}: ${activePlayer.moves}`);
        console.log(`playerOne ${playerOne.name}: ${playerOne.moves}`);
        console.log(`playerTwo ${playerTwo.name}: ${playerTwo.moves}`);
    
        // check if the active player meets one of the win conditions:
        for (scenario in winScenarios) {
            if (winScenarios[scenario].every((coordinate) => activePlayer.moves.includes(coordinate))) {
                activePlayer.wins++;
                roundOver = true;
                console.log(`${activePlayer.name} wins!`);
                console.log(`${activePlayer.wins}`);

                gameBoardElement.style.display = "none";
                break;
            };
        };

        // alternate player one and two's turns if the move does not result in a win:
        if (!roundOver) {
            switch (activePlayer) {
                case playerOne: 
                    activePlayer = playerTwo;
                    break;
                case playerTwo:
                    activePlayer = playerOne;
            };
        };
    };
    return { playerOne, playerTwo, activePlayer, initializeGame, playerMove };
})();

async function main() {
    await gameState.initializeGame();

};

main();