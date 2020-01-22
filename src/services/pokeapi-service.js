export default class PokeapiService {

    _apiBase = 'https://pokeapi.co/api/v2/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
            `, received ${res.status}`)
        }
        return await res.json();
    };

    async getAllPokemon() {                             // Get All Pokemon
        const res = await this.getResource(`pokemon/?offset=0&limit=700`); // 809
        return res.results.map(this._transformAllPokemon);
    }

    async getPokemonEvolveId(id) {                              // Get evolve id
        const pokemon = await this.getResource(`pokemon-species/${id}/`);
        return this._transformId(pokemon);
    }

    async getEvolve(id) {                               // Get Evolve pokemon
        const evolve = await this.getResource(`evolution-chain/${id}/`);
        if(evolve.chain.evolves_to.length === 1) {
            const checkEvolve = (evolve.chain.evolves_to[0].evolves_to).length;
            if(checkEvolve === 2) {
                return this._transformTreeEvolve(evolve, 1);    
            } else if( checkEvolve ===  1 ) {
                return this._transformTreeEvolve(evolve, 0);
            } else if ( checkEvolve === 0 ) {
                return this._transformTwoEvolve(evolve);
            }
        } else {
            return this._transformOneEvolve(evolve);
        }
    }

    async getPokemonData(id) {                              // Get Pokemon data
        const pokemonData = await this.getResource(`pokemon/${id}/`);
        return this._transformPokemonData(pokemonData);
    }

    _extractId(item) {                           // Get id in URL
        const idRegExp = /\/([0-9]*)\/$/;
        return item.match(idRegExp)[1];
    }

    _transformId = (pokemon) => {                  // Give data in pokemon
        return {
            pokemonId: pokemon.id,
            evolveId: this._extractId(pokemon.evolution_chain.url),
        };
    };

    _transformPokemonData = (pokemonData) => {
        return {
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            abilities: pokemonData.abilities[0].ability.name,
            types: pokemonData.types[0].type.name,
        };
    };

    _transformAllPokemon = (allPokemon) => {
        return {
            id: this._extractId(allPokemon.url),
            name: allPokemon.name
        };
    };

    _transformTreeEvolve = (evolve, id) => {                    // Give data in Evolve
        return {
            small: evolve.chain.species.name,
            medium: evolve.chain.evolves_to[0].species.name,
            large: evolve.chain.evolves_to[0].evolves_to[id].species.name,
            smallId: this._extractId(evolve.chain.species.url),
            mediumId: this._extractId(evolve.chain.evolves_to[0].species.url),
            largeId: this._extractId(evolve.chain.evolves_to[0].evolves_to[id].species.url),
        };
    };

    _transformTwoEvolve = (evolve) => {                    // Give data in Evolve
        return {
            small: evolve.chain.species.name,
            medium: evolve.chain.evolves_to[0].species.name,
            smallId: this._extractId(evolve.chain.species.url),
            mediumId: this._extractId(evolve.chain.evolves_to[0].species.url),
        };
    };

    _transformOneEvolve = (evolve) => {
        return {
            mall: evolve.chain.species.name,
            smallId: this._extractId(evolve.chain.species.url),
        }
    };
}