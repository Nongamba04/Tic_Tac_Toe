import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  //State for editing names of the players
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  //Function to handle if the user chose to click edit
  function handleEditClick() {
    setIsEditing((editing) => !editing); // this is the best practice recommended i.e passing a function immediately changes the state
    setName(name);

    if (isEditing) {
      onChangeName(symbol, name);
    }
  }
  //Set the new input value as the current player name
  function handleChange(event) {
    setName(event.target.value); // this is how we can interact with the input values
  }

  //Initial playername as a span
  let playerName = <span className="player-name">{name}</span>;

  //if the user is editing
  if (isEditing) {
    playerName = (
      <input type="text" required value={name} onChange={handleChange} />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
