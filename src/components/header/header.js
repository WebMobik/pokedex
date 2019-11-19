import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default class Header extends Component {

    render() {

        // const {randomId} = this.props;
        return(
            <div className="header d-flex">
                <h2>Pokedex</h2>
                <div className="image-logo">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`} width="75px" height="75px" alt="pokemon"/>
                </div>
                <ul>
                    <li className="nav-item">
                        <Link to="/">Main</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pokemons/">Pokemons</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about/">About</Link>
                    </li>
                </ul>
            </div>
        );
    };
};