import React from 'react'
import ItemList from '../item-list'
import PokeapiService from '../../services/pokeapi-service'
import { withData, withPokeapiService, withChildFunction, compose } from '../hoc-helper';

const renderName = ({ name }) => <span>{name}</span>

const mapPokemonMethodsToProps = (pokeapiService) => {
    return {
        getData: pokeapiService.getAllPokemon
    };
};

const PokemonList = compose(
                    withPokeapiService(mapPokemonMethodsToProps),
                    withData,
                    withChildFunction(renderName),
                    )(ItemList);

export { PokemonList }