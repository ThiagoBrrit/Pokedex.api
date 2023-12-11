const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;





function loadPokemonItems(offset, limit) {
    PokeApi.getPokemons(offset, limit)
        .then((Pokemons = []) => {
            const newHtml = Pokemons.map((pokemon, index) => `
                <li class="pokemon ${pokemon.type} pokemon-details-button">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            
                        <img src="${pokemon.photo}">
                    </div>
                </li>
                <div id="myModal-${index}" class="modal">
                    <div class="modal-content ${pokemon.type}">
                        <span class="close" id="closeModalBtn-${index}"></span>
                        <div class="content_pokemon">
                            <h1>${pokemon.name}</h1>
                            <span class="position" id="test">${pokemon.number}</span>
                            <div class="detail">
                                <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                            </div>
                            <div class="image">
                                <img src="${pokemon.photo}" alt="">
                            </div>
                        </div>
                        <div class="content_details">
                            <span class="center">Details</span>
                            <div class="left">
                                <div class="beetween">
                                    <p>Height:</p> <span>${pokemon.height / 10}m</span>
                                </div>
                                <div class="beetween">
                                    <p>Weight:</p> <span>${pokemon.weight / 10}Kg</span>
                                </div>
                                <div class="beetween">
                                    
                                    <p>Abilities:</p> ${pokemon.abilities.map((ability) => `<span">${ability}</span>`)}
                                </div>
                                <div class="content_details_breeding">
                                    <span class="center_breeding">Base Stats</span>
                                    <div class="beetween">
                                        <p>HP:</p> <span>${pokemon.stats.hp}</span>
                                    </div>
                                    <div class="beetween">
                                        <p>attack:</p> <span>${pokemon.stats.attack}</span>
                                    </div>
                                    <div class="beetween">
                                        <p>defense:</p> <span>${pokemon.stats.defense}</span>
                                    </div>
                                    <div class="beetween">
                                        <p>special-attack:</p> <span>${pokemon.stats.specialattack}</span>
                                    </div>
                                    <div class="beetween">
                                        <p>special-defense:</p> <span>${pokemon.stats.specialdefense}</span>
                                    </div>
                                    <div class="beetween">
                                        <p>speed:</p> <span>${pokemon.stats.speed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`)
                .join('')
            pokemonList.innerHTML += newHtml;

            const detailButtons = document.querySelectorAll('.pokemon-details-button');
            detailButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    openModal(index);
                });
            });
        })
        .catch((error) => console.error(error))
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit
    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})

function redirectToDetails() {
    window.location.href = 'pokemonDetails.html';
}

const pokemonId = document.getElementById('pokemon-details')
console.log(pokemonId)

document.addEventListener('DOMContentLoaded', function () {
    const closeModalBtns = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    closeModalBtns.forEach((closeBtn, index) => {
        closeBtn.addEventListener('click', function () {
            modals[index].style.display = 'none';
        });
    });

    modals.forEach((modal) => {
        modal.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });

    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

function openModal(index) {
    const modals = document.querySelectorAll('.modal');
    const modal = modals[index];
    modal.style.display = 'block';
}