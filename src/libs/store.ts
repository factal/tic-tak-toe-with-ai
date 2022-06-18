import create, { GetState, SetState } from 'zustand'

export type SquareState = 'X' | 'O' | null
export type Player = 'X' | 'O'

interface State {
  get: GetState<State>,
  set: SetState<State>,
  board: SquareState[][],
  getBoard: () => SquareState[][],
  setBoard: (row: number, col: number, value: SquareState) => void
  next: Player,
  getNext: () => Player,
  setNext: () => void,
  winner: Player | null,
  getWinner: () => Player | null,
  setWinner: (winner: Player | null) => void,
  hitstory: { board: SquareState[][], next: Player | null,  winner: Player | null }[],
  pushHistory: (state: State) => void
}

export const useStore = create<State>( (set, get) => ({
  get: get,
  set: set,

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
  },

  winner: null,

  getWinner: () => get().winner,
  
  setWinner: (winner: Player | null) => {
    set( state => ( { ...state, winner } ))
  },

  hitstory: [],

  pushHistory: (state: State) => {
    set( state => ({
      ...state,
      hitstory: [...state.hitstory, state]
    }))
  }
}))