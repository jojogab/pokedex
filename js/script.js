const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonSprite = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const search = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(apiResponse.status === 200){
        const data = await apiResponse.json()
        return data
    } 
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonSprite.style.display = 'block'
        pokemonSprite.style.height = '18%'

        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id

        pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonSprite.alt = data.name

        if(data.id > 649){
            pokemonSprite.src = data['sprites']['front_default']

            pokemonSprite.style.height = '21%'
        }

        searchPokemon = data.id
    
        search.value = ''
    } else{
        pokemonSprite.style.display = 'none'; 

        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''

        search.value = ''
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(search.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)