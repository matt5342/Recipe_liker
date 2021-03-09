 const renderRecipe = (recipe) => {
        let recipeBox = document.createElement('div')
            recipeBox.className = "recipe-collection"
    
        let col = document.createElement('div')
            col.className = "col-sm-4"
    
        let card = document.createElement('div')
            card.classList.add('card', 'm-2')
            card.id = `recipe-${recipe.id}`
    
        let img = document.createElement('img')
            img.className = 'card-img-top'
            img.src = "https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg?1"
        
        let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
    
        let cardTitle = document.createElement('h5')
            cardTitle.classList.add('card-title')
            cardTitle.textContent = recipe.name
    
        let cardFooter = document.createElement('div')
            cardFooter.classList.add('card-footer', 'd-flex', 'justify-content-center')
            cardFooter.id = `footer-${recipe.id}`
            cardFooter.innerText = "Likes: " + recipe.likes
    
            cardFooter.addEventListener('click', () => {
                updateLikes(recipe)
            })
    
    
        cardBody.append(cardTitle)
    
        card.append(img, cardBody, cardFooter)
        col.appendChild(card)
        recipeBox.appendChild(col)
        document.getElementById("main-content").append(recipeBox)
        }
