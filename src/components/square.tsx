import { useStore } from '@libs/store'
import { PropsWithChildren } from 'react'

type SquareProps = {
  onClick: () => void,
  position: [number, number] // [y, x]
}

const Square = ({ children, onClick, position }: PropsWithChildren<SquareProps>) => {
  const state =  useStore( state => state.board[position[0]][position[1]] )

  return (
    <button className='square' onClick={onClick}>
      {state}
    </button>
  )
}

export default Square