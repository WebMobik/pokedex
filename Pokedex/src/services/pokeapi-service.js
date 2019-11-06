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
        const res = await this.getResource(`pokemon`);
        return res.results.map(this._transformPokemon);
    }

    async getPokemon(id) {                              // Get one Pokemon
        const pokemon = await this.getResource(`pokemon-species/${id}/`);
        return this._transformPokemon(pokemon);
    }
    
    async getEvolve(id) {                               // Get Evolve pokemon
        const evolve = await this.getResource(`evolution-chain/${id}/`);
            return this._transformEvolve(evolve)
    }

    async getPokemonData(id) {                              // Get one Pokemon
        const pokemonData = await this.getResource(`pokemon/${id}/`);
        return this._transformPokemonData(pokemonData);
    }

    _extractId(item) {                           // Get id in URL
        const idRegExp = /\/([0-9]*)\/$/;
        return item.match(idRegExp)[1];
    }

    _transformPokemon = (pokemon) => {                  // Give data in pokemon
        return {
            id: pokemon.id,
            evolve: this._extractId(pokemon.evolution_chain.url),
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

    _transformEvolve = (evolve) => {                    // Give data in Evolve
        return {
            small: evolve.chain.species.name,
            medium: evolve.chain.evolves_to[0].species.name,
            large: evolve.chain.evolves_to[0].evolves_to[0].species.name,
            smallId: this._extractId(evolve.chain.species.url),
            mediumId: this._extractId(evolve.chain.evolves_to[0].species.url),
            largeId: this._extractId(evolve.chain.evolves_to[0].evolves_to[0].species.url),
        };
    };
}
