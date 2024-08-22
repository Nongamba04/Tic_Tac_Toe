import { useState } from "react";


export default function GameBoard({onSelectSquare, board}) {
    //It intersects with the game turns as both the functions have the same purpose
    //So it is better to perform the handleClick operation in the parent component
    // const [gameboard, setGameboard] = useState(initialGameboard);

    // function handlePlayerClick(rowIndex,colIndex) {
    //     setGameboard((prevGameBoard)=>{
    //         //In JS, we create references of value and instead of upating the original , it is better to update the 
    //         //by using a reference to avoid unneccessary bugs
    //         const updatedGameBoard = [...prevGameBoard.map(innerArr => [...innerArr])]
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol 
    //         return updatedGameBoard;
    //     })

    //     //This function will run when the player clicks on the cell
    //     onSelectSquare();
    // }

  
     return (
        <>
            <ol id="game-board">
                {board.map((row, rowIndex) => <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, cellIndex) => <li key={cellIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,cellIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>)}
                    </ol>
                </li>

                )}
            </ol>
        </>
     )
}