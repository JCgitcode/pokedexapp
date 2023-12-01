import { useSelector } from "react-redux"
import useFetch from '../hooks/useFetch'
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './PokedexPage.css'

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')
  const [darkMode, setDarkMode] = useState(false)

  const trainerName = useSelector(store => store.trainerName)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url)

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      getPokemons()
    } else {
      getByTypePokemons(selectValue)
    }
  }, [selectValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.toLowerCase().trim())
    inputSearch.current.value = ''
  }

  const handleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  const backgroundColor = darkMode ? '#171717' : '#fcf1ef'

  const cbFilter = (poke) => {
    const nameFiltered = poke.name.includes(inputValue)
    return nameFiltered
  }

  return (
    <div className="container" style={{ backgroundColor }}>
      <img className="img__header" src="../../header.png" alt="" />
      <p style = {{ color: darkMode ? 'white' : 'black' }} className="p__poke" >Welcome <span className="span__trainer" >{trainerName}</span>, here you can find your favorite pokemon.
        Let's go!</p>
        
      <section className="section__header">
          <form className="form__search" onSubmit={handleSubmit}>
              <input className="input__search" ref={inputSearch} type="text" />
              <button className="button__search" >Search</button>
          </form>
          <SelectType setSelectValue={setSelectValue}/>
          <button className="buttonPoke__mode" onClick={handleDarkMode}>
              {darkMode ? 'Light' : 'Dark'}
          </button>
      </section>
      
      <section className="section__pokecard">
        {
          pokemons?.results.filter(cbFilter).map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
    </div>
  )
}

export default PokedexPage