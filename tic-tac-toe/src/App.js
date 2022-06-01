import {useEffect, useState} from "react";
import './style.scss'


const X_PLAYER = "X"
const X_TURN = "Player X, it's your turn!"
const X_WIN = "Winner: Player X 🎉🥳"
const O_PLAYER = "O"
const O_WIN = "Winner: Player O 🎉🥳"
const O_TURN = "Player O, it's your turn!"
const NOBODY_WIN = "Nobody Won!"

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


function App() {
    const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem('valueObj') || JSON.stringify({
        initialBoard: [Array(9).fill(null)],
        step: 0,
        turn: "",
        btnDisabled: false
    })))

    const onRestart = () => {
        localStorage.clear()
        setBoardData({
            initialBoard: [Array(9).fill(null)],
            step: 0,
            turn: "",
            btnDisabled: false
        })
    }

    useEffect(() => {
        localStorage.setItem('valueObj', JSON.stringify(boardData));
    }, [boardData])



    const onClickButton = (i) => {
        if (currentBoard[i] !== null) return

        boardData.step = boardData.step + 1
        const history = boardData.initialBoard.slice(0, boardData.step)
        const board = [...currentBoard]
        board[i] = nextValue
        boardData.step = history.length
        setBoardData({...boardData, initialBoard: [...history, board]})
    }


    const checkWin = (board) => {
        const responseNull = board.every((el => el !== null))
        if (responseNull) return boardData.turn = NOBODY_WIN
        STREAKS.map(el => {
            const [a, b, c] = el
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (boardData.turn === X_TURN) {
                    return boardData.turn = O_WIN
                }
                if (boardData.turn === O_TURN) {
                    return boardData.turn = X_WIN
                }
            }
        })
        if (boardData.turn === X_WIN || boardData.turn === O_WIN) {
            boardData.btnDisabled = true
        }
    }


    function nextPlayer(i) {
        const player = i.filter(Boolean).length % 2 === 0 ? X_PLAYER : O_PLAYER
        if (player === X_PLAYER) {
            boardData.turn = X_TURN
        }
        if (player === O_PLAYER) {
            boardData.turn = O_TURN
        }
        return player
    }

    const setHistory = (i) => {
        setBoardData({...boardData, step: i, indexHistory: i, btnDisabled: false})

    }

    const buildClassHistory = (index) => {
        let classNames = "tris__previous__btn "

        if (boardData.step === index) classNames += " tris__previous__btn--active"

        return classNames
    }

    const buildHistory = () => {
        return boardData.initialBoard.map((el, index) => (
            <button
                key={index}
                className={buildClassHistory(index)}
                onClick={() => setHistory(index)}>
                {index}
            </button>
        ))
    }


    const buildTris = (i) => {
        return (
            <button
                className={`tris__table__btn `}
                disabled={boardData.btnDisabled}
                onClick={() => onClickButton(i)}>{board[i] === null ? "." : board[i]}
            </button>
        )
    }

    const currentBoard = boardData.initialBoard[boardData.step]
    const board = [...currentBoard]
    const nextValue = nextPlayer(currentBoard)
    checkWin(currentBoard)


    return (
        <div className="tris">
            <div className="tris__winner">
                <h1>{boardData.turn}</h1>
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
            <div className="tris__restart">
                <button className="tris__restart__btn" onClick={() => onRestart()}>Restart!</button>
            </div>
            <div className="tris__previous">
                {buildHistory()}
            </div>
        </div>
    );
}

export default App;
