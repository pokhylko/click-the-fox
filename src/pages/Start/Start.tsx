import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'

import './Start.scss'

type Props = {
  name: string
  setName: Dispatch<SetStateAction<string>>
}

export const Start: FC<Props> = ({ name, setName }) => {
  const navigate = useNavigate()

  const [isNameEntered, setIsNameEntered] = useState<boolean>(false)

  const handleNameEntered = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && name) {
      setIsNameEntered(true)
    }
  }

  const handleInputName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
    setIsNameEntered(false)
  }

  return (
    <div className="start">
      {isNameEntered ? (
        <div className="start__name" onClick={() => setIsNameEntered(false)}>
          Hello {name}
        </div>
      ) : (
        <div className="start__name">
          Name:
          <input
            className="start__input"
            value={name}
            onChange={handleInputName}
            onKeyDown={handleNameEntered}
          />
        </div>
      )}

      <Button disabled={!isNameEntered} onClick={() => navigate('/main')}>
        Play!
      </Button>
    </div>
  )
}
