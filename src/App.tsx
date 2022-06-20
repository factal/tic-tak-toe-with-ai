import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from '@components/board'
import Flow from '@components/flow'
import { CssVarsProvider } from '@mui/joy'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CssVarsProvider>
      <Board />
      <div style={{height: '100vw', width: '100vw' , position: 'fixed'}} >
        <Flow />
      </div>
    </CssVarsProvider>
  )
}

export default App
