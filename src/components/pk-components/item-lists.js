import React from 'react'
import ItemList from '../item-list'
import withData from '../with-data'
import PokeapiService from '../../services/pokeapi-service'

const pokeapiService = new PokeapiService();

const {
    getAllPokemon,
} = pokeapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderName = ({ name }) => <span>{name}</span>

const PokemonList = withData(
                    withChildFunction(ItemList, renderName),
                    getAllPokemon)

export { PokemonList }