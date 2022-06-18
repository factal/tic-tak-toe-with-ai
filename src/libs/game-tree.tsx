import { Player, SquareState, useStore } from '@libs/store'

const state = useStore()

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

export const bestMove = (board: SquareState[][], next: Player) => {
  let bestScore = -Infinity
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        board[i][j] = next
        const score = minimax(board, next, 0, false)
        board[i][j] = null 
        if (score > bestScore) {
          bestScore = score
          return [i, j]
        }
      }
    }
  }
}

export const minimax = (board: SquareState[][], player: Player, depth: number, isMaximizing: boolean) => {
  return 1
}