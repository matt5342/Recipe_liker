
document.addEventListener("DOMContentLoaded", () => {
    populateDropdown();
})
document.getElementById("home-button").addEventListener("click", renderHome)
document.getElementById("nomad-button").addEventListener("click", renderHome)
document.getElementById("cooking-styles").addEventListener("click", () => {
    getCookingStyles();
})
function renderHome() {
    resetMainContent();
    document.getElementsByClassName("jumbotron")[0].style.display = 'block'
    document.getElementById('account-setup-buttons').style.display = "block"
}
document.getElementById("explore").addEventListener("click", renderRandomRecipe)
function renderRandomRecipe() {
    resetMainContent();
    while (document.getElementById("display-random").hasChildNodes()) {
        document.getElementById("display-random").removeChild(document.getElementById("display-random").firstChild)
    }
    fetch('http://localhost:3000/recipes/random')
    .then(res => res.json())
    .then(recipe => {
        renderRecipe(recipe)
    })
}

function getCookingStyles() {
    resetMainContent();
    document.getElementById("display-cooking-styles").style.display = "block"
    if (!document.getElementById("display-cooking-styles").hasChildNodes()){
        fetch('http://localhost:3000/recipes/')
        .then(res => res.json())
        .then(recipes => recipes.forEach(findStyles))
    }
}
function findStyles(recipe) {
    
    renderRecipe(recipe)
}
     
function populateDropdown() {
    fetch('http://localhost:3000/recipes/')
    .then(res => res.json())
    .then(recipes => recipes.forEach((e) => {
        let itemNodes = document.getElementsByClassName("dropdown-item")
        let alreadyExists = false
        for (let i = 0; i < itemNodes.length; i++){
            if (itemNodes[i].innerText == e.course){
                alreadyExists = true
            }
        }
        if (alreadyExists == false){
            let item = document.createElement('a')
            item.classList.add("dropdown-item")
            item.href = "#"
            item.innerText = e.course
            document.getElementsByClassName("dropdown-menu")[0].appendChild(item)
            item.addEventListener('click', renderByCourse)
        }
    }))
}

function renderByCourse(e) {
    resetMainContent();
    while (document.getElementById("display-by-course").hasChildNodes()) {
        document.getElementById("display-by-course").removeChild(document.getElementById("display-by-course").firstChild)
    }

    fetch('http://localhost:3000/courses/' + e.target.innerText)
    .then(res => res.json())
    .then(recipes => recipes.forEach(renderRecipe))
}
function resetMainContent() {
    let allNodes = document.getElementById("main-content").children
    for (let i = 0; i < allNodes.length; i++){
        allNodes[i].style.display = "none"
    }
    resetCards();
}

document.getElementsByClassName('form-inline my-2 my-lg-0')[0].addEventListener('submit', handleSearch)
function handleSearch(e) {
    e.preventDefault()
    document.getElementsByClassName('form-inline my-2 my-lg-0')[0]
    resetMainContent();
    while (document.getElementById("display-from-search").hasChildNodes()) {
        document.getElementById("display-from-search").removeChild(document.getElementById("display-from-search").firstChild)
    }
    let searchTerm = e.target[0].value
    fetch('http://localhost:3000/recipes/search/' + searchTerm)
    .then(res => res.json())
    .then(recipes => recipes.forEach(renderRecipe))
    if (document.getElementsByClassName('card-columns')[0].childElementCount == 0){
        let message = document.createElement('h3')
            message.innerText = "No recipes found. Please try again"
            message.className = "text-danger"
        document.getElementById('main-content').appendChild(message)
    }
}


