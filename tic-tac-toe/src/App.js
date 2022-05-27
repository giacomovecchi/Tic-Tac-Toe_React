import { useEffect, useState} from "react";
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

function App() {
    const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem('valueObj')))

    const onRestart = () => {
        localStorage.clear()
        setBoardData({
            board: [null, null, null, null, null, null, null, null, null],
            player: 0,
            turn: "Player: O it's your Turn!",
            history: [{
                board: [null, null, null, null, null, null, null, null, null],
                player: "Player: O it's your Turn!",
                classDisabled: false,

            }],
        })
    }


    useEffect(() => {
        localStorage.setItem('valueObj', JSON.stringify(boardData));
    }, [boardData])


    const onClickButton = (i) => {

            if (boardData.board[i] === null) {
                boardData.board[i] = X_PLAYER
                boardData.turn = "Player: O it's your Turn!"
                if (boardData.player % 2 === 0) {
                    boardData.board[i] = O_PLAYER
                    boardData.turn = "Player: X it's your Turn!"
                }

                setBoardData({
                    ...boardData,
                    board: boardData.board,
                    player: boardData.player + 1,
                    history: [...boardData.history,
                        {
                            board: [...boardData.board],
                            player: boardData.turn,
                            classDisabled: false,
                        }
                    ]
                })
            }
        checkWin()
    }


    const checkWin = () => {
        STREAKS.map(el => {
            const [a, b, c] = el.map(i => boardData.board[i])
            if (a === X_PLAYER && b === X_PLAYER && c === X_PLAYER) {
                boardData.turn = "Winner: Player X 🎉🥳"
                setBoardData({
                    ...boardData,
                    board: boardData.board,
                    player: boardData.player + 1,
                    history: [...boardData.history,
                        {
                            board: [...boardData.board],
                            player: boardData.turn,
                            classDisabled: true,
                        }
                    ]
                })
            } else if (a === O_PLAYER && b === O_PLAYER && c === O_PLAYER) {
                boardData.turn = "Winner: Player O 🎉🥳"
                setBoardData({
                    ...boardData,
                    board: boardData.board,
                    player: boardData.player + 1,
                    history: [...boardData.history,
                        {
                            board: [...boardData.board],
                            player: boardData.turn,
                        }
                    ]
                })
            }
        })
    }


    const display = () => {
        if (boardData.board.every((el => el !== null))) {
            boardData.turn = "Nobody Won"
            boardData.classDisabled = true
        }
        return boardData.turn
    }

    const onHistory = (item, index) => {
        setBoardData({
            ...boardData,
            board: item.board,
            turn: item.player,
            boolHistory: [true, index]
        })
    }


    const buildClassName = (item, index) => {
        let className = "tris__previous__btn"
        /*className += " tris__previous__btn--active"*/
        return className
    }


    const buildTris = (i) => {
        return (
            <button
                className={`tris__table__btn  ${boardData.classDisabled} `}
                disabled={boardData.classDisabled}
                onClick={() => onClickButton(i)}>{boardData.board[i]}
            </button>
        )
    }


    return (
        <div className="tris">
            <div className="tris__winner">
                <h1>{display()}</h1>
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
                {boardData.history.map((item, index) =>
                    <button
                        key={index}
                        className={buildClassName(item, index)}
                        onClick={() => onHistory(item, index)}>
                        {index}
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
