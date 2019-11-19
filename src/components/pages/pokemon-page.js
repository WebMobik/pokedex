import React, {Component} from 'react';
import PokemonEvolve from '../pokemon-evolve';
import PokemonDetails from '../pokemon-detalis';
import ItemList from '../item-list';
import PokeapiService from '../../services/pokeapi-service';
import { Navigation } from '../pokemon-navigation';
export default class PokemonPage extends Component {
    
    pokeapiService = new PokeapiService();

    state = {
        id: 1,
        pokemonSelected: {
            pokemonId: 1,
            evolveId: 1
        },
    }

    componentDidUpdate(_, prevState) {
        if (this.state.id !== prevState.id) {
          this.givePokemonId();
        }
    }

    componentDidMount() {
        this.givePokemonId();
    }

    onIdLoaded = (pokemonSelected) => { // Why i use id, if id == pokemonSelected !
        this.setState({
            pokemonSelected,
        });
    }

    givePokemonId = () => {
        const id = this.state.id; // 21  
        this.pokeapiService
          .getPokemonEvolveId(id)
          .then(this.onIdLoaded)
          .catch(this.onError)
    }

    onPokemonSelected = (id) => {
        this.setState({
            id
        });
    }
    
    render() {
        const { pokemonSelected } = this.state;

        console.log(pokemonSelected);

        return (
            <div>
                <h1 className="central-title">Choose you'r pokemon</h1>
                <PokemonDetails selectedId={pokemonSelected.pokemonId}/>
                <PokemonEvolve
                evolveId={pokemonSelected.evolveId}
                />
                <Navigation />
                <ItemList onPokemonSelected={this.onPokemonSelected}/>
            </div>
        )
    }
}