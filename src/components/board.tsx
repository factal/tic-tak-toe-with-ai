import Cell from '@components/cell'
import { calcWinner, GameNode, GameNodeProps, genBestMove } from '@libs/game-tree'
import { useStore } from '@libs/store'
import { Board, Player } from '@libs/types'
import { useState } from 'react'

const GameBoard = () => {
  const state =  useStore()

  const initBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  const [board, setBoard] = useState<Board>(initBoard)
  const [player, setPlayer] = useState<Player>('X')
  const [finished, setFinished] = useState(false)

  const createCell= (x: number, y: number) => {
    return (
      <Cell
        cellState={board[x][y]}
        disabled={finished}
        onClick={ () => handleClick(x, y) }
      />)
  }

  const handleClick = (x: number, y: number) => {
    if (!finished) {
      // if board[x][y] is empty
      if (!board[x][y]) {
        board[x][y] = player
        setBoard(board)
        const nextPlayer = player == 'X' ? 'O' : 'X'
        setPlayer(nextPlayer)

        // suggest best move
        const gameNodeProps: GameNodeProps = {
          id: `start-${x}-${y}`,
          board,
          depth: 0,
          score: null,
          children: new Map(),
          parent: null
        }
        const gameNode = new GameNode(gameNodeProps)
        state.setcurrentNode(gameNode)

        const best = genBestMove(gameNode, nextPlayer)
        console.log(gameNode)
        console.log(best, nextPlayer)
      } 

      const winner = calcWinner(board)
      if (winner) {
        setFinished(true)
        console.log(`${winner} won!`)
      }
    }

    // if (!state.getWinner()) {
    //   const current = state.getBoard()[x][y]
      
    //   let next = state.getNext()
    //   if (!current) {
    //     state.setBoard(x, y, next)
    //     state.setNext()
    //     const board = state.getBoard()

    //     const gameNodeProps: GameNodeProps = {
    //       id: `start-${x}-${y}`,
    //       board,
    //       depth: 0,
    //       score: null,
    //       children: new Map(),
    //       parent: null
    //     }
    //     const gameNode = new GameNode(gameNodeProps)
    //     state.setcurrentNode(gameNode)
  
    //     const winner = calcWinner(state.getBoard())
    //     state.setWinner(winner)

    //     state.pushHistory(state.get())


    //     next = state.getNext()
    //     const best = genBestMove(gameNode, next)
    //     console.log(gameNode)
    //     console.log(best, next)

    //     if (state.getNext() == 'O') {
          
          
    //     }

        

    //     // console.log(state.getHistory())
  
    //     if (winner) {
    //       console.log(state.getWinner())
    //     }
    //   }
    // }
  }
  

  return (
    <div style={{}}>
      <div className='board-row'>
        {createCell(0, 0)}
        {createCell(0, 1)}
        {createCell(0, 2)}
      </div>
      <div className='board-row'>
        {createCell(1, 0)}
        {createCell(1, 1)}
        {createCell(1, 2)}
      </div>
      <div className='board-row'>
        {createCell(2, 0)}
        {createCell(2, 1)}
        {createCell(2, 2)}
      </div>
    </div>
  )
}

export default GameBoard