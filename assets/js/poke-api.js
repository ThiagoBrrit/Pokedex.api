

const PokeApi = {}

function converPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [ability] = abilities

    pokeDetail.stats.forEach((stat) => {
        switch (stat.stat.name) {
            case 'hp':
                pokemon.stats.hp = stat.base_stat;
            break;
            case 'attack':
                pokemon.stats.attack = stat.base_stat;
            break;
            case 'defense':
                pokemon.stats.defense = stat.base_stat;
            break;
            case 'special-attack':
                pokemon.stats.specialattack = stat.base_stat;
            break;
            case 'special-defense':
                pokemon.stats.specialdefense = stat.base_stat;
            break;
            case 'speed':
                pokemon.stats.speed = stat.base_stat;
            break;
            default:
            break;
        }
    });

    pokemon.types = types
    pokemon.type = type

    pokemon.abilities = abilities
    pokemon.ability = ability

    // pokemon.stats = stats

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converPokeApiDetailToPokemon)
}

PokeApi.getPokemons =  (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
    }
