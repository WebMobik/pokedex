import React, {Component} from 'react';
import './pokemon-evolve.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PokeapiService from '../../services/pokeapi-service'

export default class PokemonEvolve extends Component {

    pokeapiService = new PokeapiService();

    state = {
        id: null,
        evolve: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateEvolve();
    }

    componentDidUpdate(prevProps) {
        if (this.props.evolveId !== prevProps.evolveId) {
          this.updateEvolve();
        }
    }

    onEvolveLoaded = (evolve) => {
        this.setState({
            evolve,
            loading: false
        });
    }

    updateEvolve = () => {
        const id = this.props.evolveId;
        this.pokeapiService
            .getEvolve(id)
            .then(this.onEvolveLoaded)
            .catch(this.props.onError);
    }

    render() {
        
        const { evolve, loading, error } = this.state;

        const { small, medium, large, smallId, mediumId, largeId } = evolve;
        
        if( !evolve ) {
            return <Spinner/>
        }

        if(medium == undefined) {
            return (
                <div className="pokemon-evolve card">
                    <h2>Evolution</h2>
                    <div className="pokemon-evolve">
                        <div className="first-evolve evolve">
                            <h3>{ small }</h3>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${smallId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                        </div>
                    </div>
                </div>
            )
        }

        if(large == undefined) {
            return (
                <div className="pokemon-evolve card">
                    <h2>Evolution</h2>
                    <div className="pokemon-evolve">
                        <div className="first-evolve evolve">
                            <h3>{ small }</h3>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${smallId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                        </div>
                        <div className="first-evolve evolve">
                            <h3>{ medium }</h3>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${mediumId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="pokemon-evolve card">
                <h2>Evolution</h2>
                <div className="pokemon-evolve">
                    <div className="first-evolve evolve">
                        <h3>{ small }</h3>
                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${smallId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                    </div>
                    <div className="first-evolve evolve">
                        <h3>{ medium }</h3>
                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${mediumId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                    </div>
                    <div className="first-evolve evolve">
                        <h3>{ large }</h3>
                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${largeId}.png`}  width="150px" heihgt="150px" alt="evolve"/>
                    </div>
                </div>
            </div>
        )  
    }
}