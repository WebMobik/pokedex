import React, {Component} from 'react'
import Spinner from '../spinner'
import "./item-list.css";
import PokeapiService from '../../services/pokeapi-service'
import { ShowMore } from '../show-more'
export default class ItemList extends Component {

  pokeapiService = new PokeapiService();

  state = {
    showItems: null,
    pokemonArr: null,
    pokemonList: null,
  }

  componentDidMount() {
    this.pokeapiService
    .getAllPokemon()
    .then((pokemonList) => {  // я на прямую изменяю текущий массив
      this.setState({
        pokemonList
      });
    });
  }

  showMorePokemon = () => {
    this.setState(({ showItems, pokemonList }) => {
      showItems += 50;
      const newArr = pokemonList.slice(0, showItems);
      return {
        showItems: showItems,
        pokemonArr: newArr,
      }
    });
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="pokemon-item col-md-3"
            key={id}
            onClick={() => this.props.onPokemonSelected(id)}>
          <div className="item">
            <a href="#pokemon-details">
              <span>{name}</span>
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt="pokemon" width="120px" height="120px"/>
            </a>
          </div>
        </li>
      )
    });
  }

  render() {

    const { pokemonList, pokemonArr } = this.state;

    if(!pokemonList) {
      return <Spinner />
    }

    if (!pokemonArr) {
      return <ShowMore morePokemon={this.showMorePokemon}/>
    } else if(pokemonArr) {
      const items = this.renderItems(pokemonArr);
      return (
        <div>
          <ul className="row">
            {items}
          </ul>
          <ShowMore morePokemon={this.showMorePokemon}/>
        </div>
      );
    }
  }
}
