import React, {Component} from 'react'
import RandomPokemon from '../random-pokemon'
import PokemonEvolve from '../pokemon-evolve'
import PokeapiService from '../../services/pokeapi-service'
import Spinner from '../spinner'
export default class RandomPokemonPage extends Component {

    pokeapiService = new PokeapiService();

    state = {
        id: {
            pokemonId: 1,
            evolveId: 1,
        },
        loading: true,
    }

    componentDidMount() {
        this.givePokemonId();
        this.interval = setInterval(this.givePokemonId, 10000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onIdLoaded = (id) => {
        this.setState({
          id,
          loading: false
        });
    }

    givePokemonId = () => {
        const id = Math.floor(Math.random()*105) + 2;
        this.pokeapiService
          .getPokemonEvolveId(id)
          .then(this.onIdLoaded)
    }

    render() {

        const { id, loading } = this.state;

        if (loading) {
            return <Spinner />
        }

        return (
            <div>
                <h1 className="central-title">Welcome to Pokedex app</h1>
                <RandomPokemon
                pokemonId={id.pokemonId}
                error={this.state.error}
                />
                <PokemonEvolve
                evolveId={id.evolveId}
                onError={this.onError}
                />
                {/* <SearchList /> */}
            </div>
        )
    }
}