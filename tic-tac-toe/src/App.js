import {useEffect, useState} from "react";
import './style.scss'


const X_PLAYER = "X"
const O_PLAYER = "O"
const STREAKS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

let VALUE_BOARD = [null, null, null, null, null, null, null, null, null]

function App() {
  const [player, setPlayer] = useState(O_PLAYER)
  const [trisValue, setTrisValue] = useState([])
  const [winner, setWinner] = useState({
    winX: "",
    winO: "",
  })


  const onRestart = () => {
    console.log("ok")
    VALUE_BOARD = [null, null, null, null, null, null, null, null, null]
    setTrisValue([])
    setWinner({winX: "", winO: ""})
  }

  const checkWin = () => {
    STREAKS.map(el => {
      const [a, b, c] = el.map(i => VALUE_BOARD[i])
      if (a === "X" && b === "X" && c === "X") {
        setWinner({winX: "Winner: Player X 🎉🥳"})
      } else if (a === "O" && b === "O" && c === "O") {
        setWinner({winO: "Winner: Player O 🎉🥳"})
      }
    })
  }

  const displayWinner = () => {
    if (winner.winO || winner.winX) {
      return winner.winX || winner.winO
    }
    if (player === O_PLAYER) {
      return `Player: ${X_PLAYER} it's your Turn!`
    } else {
      return `Player: ${O_PLAYER} it's your Turn!`
    }
  }

  console.log(VALUE_BOARD)

  const onClickButton = (i) => {
    if (!(VALUE_BOARD[i] !== null)) {
      setPlayer(player === X_PLAYER ? O_PLAYER : X_PLAYER)
    }

    if (VALUE_BOARD[i] === null) {
      if (player === X_PLAYER) {
        VALUE_BOARD[i] = "O"
      } else if (player === O_PLAYER) {
        VALUE_BOARD[i] = "X"
      }
    }
    checkWin()
    setTrisValue([...VALUE_BOARD])
  }

  const buildTris = (i) => {
    return <button className="tris__table__btn" onClick={() => onClickButton(i)}>{
      !trisValue[i] ? <p className="tris__table__btn__empty">.</p> : trisValue[i]}</button>
  }


  return (
      <div className="tris">
        <div className="tris__winner">
          <h1>{displayWinner()}</h1>
        </div>
        <table className="tris__table">
          <tbody>
          <tr className="tris__table__row">
            <td>{buildTris(0)}</td>
            <td>{buildTris(1)}</td>
            <td>{buildTris(2)}</td>
          </tr>
          <tr>
            <td>{buildTris(3)}</td>
            <td>{buildTris(4)}</td>
            <td>{buildTris(5)}</td>
          </tr>
          <tr>
            <td>{buildTris(6)}</td>
            <td>{buildTris(7)}</td>
            <td>{buildTris(8)}</td>
          </tr>
          </tbody>
        </table>
        <button className="tris__restart" onClick={() => onRestart()}>Restart!</button>
      </div>
  );
}

export default App;
