import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'

import './Scoreboard.scss'

type Props = {
  name: string
  score: number
}

type Rating = {
  name: string
  date: string
  score: number
}

const MAX_LINES = 10

export const Scoreboard: FC<Props> = ({ name, score }) => {
  const navigate = useNavigate()
  const date = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  const saved = localStorage.getItem('score') || '[]'
  const rating: Rating[] = JSON.parse(saved)

  if (name) {
    rating.push({ name, date, score })
  }

  let newRating = rating.sort((a, b) => b.score - a.score)

  if (newRating.length > MAX_LINES) {
    newRating.length = MAX_LINES
  }

  localStorage.setItem('score', JSON.stringify(newRating))

  newRating = [{"name":"Anatolii Pokhylko","date":"01 May 2023","score":20},{"name":"Helen Robbins","date":"23 Mar 2023","score":15},{"name":"Michael Nelson","date":"11 Jul 2022","score":10},{"name":"Verlie Lobdell","date":"20 Jan 2023","score":5},{"name":"Pauline Craft","date":"11 May 2023","score":1}]

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <table className="scoreboard__table">
        <thead className="scoreboard__table-head">
          <tr>
            {['Rank', 'Name', 'Date', 'Score'].map(el => (
              <th className="scoreboard__table-cell" key={el}>
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="scoreboard__table-body">
          {newRating.map((rating, index) => (
            <tr key={`${rating.name}+${rating.score}`}>
              <td className="scoreboard__table-cell scoreboard__table-cell--ranked">
                {index + 1}
              </td>
              <td className="scoreboard__table-cell">{rating.name}</td>
              <td className="scoreboard__table-cell scoreboard__table-cell--center">
                {rating.date}
              </td>
              <td className="scoreboard__table-cell scoreboard__table-cell--right">
                {rating.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="scoreboard__buttons">
        <Button onClick={() => navigate('/')}>To Welcome Screen</Button>
        <Button onClick={() => navigate('/main')}>Play!</Button>
      </div>
    </div>
  )
}
