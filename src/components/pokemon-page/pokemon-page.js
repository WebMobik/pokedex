import React, {Component} from 'react'

import ItemList from '../item-list'
import ErrorIndicator from '../error-indicator'
import SwapiService from '../../services/pokeapi-service'
import ErrorBoundry from '../error-boundry'

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
        // const pokemonDetalis = (
        //     <ErrorBoundry>
        //         <PokemonDetails personId={this.state.selectedPokemon}/>
        //     </ErrorBoundry>
        // )

        return (
            {itemList}
        )
    }
}