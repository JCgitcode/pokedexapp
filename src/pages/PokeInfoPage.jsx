import { useParams } from "react-router-dom"
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from "react"
import './PokeInfoPage.css'
import PokeJson from '../components/PokedexPage/PokeColors.json'


const PokeInfoPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])

  const [darkMode, setDarkMode] = useState(false)
  const handleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  const backgroundColor = darkMode ? '#171717' : '#fcf1ef'

  const pokeType = pokemon?.types[0]?.type.name
  const pokeColor = PokeJson[pokeType]

  return (
    <div className="div__poke" style={{ backgroundColor }}>
    <img className="img__header" src="../../public/header.png" alt="" />

    <button className="button__mode" onClick={handleDarkMode}>
        {darkMode ? 'Light' : 'Dark'}
    </button>

      <section className="section__stats">
        <header
            style={{ background: `linear-gradient(to top, transparent 10%, ${pokeColor} 60%)` }}
            className="header__poke">
            <img className="img__poke" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </header>

        <h3 style={{ color: pokeColor, fontFamily:'Comic Sans MS, Gill Sans, Gill Sans MT' }}># {pokemon?.id}</h3>

        <div className="div__name">
            <hr /> <h1 style={{ color: pokeColor }}>{pokemon?.name}</h1> <hr />
        </div>

        <ul className="ul__hw">
            <li>
                <span>Height</span>
                <span style={{fontSize:'1.8vw', fontFamily:'Comic Sans MS, Gill Sans, Gill Sans MT'}}>{pokemon?.height}</span>
            </li>
            <li>
                <span>Weight</span>
                <span style={{fontSize:'1.8vw', fontFamily: 'Comic Sans MS, Gill Sans, Gill Sans MT'}}>{pokemon?.weight}</span>
            </li>
        </ul>

        <section className="section__ta">
            <div>
                <h3 className="h3__ta" >Type</h3>
                <ul className="type-abi">
                    { pokemon?.types.map(infoType => {
                      const pokeType = infoType.type.name
                      const pokeColor = PokeJson[pokeType]
                      return (<li className="li__typ" style={{ backgroundColor: pokeColor }}
                      key={infoType.type.url}>{pokeType}</li>) })}
                </ul>
            </div>
            <div>
                <h3 className="h3__ta" >Abilities</h3>
                <ul className="type-abi">
                    { pokemon?.abilities.map(infoAbi => (
                      <li className="li__abi" key={infoAbi.ability.url}>{infoAbi.ability.name}</li>))}
                </ul>
            </div>
        </section>

        <h2 className="h2__stat" >Stats</h2>

        <ul>
            {pokemon?.stats.map(infoStat => {
                const experience = (infoStat.base_stat / 150) * 100;
                return (
                    <section className="section__stat" key={infoStat.stat.url}>
                        <div className="div__stat">
                            <li className="li__statname">{infoStat.stat.name}:</li>
                            <li className="li__statval">{infoStat.base_stat}/150</li>
                        </div>
                        <div className="div__bar">
                            <div className="div__exp" style={{ width: `${experience}%` }}></div>
                        </div>
                    </section>)})}
        </ul>
      </section>

      <section className="section__moves">
          <h2>Movements</h2>
          <ul className="ul__moves">
              { pokemon?.moves.map(infoMov => (
              <li className="li__mov" key={infoMov.move.url}>{infoMov.move.name}</li>))}
          </ul>
      </section>


    </div>
  )
}

export default PokeInfoPage