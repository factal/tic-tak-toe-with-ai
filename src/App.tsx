import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from '@components/board'
import Flow from '@components/flow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Board />
      <div style={{height: 800}} >
        <Flow />
      </div>
     
    </div>
  )
}

export default App
