import React, {Component} from 'react';
import PokemonEvolve from '../pokemon-evolve';
import PokemonDetails from '../pokemon-detalis';
import ItemList from '../item-list';
import SearchList from '../search-list';
import PokeapiService from '../../services/pokeapi-service';
export default class PokemonPage extends Component {
    
    pokeapiService = new PokeapiService();

    state = {
        id: 1,
        pokemonSelected: {
            pokemonId: 1,
            evolveId: 1,
        },
        term: "",
        pokemonList: null,
        pokemonNames: null,
    }

    componentDidUpdate(_, prevState) {
        if (this.state.id !== prevState.id) {
          this.givePokemonId();
        }
    }

    componentDidMount() {
        this.givePokemonId();
        this.pokeapiService
        .getAllPokemon()
        .then((pokemonList) => { 
            this.setState({
                pokemonList
            });
        });
    }

    givePokemonName = () => {
        this.setState(({ pokemonList }) => {
          const namesArr = pokemonList.map(({name}) => {
            return name;
          });
          return {
            pokemonNames: namesArr,
          }
        });
    }

    onSearchChange = (term) => {
        this.setState({ term });
    }

    onIdLoaded = (pokemonSelected) => { 
        this.setState({
            pokemonSelected,
        });
    }

    givePokemonId = () => {
        const id = this.state.id;
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
        
        return (
            <div>
                <h1 className="central-title">Choose you'r pokemon</h1>
                <PokemonDetails selectedId={pokemonSelected.pokemonId}/>
                <PokemonEvolve
                evolveId={pokemonSelected.evolveId}
                />
                <SearchList onChange={this.givePokemonName} />
                <ItemList onPokemonSelected={this.onPokemonSelected}/>
            </div>
        )
    }
}