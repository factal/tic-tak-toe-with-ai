import Square from '@components/square'
import { calculateWinner, GameNode, GameNodeProps, genBestMove } from '@libs/game-tree'
import { useStore } from '@libs/store'

const Board = () => {
  const state =  useStore()

  const createSquare = (x: number, y: number) => {
    return <Square position={[x, y]} onClick={ () => {handleClick(x, y)} } />
  }

  const handleClick = (x: number, y: number) => {
    if (!state.getWinner()) {
      const current = state.getBoard()[x][y]
      
      const next = state.getNext()
      if (!current) {
        state.setBoard(x, y, next)
        state.setNext()
        const board = state.getBoard()

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
  
        const winner = calculateWinner(state.getBoard())
        state.setWinner(winner)

        state.pushHistory(state.get())

        if (state.getNext() == 'O') {
          
          const next = state.getNext()
          const best = genBestMove(gameNode, next)
          console.log(gameNode)
          console.log(best, next)
        }

        

        // console.log(state.getHistory())
  
        if (winner) {
          console.log(state.getWinner())
        }
      }
    }
  }


  

  return (
    <div style={{margin: 'auto'}}>
      <div className='board-row'>
        {createSquare(0, 0)}
        {createSquare(0, 1)}
        {createSquare(0, 2)}
      </div>
      <div className='board-row'>
        {createSquare(1, 0)}
        {createSquare(1, 1)}
        {createSquare(1, 2)}
      </div>
      <div className='board-row'>
        {createSquare(2, 0)}
        {createSquare(2, 1)}
        {createSquare(2, 2)}
      </div>
    </div>
  )
}

export default Board