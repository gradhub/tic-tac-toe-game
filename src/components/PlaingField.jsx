import { useState } from "react";
import Square from "./Square";

function PlaingField() {
  const [plaingField, setPlaingField] = useState(Array(9).fill('-'))
  const [isNextSymbolX, setIsNextSymbolX] = useState(true)

  const endGame = {isEndGame: false, winner: null}

  // let isWinner = false
  // let winner = null
  let minorTitle = `Сейчас ходит - ${isNextSymbolX ? 'X': 'O'}`

  const setSquareValue = (i) => {
    if(plaingField[i] === 'X' || plaingField[i] === 'O')
      return

    let newArray = plaingField.slice()
    newArray[i] = isNextSymbolX ? 'X' : 'O'
    setIsNextSymbolX(!isNextSymbolX)
    setPlaingField(newArray)
  }

  const checkEndGame = () => {
    let winnerCombination = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let combination of winnerCombination){
      if(plaingField[combination[0]] !== '-' && plaingField[combination[0]] === plaingField[combination[1]] && plaingField[combination[0]] === plaingField[combination[2]]){
        endGame.isEndGame = true
        return plaingField[combination[0]]
      }
    }
    let i=0,j=0
    for(;i<plaingField.length; i++){
      if(plaingField[i] === '-') return
      j++
    }
    if(i===j) endGame.isEndGame = true
  }

  const restartGame = () => {
    let newArray = (Array(9).fill('-'))
    setPlaingField(newArray)
    setIsNextSymbolX(true)
  }

  endGame.winner = checkEndGame()
  if (endGame.isEndGame){
    endGame.winner ? minorTitle = `Победил ${endGame.winner}` : minorTitle = `Игра закончилась ничьей`
  } 

  return(
    <div className="plaingField">
      <h2>Игровое поле</h2>
      <h3>{minorTitle}</h3>
      <button onClick={
          restartGame
        }
      >
        Рестарт
      </button>
      <div className="plaingField-all_square">
        {plaingField.map((element, index) => (
          <span>
            <Square value={element} setSquareValue={() => setSquareValue(index)} isEndGame={endGame.isEndGame} />
            {(index === 2 || index === 5) && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PlaingField