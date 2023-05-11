import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Start } from './pages/Start'
import { Main } from './pages/Main'
import { Scoreboard } from './pages/Scoreboard'
import { Header } from './components/Header'

import './App.scss'

export const App = () => {
  const navigate = useNavigate()

  const [score, setScore] = useState<number>(0)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (!name) {
      navigate('/')
    }
  }, [name])

  return (
    <div className="app">
      <Header />
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
    </div>
  )
}
