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
    let ties = 0;
    let losses = 0;
    return { name, symbol, moves, wins, ties, losses };
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
    const promptElement = document.querySelector("#prompt");
    const playAgainButton = document.querySelector("#play-again-button");
    const turnEndEvent = new Event("turn-end");
    const winEvent = new Event("win");
    let turnCount = 0;
    let roundOver = false;
    let playerOne;
    let playerTwo;
    let activePlayer;
    let inactivePlayer;

    function initializeGame() {
        const startButton = document.querySelector("#start-button");
        const pOneNameElement = document.querySelector(".player-one .title");
        const pTwoNameElement = document.querySelector(".player-two .title");

        startButton.addEventListener("click", (e) => {
            const playerOneName = prompt("Enter a name for player 1:");
            const playerTwoName = prompt("Enter a name for player 2:");
            pOneNameElement.textContent += playerOneName;
            pTwoNameElement.textContent += playerTwoName;
    
            playerOne = newPlayer(playerOneName, "X");
            playerTwo = newPlayer(playerTwoName, "O");
            activePlayer = playerOne;
            inactivePlayer = playerTwo;
    
            startButton.style.display = "none";
            gameBoardElement.style.display = "flex";
            gameBoard.createDisplay();

            promptElement.textContent = `${activePlayer.name}'s turn`;
        });
        return new Promise((resolve) => {
            startButton.onclick = () => resolve();
        });
    };

    function playerMove(xCoordinate, yCoordinate) {
        const selectedSquare = gameBoard.gameBoardSquares.find(
            square => (square.xCoordinate === xCoordinate) && (square.yCoordinate === yCoordinate)
        );

        // if the square has already been claimed, return:
        if (selectedSquare.playerSymbol != "") return;

        // add the square's corrdinates to the player's moves array, and place their symbol on the square:
        const move = yCoordinate + xCoordinate;
        activePlayer.moves.push(move);
        selectedSquare.playerSymbol = activePlayer.symbol;
    
        // check if the active player meets one of the win conditions:
        for (scenario in winScenarios) {
            if (winScenarios[scenario].every((coordinate) => activePlayer.moves.includes(coordinate))) {
                activePlayer.wins++;
                inactivePlayer.losses++;
                roundOver = true;
                gameBoardElement.dispatchEvent(winEvent);
                break;
            };
        };

        // if the move does not result in a win, dispatch the turn end event and alternate player one and two as the active player:
        if (!roundOver) {
            switch (activePlayer) {
                case playerOne: 
                    activePlayer = playerTwo;
                    inactivePlayer = playerOne;
                    break;
                case playerTwo:
                    activePlayer = playerOne;
                    inactivePlayer = playerTwo;
            };
            gameBoardElement.dispatchEvent(turnEndEvent);
        };
    };

    function newRound() {
        
    };

    // turn end / tie event: (upon nine turn end events without a win, trigger the tie end game scenario) 
    gameBoardElement.addEventListener("turn-end", (e) => {
        turnCount++;
        if (turnCount >= 9) {
            const pOneTiesElement = document.querySelector(".player-one .ties");
            const pTwoTiesElement = document.querySelector(".player-two .ties");
            playerOne.ties++;
            playerTwo.ties++;
            pOneTiesElement.textContent = `Ties: ${playerOne.ties}`;
            pTwoTiesElement.textContent = `Ties: ${playerTwo.ties}`;
            promptElement.textContent = "It's a tie!";
            gameBoardElement.style.display = "none";
            playAgainButton.style.display = "flex";
        } else {
            promptElement.textContent = `${activePlayer.name}'s turn`;
        };
    });

    // win event:
    gameBoardElement.addEventListener("win", (e) => {
        const pOneWinsElement = document.querySelector(".player-one .wins");
        const pOneLossesElement = document.querySelector(".player-one .losses");
        const pTwoWinsElement = document.querySelector(".player-two .wins");
        const pTwoLossesElement = document.querySelector(".player-two .losses");
        pOneWinsElement.textContent = `Wins: ${playerOne.wins}`;
        pOneLossesElement.textContent = `Losses: ${playerOne.losses}`;
        pTwoWinsElement.textContent = `Wins: ${playerTwo.wins}`;
        pTwoLossesElement.textContent = `Losses: ${playerTwo.losses}`;
        promptElement.textContent = `${activePlayer.name} wins!`;
        gameBoardElement.style.display = "none";
        playAgainButton.style.display = "flex";
    });

    playAgainButton.addEventListener("click", (e) => {

    });

    return { initializeGame, playerMove };
})();

async function main() {
    await gameState.initializeGame();

};

main();