import React, { Component } from "react";
import PokeapiService from '../../services/pokeapi-service'
import Header from '../header'
import RandomPokemon from '../random-pokemon'
import PokemonEvolve from '../pokemon-evolve'

export default class App extends Component {

  pokeapiService = new PokeapiService();

  state = {
    pokemon: {},
    pokemonData: {},
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updatePokemon();
    this.updatePokemonData();
  }

  onPokemonLoaded = (pokemon) => {
    this.setState({
      pokemon,
      loading: false
    });
  }

  onPokemonDataLoaded = (pokemonData) => {
    this.setState({
      pokemonData,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  randomId = () => {
    const id = Math.floor(Math.random()*40) + 2;
    return id;
  }
  
  updatePokemon = () => {
    const id = this.randomId(); // 21 
    this.pokeapiService
      .getPokemon(id)
      .then(this.onPokemonLoaded)
  }

  updatePokemonData = () => {
    setTimeout(() => {
      const id = this.state.pokemon.id;
      this.pokeapiService
        .getPokemonData(id)
        .then(this.onPokemonDataLoaded)
        .catch(this.onError);
    }, 1000);
  }

  
  render() {
    return (
      <div className="container">
        <Header randomId={this.state.pokemon.id}/>
        <RandomPokemon 
        randomId={this.randomId} 
        error={this.state.error}
        loading={this.state.loading}
        pokemon={this.state.pokemon}
        pokemonData={this.state.pokemonData}
        />
        <PokemonEvolve 
        onError={this.onError}
        evolveId={this.state.pokemon.evolve}
        />
      </div>
    );
  }
}
