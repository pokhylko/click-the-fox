import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Start } from './pages/Start'
import { Main } from './pages/Main'
import { Scoreboard } from './pages/Scoreboard'

export const App = () => {
  const [score, setScore] = useState<number>(0)
  const [name, setName] = useState<string>('')

  return (
    <Routes>
      <Route path="/" element={<Start name={name} setName={setName} />} />
      <Route
        path="/main"
        element={<Main score={score} setScore={setScore} />}
      />
      <Route
        path="/scoreboard"
        element={<Scoreboard name={name} score={score} />}
      />
    </Routes>
  )
}
