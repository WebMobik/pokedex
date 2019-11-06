import React, {Component} from 'react'
import './header.css'

export default class Header extends Component {

    render() {

        const {randomId} = this.props;
        return(
            <div className="header d-flex">
                <h2>Pokedex</h2>
                <div className="image-logo">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`} width="75px" height="75px" alt="pokemon"/>
                </div>
                <ul>
                    <li className="nav-item"><a href="" className="nav-link">Location</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Pokemons</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Trainer</a></li>
                </ul>
            </div>
        );
    };
};