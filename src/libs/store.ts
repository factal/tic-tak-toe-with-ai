import create from 'zustand'

type SquareState = 'X' | 'O' | null
type Player = 'X' | 'O'

interface State {
  board: SquareState[][],
  getBoard: () => SquareState[][],
  setBoard: (row: number, col: number, value: SquareState) => void
  next: Player,
  getNext: () => Player,
  setNext: () => void
}

export const useStore = create<State>( (set, get) => ({
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],

  getBoard: () => get().board,

  setBoard: (row: number, col: number, value: SquareState) => {
    set( state => ({
      ...state,
      board: [
        ...state.board.slice(0, row),
        [
          ...state.board[row].slice(0, col),
          value,
          ...state.board[row].slice(col + 1)
        ],
        ...state.board.slice(row + 1)
      ]
    }))
  },

  next: 'X',

  getNext: () => get().next,

  setNext: () => {
    set( state => ({
      ...state,
      next: state.next === 'X' ? 'O' : 'X'
    }))
  }
}))