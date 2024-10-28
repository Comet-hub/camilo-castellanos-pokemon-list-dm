import { LitElement } from 'lit-element';
export class PokemonListDm extends LitElement {
  static get properties() {
    return {
      page: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.page = 'https://pokeapi.co/api/v2/pokemon';
  }

  async loadPokemons() {
    try {
      this.dispatchEvent(
        new CustomEvent('load-pokemon-request-started', {
          bubbles: true,
          composed: true,
        }),
      );

      const res = await fetch(this.page);
      const data = await res.json();
      const list = [];
      this.page = data.next;

      for (const pokemon of data.results) {
        try {
          this.dispatchEvent(
            new CustomEvent('pokemon-request-started', {
              bubbles: true,
              composed: true,
            }),
          );
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();
          list.push({
            ...pokemonData,
            evolution: await this.findEvo(pokemonData),
          });
        } catch (error) {
          this.dispatchEvent(
            new CustomEvent('pokemon-request-failure', {
              bubbles: true,
              composed: true,
              detail: error,
            }),
          );
        } finally {
          this.dispatchEvent(
            new CustomEvent('pokemon-request-success', {
              bubbles: true,
              composed: true,
            }),
          );
        }
      }
      return list;
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('load-pokemon-request-failure', {
          bubbles: true,
          composed: true,
          detail: error,
        }),
      );
    } finally {
      this.dispatchEvent(
        new CustomEvent('load-pokemon-request-success', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  async findEvo(pokemon) {
    const species = await this.fetchSpecies(pokemon.species.url);
    const evolution = await this.fetchEvolutionChain(
      species.evolution_chain.url,
    );
    let evo = {
      id: evolution.id,
      evolution,
    };
    return evo;
  }

  async fetchSpecies(url) {
    const speciesRes = await fetch(url);
    const speciesData = await speciesRes.json();
    return speciesData;
  }

  async fetchEvolutionChain(url) {
    const evolutionChainRes = await fetch(url);
    const evolutionChainData = await evolutionChainRes.json();
    return evolutionChainData;
  }

  async fetchPokemon(id) {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonRes.json();
    return pokemonData;
  }
}
