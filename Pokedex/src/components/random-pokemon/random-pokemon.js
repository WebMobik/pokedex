import React, { Component } from "react";
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/'
import "./random-pokemon.css";

export default class RandomPokemon extends Component {
  render() {
    
    const { pokemon, loading, error, pokemonData } = this.props;
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PokemonView pokemon={pokemon} pokemonData={pokemonData}/> : null;

    return (
      <div className="random-pokemon card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )

  }
}

const PokemonView = ({pokemon, pokemonData}) => {
  const { id } = pokemon;
  const { height, weight, abilities, types, name } = pokemonData;
  return (
    <React.Fragment >
    <div className="random-pokemon d-flex">
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
    </React.Fragment>
  );
}
