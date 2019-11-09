import React, { Component } from "react";
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/'
import PokeapiService from '../../services/pokeapi-service'
import "./random-pokemon.css";

export default class RandomPokemon extends Component {
  
  pokeapiService = new PokeapiService();

  state = {
    id: null,
    pokemonData: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePokemonData();
    this.interval = setInterval(this.updatePokemonData, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPokemonDataLoaded = (pokemonData) => {
    this.setState({
      pokemonData,
      loading: false
    });
  }
  
  updatePokemonData = () => {
    setTimeout(() => {
      const id = this.props.pokemonId;
      this.setState({id});
      this.pokeapiService
        .getPokemonData(id)
        .then(this.onPokemonDataLoaded)
        .catch(this.props.error);
    }, 1000)
  }

  
  render() {
    
    const { loading, error, pokemonData, id } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PokemonView pokemonData={pokemonData} pokemonId={id}/> : null;
    return (
      <div className="random-pokemon card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )

  }
}

const PokemonView = ({pokemonData, pokemonId}) => {
  const { height, weight, abilities, types, name } = pokemonData;
  return (
    <React.Fragment >
    <div className="random-pokemon d-flex">
      <div className="pokemon-img">
        <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`} width="150px" heihgt="150px" alt="Pokemon"/>
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
    </React.Fragment>
  );
}
