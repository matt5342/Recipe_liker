   
const BASE_URL = 'http://localhost:3000/home'

document.addEventListener('DOMContentLoaded', () => {
    getPokemon()
    handleForm()
})

const getPokemon = () => {
    document.querySelector('#pokemon-container').innerHTML = ""
    fetch(BASE_URL)
        .then((res) => res.json() )
        .then(pokeData => pokeData.forEach(renderPokemon))
}

const renderPokemon = (pokemon) => {
    let pokeBox = document.querySelector('#pokemon-container')

    let col = document.createElement('div')
        col.className = "col-sm-4"

    let card = document.createElement('div')
        card.classList.add('card', 'm-2')
        card.id = `pokemon-${pokemon.id}`

    let img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = pokemon.sprite
    
    let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

    let cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = pokemon.name

    let cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'd-flex', 'justify-content-center')
        cardFooter.id = `footer-${pokemon.id}`
        cardFooter.innerText = "Likes: " + pokemon.likes

        cardFooter.addEventListener('click', () => {
            updateLikes(pokemon)
        })

    let delButton = document.createElement('button')
        delButton.className = "btn btn-danger"
        delButton.innerText = "Delete Me"
        delButton.addEventListener('click', () => {
            delPokemon(pokemon)
        })


    cardBody.append(cardTitle)

    card.append(img, cardBody, cardFooter, delButton)

    col.appendChild(card)
    pokeBox.appendChild(col)



}

const delPokemon = (pokemon) => {
    console.log(pokemon);
    let reqPackage = {}
        reqPackage.headers = {"Content-Type": "application/json"}
        reqPackage.method = "DELETE"
    fetch(BASE_URL+`/${pokemon.id}`, reqPackage)
        .then(() => {
            document.getElementById(`pokemon-${pokemon.id}`).remove()
        })

    
}

const updateLikes = (pokemon) => {

    let likes = parseInt(document.getElementById(`footer-${pokemon.id}`).innerText.split(" ")[1])
 
    let newLikes = {
        likes: likes + 1
    }

    let reqPackage = {}
        reqPackage.headers = {"Content-Type": "application/json"}
        reqPackage.method = "PATCH"
        reqPackage.body = JSON.stringify(newLikes)

    fetch(BASE_URL+`/${pokemon.id}`, reqPackage)
        .then(res => res.json())
        .then((pokemonObj) => {
            document.getElementById(`footer-${pokemonObj.id}`).innerText = "Likes: " + newLikes.likes
        })
}

const handleForm = () => {
    const pokeForm = document.querySelector('form')
    pokeForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let newPokemon = {
            name: event.target.pokeName.value,
            sprite: event.target.pokeImg.value,
            type: "cool",
            likes: 5
        }

        let reqPackage = {}
            reqPackage.headers = {"Content-Type": "application/json"}
            reqPackage.method = "POST"
            reqPackage.body = JSON.stringify(newPokemon)
        fetch(BASE_URL, reqPackage)
        .then(res => res.json())
        .then(renderPokemon)  
        pokeForm.reset()
    })
}

