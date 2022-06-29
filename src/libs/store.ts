import create, { GetState, SetState } from 'zustand'
import { Player, CellState } from '@libs/types'
import { GameNode } from '@libs/game-tree'

interface State {
  get: GetState<State>,
  set: SetState<State>,
  board: CellState[][],
  getBoard: () => CellState[][],
  setBoard: (row: number, col: number, value: CellState) => void
  next: Player,
  getNext: () => Player,
  setNext: () => void,
  winner: Player | 'tie' |  null,
  getWinner: () => Player | 'tie' |  null,
  setWinner: (winner: Player | 'tie' |  null) => void,
  hitstory: State[],
  getHistory: () => State[],
  pushHistory: (newState: State) => void,
  currentNode: GameNode,
  getcurrentNode: () => GameNode,
  setcurrentNode: (node: GameNode) => void,
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

  setBoard: (row: number, col: number, value: CellState) => {
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
  
  setWinner: (winner: Player | 'tie' |  null) => {
    set( state => ( { ...state, winner } ))
  },

  hitstory: [],

  getHistory: () => get().hitstory,

  pushHistory: (newState: State) => {
    set( state => ({
      ...state,
      hitstory: [...state.hitstory, newState]
    }))
  },

  currentNode: new GameNode({
    id: `null`,
    board: [],
    depth: 0,
    score: null,
    children: new Map(),
    parent: null,
    winner: null
  }),

  getcurrentNode: () => get().currentNode,

  setcurrentNode: (node: GameNode) => {
    set( state => ({
      ...state,
      currentNode: node
    }))
  }
}))