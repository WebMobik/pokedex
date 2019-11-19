import React, {Component} from 'react';
import './show-more.css';

export default class ShowMore extends Component {
    render() {
        return (
            <button className="show-more"
                    onClick={() => this.props.morePokemon()}>
                Show Pokemon
            </button>
        )
    }
}