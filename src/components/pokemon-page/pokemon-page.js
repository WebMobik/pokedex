import React, {Component} from 'react'

import ItemList from '../item-list'
import ErrorIndicator from '../error-indicator'
import SwapiService from '../../services/pokeapi-service'

export default class PokemonPage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPokemon: 25,
        hasError: false
    }

    onPokemonSelected = (selectedPokemon) => {
        this.setState({ selectedPokemon });
    }

    render() {
        
        if(!selectedPokemon) { // remove !
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onPokemonSelected}
                getData={this.swapiService.getAllPokemon}>

                {(i) => (
                    `${i.name}`
                )}

            </ItemList>
            
        )
        return (
            {itemList}
        )
    }
}