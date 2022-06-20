import _ from 'lodash'
import { Board, Player, Position } from '@libs/types'
import { Edge, Node } from 'react-flow-renderer'

export type GameEdge = Map<Position, GameNode> // key: next move position, value: next board

export type GameNodeProps = {
  id: string
  board: Board
  depth: number
  score: number | null
  children: GameEdge
  parent: GameNode | null
}
export class GameNode {
  id: string
  board: Board
  depth: number
  score: number | null
  children: GameEdge
  parent: GameNode | null

  constructor(props: GameNodeProps) {
    const { id, board, depth, score, children, parent } = props
    this.id = id
    this.board = board
    this.depth = depth
    this.score = score
    this.children = children
    this.parent = parent
  }


}

// export class GameTree {
//   currentNode: GameNode = new GameNode('0', [], 0, new Map(), null)
//   nodes: GameNode[] =[this.currentNode]
// }

export const calculateWinner = (board: Board) => {
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
    if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
      return board[a[0]][a[1]]
    }
  }

  for (let col of board) {
    for (let row of col) {
      if (!row) {
        return null
      }
    }
  }
  return 'tie'
}

export const generateNextMoves = (board: Board) => {
  const nextMoves: Position[] = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        nextMoves.push([i, j])
      }
    }
  }
  return nextMoves
}

export const genBestMove = (gameNode: GameNode, next: Player) => {
  const board = gameNode.board
  let bestScore = -Infinity
  let bestMove: Position = [0, 0]
  // gen next moves
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == null) {
        board[i][j] = next

        const nextNodeProps: GameNodeProps = {
          id: `${gameNode.id}-${next}-${i}-${j}`,
          board: _.cloneDeep(board),
          depth: gameNode.depth + 1,
          score: null,
          children: new Map(),
          parent: gameNode
        }
        const nextNode = new GameNode(nextNodeProps)
        gameNode.children.set([i, j], nextNode)
        const score = minimax(nextNode, next === 'X' ? 'O' : 'X', 0, true)

        board[i][j] = null 
        if (score > bestScore) {
          bestScore = score
          bestMove = [i, j]
        }
      }
    }
  }
  return bestMove
}

export const minimax = (gameNode: GameNode, player: Player, depth: number,  isMaximizing: boolean) => {
  const board = gameNode.board

  const winner = calculateWinner(board)
  if (winner) {
    if (winner === 'X') {
      gameNode.score = -1
      return -1
    } else if (winner === 'O') {
      gameNode.score = 1
      return 1
    } else if (winner === 'tie') {
      gameNode.score = 0
      return 0
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          board[i][j] = player

          const nextNodeProps: GameNodeProps = {
            id: `${gameNode.id}-${player}-${i}-${j}`,
            board: _.cloneDeep(board),
            depth: gameNode.depth + 1,
            score: 0,
            children: new Map(),
            parent: gameNode
          }
          const nextNode = new GameNode(nextNodeProps)
          gameNode.children.set([i, j], nextNode)
          const score = minimax(nextNode, player === 'X' ? 'O' : 'X', depth + 1, false)
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

          const nextNodeProps: GameNodeProps = {
            id: `${gameNode.id}-${player}-${i}-${j}`,
            board: _.cloneDeep(board),
            depth: gameNode.depth + 1,
            score: null,
            children: new Map(),
            parent: gameNode
          }

          const nextNode = new GameNode(nextNodeProps)
          gameNode.children.set([i, j], nextNode)
          const score = minimax(nextNode, player === 'X' ? 'O' : 'X', depth + 1, true)
          board[i][j] = null
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}

export const generateFlowGraph = (gameNode: GameNode, nodes: Node[], edges: Edge[], depth: number = 0, width: number = 0) => {
  const node = generateFlowNode(gameNode, depth, width)
  nodes.push(node)

  let cnt = 0
  for (let child of gameNode.children.values()) {
    const edge = generateFlowEdge(gameNode, child)
    edges.push(edge)
    generateFlowGraph(child, nodes, edges, depth + 1, width + cnt)
    cnt += 1
  }

  return { nodes, edges }
}

export const generateFlowNode = (gameNode: GameNode, depth: number, width: number) => {
  return ({
    id: gameNode.id,
    data: { label: gameNode.board.toString() },
    position: {x: 100 * width, y: 100 * depth},
  })
}

export const generateFlowEdge = (start: GameNode, end: GameNode) => {
  return ({
    id: `e-${start.id}-${end.id}`,
    source: start.id,
    target: end.id,
  })
}