import { CellState } from '@libs/types'
import { CircleOutlined, Close } from '@mui/icons-material'
import { Button } from '@mui/joy'

const cellContent = (cellState: CellState) => {
  switch (cellState) {
    case 'X':
      return <Close sx={{fontSize: '40px'}} />
    case 'O':
      return <CircleOutlined sx={{fontSize: '40px'}} />
    default:
      return ''
  }
}

type CellProps = {
  cellState: CellState,
  disabled: boolean,
  onClick: () => void
}

const Cell = ({ cellState, disabled, onClick }: CellProps) => {

  return (
    <Button
      variant='outlined'
      sx={{
        color: 'text.primary',

        float: 'center',
        width: '50px',
        height: '50px',
        marginRight: '-1px',
        marginTop: '-1px',
        padding: 0,

        borderRadius: '0%',
        
        // fontSize: '40px',
        // fontWeight: 'bold',
        // textAlign: 'center',
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {cellContent(cellState)}
    </Button>
  )
}

export default Cell