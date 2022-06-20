export type CellState = 'X' | 'O' | null
export type Board = CellState[][]
export type Player = 'X' | 'O'
export type Winner = Player | 'tie' | null
export type Position = [number, number] // 0 <= x <= 2