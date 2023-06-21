import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import GameContainer from './components/GameContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1>Memory Game</h1>
        <GameContainer />
      </div>
    </>
  )
}

export default App
