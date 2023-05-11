import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '../../components/Loader'

import dogImg from '../../images/dog.png'
import foxImg from '../../images/fox.png'

import './Main.scss'

type Props = {
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

type AnimalType = 'fox' | 'dog'

type Animal = {
  image: string
  type: AnimalType
}

export const Main: FC<Props> = ({ score, setScore }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(0)
  const [counter, setCounter] = useState<number>(30)
  const [images, setImages] = useState<Animal[]>([])
  const [nextImages, setNextImages] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const loadingCounter: MutableRefObject<number> = useRef(0)
  let timer: NodeJS.Timeout

  const handleSelectedAnimal = (type: AnimalType) => {
    if (type === 'fox') {
      setScore(score + 1)
    } else {
      setScore(score - 1)
    }

    setStep(step + 1)
  }

  const getDog = async (): Promise<Animal> => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()

    return {
      type: 'dog',
      image: data.message
    }
  }

  const getFox = async (): Promise<Animal> => {
    const response = await fetch('https://randomfox.ca/floof/')
    const data = await response.json()

    return {
      type: 'fox',
      image: data.image
    }
  }

  const getAnimals = (saveImages: typeof setImages) => {
    const animals = []

    for (let i = 0; i < 8; i++) {
      animals.push(getDog())
    }

    animals.push(getFox())

    Promise.all(animals).then(response => {
      const shaftedAnimals = response.sort(() => 0.5 - Math.random())

      return saveImages(shaftedAnimals)
    })
  }

  const imageLoaded = () => {
    loadingCounter.current += 1

    if (loadingCounter.current >= images.length) {
      setLoading(false)
    }
  }

  const handleErrorImage = (
    e: SyntheticEvent<HTMLImageElement, Event>,
    type: AnimalType
  ): void => {
    if (type === 'dog') {
      e.currentTarget.src = dogImg
    } else {
      e.currentTarget.src = foxImg
    }
  }

  useEffect(() => {
    loadingCounter.current = 0

    if (step !== 0) {
      setImages(nextImages)
    } else {
      getAnimals(setImages)
    }

    getAnimals(setNextImages)

    setLoading(true)
  }, [step])

  useEffect(() => {
    setScore(0)
  }, [])

  useEffect(() => {
    nextImages.forEach(picture => {
      const img = new Image()
      img.src = picture.image
    })
  }, [nextImages])

  useEffect(() => {
    if (loading) {
      clearTimeout(timer)
    } else if (counter > 0 && !loading) {
      timer = setTimeout(() => setCounter(counter - 1), 1000)
    } else {
      navigate('/scoreboard')
    }

    return () => clearTimeout(timer)
  }, [counter, loading])

  return (
    <div className="main">
      <div className="main__options">
        <div>Score: {score}</div>
        <div>Time left: {counter}</div>
      </div>

      {loading && (
        <div className="main__loader">
          <Loader />
        </div>
      )}

      <div
        className="main__animals"
        style={{ display: loading ? 'none' : 'grid' }}
      >
        {images.map(({ image, type }) => (
          <img
            className="main__image"
            onClick={() => handleSelectedAnimal(type)}
            key={image}
            src={image}
            alt={type}
            onLoad={imageLoaded}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
              handleErrorImage(e, type)
            }
          />
        ))}
      </div>
    </div>
  )
}
