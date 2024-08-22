import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./Winning_combinations.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//Helper Function
function getActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function App() {
  //State to update the winner name when game is over
  const [players, setPlayers] = useState({
    X: "Player1",
    O: "Player2",
  });

  //Main Logic state
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = getActivePlayer(gameTurns);

  //Creating a copy of the initial gameboard
  let gameboard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  //updates the gameboard every turn
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  //Derive the winner by checking each possible winning combinations
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  //Checks if the game is draw
  const hasDraw = gameTurns.length === 9 && !winner;

  //Checks every user turn in the game and update the state
  function handlePlayerTurns(rowIndex, colIndex) {
    //We use this syntax because the next state depends on the
    //prev state
    //setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      //Assume if the curr player is X we update the next Turn player according to it
      //We do not use the activePlayer state as it is better not to use another state
      //in a different state
      const currActivePlayer = getActivePlayer(prevTurns);

      //Creating an refernce object to store the info of the rowIndex & colIndex clicked
      //along with the prev set of turns

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currActivePlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  //Handle if the user wants a rematch
  function handleRematch() {
    setGameTurns([]);
  }

  //Handle the player name change to display winner at the game-over window
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* since when a user clicks on a cell we need to know so */}
        {/* we can call the function to the rreq component by passing it into the props */}
        {(winner || hasDraw) && <GameOver win={winner} onRes={handleRematch} />}
        <GameBoard onSelectSquare={handlePlayerTurns} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
