import { useEffect, useRef } from "react"
import useFetch from "../../hooks/useFetch"
import './SelectType.css'

const SelectType = ({ setSelectValue }) => {

    const url = 'https://pokeapi.co/api/v2/type'

    const [infoTypes, getInfoTypes] = useFetch(url)

    useEffect(() => {
        getInfoTypes()
    }, [])

    const selectElement = useRef()

    const handleChange = () => {
        setSelectValue(selectElement.current.value)
    }


    return (
        <select className="select__type" ref={selectElement} onChange={handleChange}>
            <option className="option__type" value='allPokemons'>All Pokemons</option>
            {
                infoTypes?.results.map(type => (
                    <option key={type.url} className="option__type" value={type.url}>{type.name}</option>
                ))
            }
        </select>
    )
}

export default SelectType