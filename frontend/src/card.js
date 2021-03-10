 const renderRecipe = (recipe) => {
    let cardGroup = document.getElementsByClassName('card-columns')[0]
    let card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = recipe.id
    let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
    let cardTitle = document.createElement('h4')
        cardTitle.className = 'card-title'
        cardTitle.innerText = recipe.name
    let cardText = document.createElement('p')
        cardText.className = 'card-text'
        cardText.innerText = recipe.duration
    let img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = recipe.picture
    cardBody.append(cardTitle, cardText)
    card.append(img, cardBody)
    cardGroup.appendChild(card)
    cardGroup.style.display = 'grid'
    cardGroup.style.gridTemplateColumns = 'repeat(auto-fit, [linename3 linename4] 300px)'
    
    cardBody.addEventListener('click', renderSingleRecipe)
    img.addEventListener('click', renderSingleRecipe)
}

function renderSingleRecipe(e) {
    // debugger
    let rec_id = e.target.parentElement.dataset.id
    fetch('http://localhost:3000/recipes/' + rec_id)
    .then(res => res.json())
    .then(recipe => renderSingleRecipeCard(recipe))
    // render a whole recipe with all the ingredients and everything
}
function renderSingleRecipeCard(recipe) {
    // debugger
    resetMainContent();
    let cardGroup = document.getElementsByClassName('card-columns')[0]
    let card = document.createElement('div')
        card.className = 'card'
        card.dataset.id = recipe.id
    let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
    let cardTitle = document.createElement('h3')
        cardTitle.className = 'card-title'
        cardTitle.innerText = recipe.name
    let cardDuration = document.createElement('p')
        cardDuration.className = 'card-text'
        cardDuration.innerText = recipe.duration
    let cardText = document.createElement('p')
        cardText.className = 'card-text'
        cardText.innerText = recipe.instructions
    let img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = recipe.picture
    cardBody.append(cardTitle, cardDuration, cardText)
    card.append(img, cardBody)
    cardGroup.appendChild(card)
    cardGroup.style.display = 'flex'

}

function buildIngredients(recipe) {
    
}
function resetCards() {
        let allNodes = document.getElementsByClassName('card-columns')[0]
        while (allNodes.hasChildNodes()){
            allNodes.removeChild(allNodes.firstChild)
        }
}
