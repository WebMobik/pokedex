import React, { Component } from "react";
import PokeapiService from '../../services/pokeapi-service'
import Header from '../header'
import ErrorBoundry from '../error-boundry'
import { PokemonPage, RandomPokemonPage } from '../pages'
import { PokeServiceProvider } from '../pokemon-service-context'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './app.css'

export default class App extends Component {

  state = {
    pokeapiService: new PokeapiService(),
    loading: true,
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {;
    
    return (
      <ErrorBoundry>
        <PokeServiceProvider value={this.state.pokeapiService}>
          <Router>
            <div className="container">

              <Header/>
              <Switch>
                <Route path="/" 
                        render={() => <h1 className="central-title">Welcome To Pokedex</h1>}
                        component={RandomPokemonPage}
                        exact />
                <Route path="/pokemons/" 
                        render={() => <h1 className="central-title">Choose you'r pokemon</h1>}
                        component={PokemonPage}
                        />
                <Route render={() => <h1 className="central-title">Page not found !</h1>} />
              </Switch>
            </div>
          </Router>
        </PokeServiceProvider>
      </ErrorBoundry>
    );
  }
}
