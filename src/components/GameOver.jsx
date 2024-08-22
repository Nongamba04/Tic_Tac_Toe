import {useState} from "react"

export default function GameOver({win, onRes}){
    return (
        <>
            <div id="game-over">
                <h2>Game Over!</h2>
                {win && <p>{win} won!!</p>}
                {!win && <p>Its a draw!!</p>}
                <p>
                    <button onClick={onRes} >Rematch!</button>
                </p>
                
            </div>
        </>
    )
}
