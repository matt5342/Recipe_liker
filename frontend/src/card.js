 const renderRecipe = (recipe) => {
    //  resetCards();
    let cardGroup = document.getElementsByClassName('card-columns')[0]
    let card = document.createElement('div')
        card.className = 'card'
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
    
    card.addEventListener('click', renderSingleRecipe(recipe))
}

function renderSingleRecipe(recipe) {
    debugger
    // render a whole recipe with all the ingredients and everything
}

function resetCards() {
        let allNodes = document.getElementsByClassName('card-columns')[0]
        while (allNodes.hasChildNodes()){
            allNodes.removeChild(allNodes.firstChild)
        }
}