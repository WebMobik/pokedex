import React, { Component } from "react";
import PokeapiService from '../../services/pokeapi-service'
import Header from '../header'
import ErrorBoundry from '../error-boundry'
import ItemList from '../item-list'
import RandomPokemon from '../random-pokemon'
import PokemonEvolve from '../pokemon-evolve'
import './app.css'

export default class App extends Component {

  pokeapiService = new PokeapiService();

  state = {
    id: {},
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
    const id =  Math.floor(Math.random()*70) + 2; // 21  
    this.pokeapiService
      .getPokemonEvolveId(id)
      .then(this.onIdLoaded)
      .catch(this.onError)
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  
  render() {
    
    return (
      <ErrorBoundry>
        <div className="container">
          <Header/>
          {/* <RandomPokemon
          pokemonId={this.state.id.pokemonId}
          error={this.state.error}
          />
          <PokemonEvolve
          evolveId={this.state.id.evolveId}
          onError={this.onError}
          /> */}
          <ItemList />
        </div>
      </ErrorBoundry>
    );
  }
}
