# @pokedex/pokemon-list-dm

## Package info

### Package installation

Installation using NPM

```bash
npm install @pokedex/pokemon-list-dm
```

## PokemonListDm (Class) pokemon-list-dm (Custom Element)

### Extends from

LitElement (lit-element package)

### Usage

Import and extend the class:

```js
import { PokemonListDm } from '@pokedex/pokemon-list-dm';

class ExampleElement extends PokemonListDm {
  ...
}
```

Use the custom element (defined globally):

```js
import '@pokedex/pokemon-list-dm/pokemon-list-dm.js';
```

```html
<pokemon-list-dm ...> ... </pokemon-list-dm>
```

### Description

![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component lists a series of pokemon in order of dex number provided by the pokeapi

Example:

```html
<pokemon-list-dm></pokemon-list-dm>
```

### Properties

- **page**: string = "https://pokeapi.co/api/v2/pokemon" (attribute: page)
  Get the home page for the pokeapi
