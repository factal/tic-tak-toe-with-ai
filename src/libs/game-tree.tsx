import { Player, SquareState, useStore } from '@libs/store'
import _ from 'lodash'

export const calculateWinner = (squares: SquareState[][]) => {
  const lines = [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a[0]][a[1]] && squares[a[0]][a[1]] === squares[b[0]][b[1]] && squares[a[0]][a[1]] === squares[c[0]][c[1]]) {
      return squares[a[0]][a[1]]
    }
  }

  for (let col of squares) {
    for (let row of col) {
      if (!row) {
        return null
      }
    }
  }
  return 'tie'
}

export const generateNextMoves = (board: SquareState[][]) => {
  const nextMoves: [number, number][] = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        nextMoves.push([i, j])
      }
    }
  }
  return nextMoves
}

export const genBestMove = (board: SquareState[][], next: Player) => {
  let bestScore = -Infinity
  // gen next moves
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        board[i][j] = next
        const score = minimax(_.cloneDeep(board), next, 0, true)
        board[i][j] = null 
        if (score > bestScore) {
          bestScore = score
          return [i, j]
        }
      }
    }
  }
}

// minimax pruning
export const minimax = (board: SquareState[][], player: Player, depth: number, isMaximizing: boolean) => {
  const winner = calculateWinner(board)
  if (winner) {
    if (winner === 'X') {
      // console.log(board)
      return -1
    } else if (winner === 'O') {
      console.log(board)
      return 1
    } else if (winner === 'tie') {
      // console.log(board)
      return 0
    }
  }
  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          board[i][j] = player
          const score = minimax(_.cloneDeep(board), player === 'X' ? 'O' : 'X', depth + 1, false)
          board[i][j] = null
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          board[i][j] = player
          const score = minimax(_.cloneDeep(board), player === 'X' ? 'O' : 'X', depth + 1, true)
          board[i][j] = null
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}