import React, {Component} from 'react';
import './pokemon-evolve.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PokeapiService from '../../services/pokeapi-service'

export default class PokemonEvolve extends Component {

    pokeapiService = new PokeapiService();

    state = {
        evolve: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateEvolve();
        this.interval = setInterval(this.updateEvolve, 10000);
      }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onEvolveLoaded = (evolve) => {
        this.setState({
            evolve,
            loading: false
        });
    }

    updateEvolve = () => {
        setTimeout(() => {
            const id = this.props.evolveId;
            this.pokeapiService
                .getEvolve(id)
                .then(this.onEvolveLoaded)
                .catch(this.props.onError);
        }, 2000)
    }

    render() {
        
        const { evolve, loading, error } = this.state;
        console.log(evolve);
        const { small, medium, large, smallId, mediumId, largeId } = evolve;
        
        if( loading ) {
            return <Spinner/>
        }

        console.log(large);

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