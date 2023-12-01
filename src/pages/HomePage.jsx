import { useRef, useState } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './HomePage.css'

const HomePage = () => {

    const [darkMode, setDarkMode] = useState(false)
    const handleDarkMode = () => {
      setDarkMode(prevMode => !prevMode)
    }
    const backgroundColor = darkMode ? '#171717' : '#fcf1ef'

    const inputName = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerName(inputName.current.value.trim()))
        navigate('/pokedex')
    }

  return (
    <div className="div__HomePage" style={{ backgroundColor }}>
        <button className="buttonHome__mode" onClick={handleDarkMode}>
            {darkMode ? 'Light' : 'Dark'}
        </button>
        <img className="pokedex__img" src="../../pokedex.png" alt="" />
        <h1>Hi Trainer !</h1>
        <p style = {{ color: darkMode ? 'white' : 'black' }}>
        To start, please give me your trainer name</p>
        <form className="form__trainer" onSubmit={handleSubmit}>
            <input className="input__trainer" ref={inputName} type="text" />
            <button className="button__trainer">Catch them all!</button>
        </form>
        <img className="banner__img" src="../../banner.png" alt="" />
    </div>
  )
}

export default HomePage