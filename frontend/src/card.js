let recipeBox = document.createElement('div')
recipeBox.className = "recipe-collection"
 
 
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
    cardGroup.style.display = 'flex'
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
    let ingredient_table = document.createElement('table')
        ingredient_table.id = 'ingredient-table'
        ingredient_table.className = 'table table-striped'
        ingredient_table.style.width = '60%'
    let table_head = document.createElement('thead')
    let table_header_row = document.createElement('tr')
    let table_header1 = document.createElement('th')
        table_header1.innerText = "Ingredient"
    let table_header2 = document.createElement('th')
        table_header2.innerText = "Amount"
    table_header_row.append(table_header1, table_header2)
    table_head.append(table_header_row)
    let table_body = document.createElement('tbody')
        table_body.id = 'ingredient-table-body'
    ingredient_table.append(table_head, table_body)

    cardBody.append(cardTitle, cardDuration, ingredient_table, cardText)
    card.append(img, cardBody)
    cardGroup.appendChild(card)
    recipe.ingredients.forEach(buildIngredients)

}

function buildIngredients(ingredient) {
    let table = document.getElementById('ingredient-table-body')
    let table_row = document.createElement('tr')
    let ing = document.createElement('td')
        ing.innerText = ingredient.ingredient_name
    let amount = document.createElement('td')
        amount.innerText = ingredient.amount
    table_row.append(ing, amount)
    table.append(table_row)
}

function resetCards() {
        let allNodes = document.getElementsByClassName('card-columns')[0]
        while (allNodes.hasChildNodes()){
            allNodes.removeChild(allNodes.firstChild)
        }
}
