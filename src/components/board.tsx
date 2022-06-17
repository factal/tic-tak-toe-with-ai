import Square from '@components/square'
import { useStore } from '@libs/store'

const Board = () => {
  const state =  useStore()

  const createSquare = (x: number, y: number) => {
    return <Square position={[x, y]} onClick={ () => {handleClick(x, y)} } />
  }

  const handleClick = (x: number, y: number) => {
    const current = state.getBoard()[x][y]
    const next = state.getNext()
    if (current!) {
      state.setBoard(x, y, next)
      state.setNext
      console.log('uc')
    }
  }

  return (
    <div>
      <div className='board-row'>
        {createSquare(0, 0)}
        {createSquare(1, 0)}
        {createSquare(2, 0)}
      </div>
      <div className='board-row'>
        {createSquare(0, 1)}
        {createSquare(1, 1)}
        {createSquare(2, 1)}
      </div>
      <div className='board-row'>
        {createSquare(0, 2)}
        {createSquare(1, 2)}
        {createSquare(2, 2)}
      </div>
    </div>
  )
}

export default Board