import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Board from '@components/board'
import Flow from '@components/flow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{height: '100vh', width: '100vw'}}>
      <Board />
      <div style={{height: '100vw', width: '100vw' , position: 'fixed'}} >
        <Flow />
      </div>
     
    </div>
  )
}

export default App
