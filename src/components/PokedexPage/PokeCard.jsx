import { useEffect } from "react"
import useFetch from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom"
import './PokeCard.css'
import PokeJson from './PokeColors.json'


const PokeCard = ({url}) => {

    const [infoPoke, getInfoPoke] = useFetch(url)

    useEffect(() => {
      getInfoPoke()
    }, [])
    
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${infoPoke.id}`)
    }

    const pokeType = infoPoke?.types[0]?.type.name
    const pokeColor = PokeJson[pokeType]

  return (
    <article
    className={`article__pokecard ${pokeType}`}
    style={{border: `0.6vw solid ${pokeColor}`}}
    onClick={handleNavigate}>

    <div style = {{ backgroundColor: 'white'}}>
        <header className="header__card" style={{ backgroundColor: pokeColor }}>
            <img className="img__pokemon" src={infoPoke?.sprites.other["official-artwork"].front_default} alt="" />
        </header>

        <section>
            <h2 className="h2__name" style={{ color: pokeColor }}>{infoPoke?.name}</h2>
            <ul className="ul__type">
                {
                    infoPoke?.types.map(infoType => (
                        <li className="li__type" style={{ color: pokeColor }} key={infoType.type.url}>{infoType.type.name}</li>
                    ))
                }
            </ul>
            <hr />
            <ul className="ul__stat">
                {
                    infoPoke?.stats.map(infoStat => (
                        <li className="li__stat" key={infoStat.stat.url}>
                            <span className="span__title__stat" style={{ color: pokeColor }}>{infoStat.stat.name}</span>
                            <span className="span__content__stat" style={{ color: pokeColor }}>{infoStat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
        </section>
    </div>

    </article>
  )
}

export default PokeCard