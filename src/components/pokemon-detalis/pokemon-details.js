import React, { Component } from "react";
import PokeapiService from '../../services/pokeapi-service'
import "./pokemon-details.css";

export default class PokemonDetalis extends Component {
  
  pokeapiService = new PokeapiService();

  state = {
    id: null,
    pokemonData: null
  }

  componentDidMount() {
    this.giveSelectedPokemon();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedId !== prevProps.selectedId) {
      this.giveSelectedPokemon();
    }
  }

  onPokemonState = (pokemonData) => {
    this.setState({
      pokemonData
    })
  }

  giveSelectedPokemon = () => {
    const id = this.props.selectedId;
    this.setState({id});
    this.pokeapiService
        .getPokemonData(id)
        .then(this.onPokemonState)
        .catch(this.props.error);
  }

  render() {
    
    const { id, pokemonData } = this.state;

    if(!pokemonData) {
      return "Choose Your Pokemon";
    }

    const { name, height, weight, abilities, types } = pokemonData;
    return (
      <div className="pokemon-details" id="pokemon-details">
        <div className="pokemon-img">
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} width="150px" heihgt="150px" alt="Pokemon"/>
        </div>
        <div className="pokemon-detalis">
          <h4>Name: {name}</h4>
          <ul>
            <li>Height: {height}</li>
            <li>Width: {weight}</li>
            <li>Abilities: <span className="text-warning">{abilities}</span></li>
            <li>Types: <span className="text-warning">{types}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}
