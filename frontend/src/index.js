
document.addEventListener("DOMContentLoaded", () => {
    populateDropdown();
})
document.getElementById("home-button").addEventListener("click", renderHome)
document.getElementById("nomad-button").addEventListener("click", renderHome)
document.getElementById("kitchen-tips").addEventListener("click", renderTips)
document.getElementById("about-us").addEventListener("click", renderAboutUs)
document.getElementById("food-trends").addEventListener("click", renderFoodTrends)
document.getElementById("follow").addEventListener("click", renderFollow)
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

function renderTips(){
   resetMainContent();
   let heading1 = document.createElement('h1')
   heading1.innerText = "Kitchen Tips"

   let title1 = document.createElement('h3')
   title1.innerText = "Peel Ginger with a Spoon"

   let body1 = document.createElement('h4')
   body1.innerText = "Ginger can be tricky to peel with all its bumps and irregularities. Rather than using a paring knife or vegetable peeler, reach for the spoon. Scrape it against the skin and it'll come right off, following every contour and minimizing waste."



   document.getElementById("main-content").append(heading1, title1, body1)
}

function renderAboutUs(){
    resetMainContent();

    let heading = document.createElement('h1')
    heading.innerText = "About Us"

    let body = document.createElement('h3')
    body.innerText = "NOMAD is here to help you cook delicious meals with less stress and more joy. We offer recipes and cooking advice for home cooks, by home cooks."

    document.getElementById("main-content").append(heading, body)
}

function renderFoodTrends(){
    resetMainContent();

    let heading = document.createElement('h1')
    heading.innerText = "The 15 Food Trends You're Going To See Everywhere In 2021"

    let body = document.createElement('h4')
    body.innerText = "Plant Based - Plant-based items continue to be a trend into 2021, as 28 percent of people said that they have been eating more protein from plant sources during the pandemic, according to IFIC. More people will be flirting with veganism, but others will just be eating things that taste good and happen to be vegan. Expect the usual suspects to be rolling out even more innovations, especially at fast-food restaurants, but some forecasters predict newer things like plant-based fish are also going to be big on the horizon. "

    document.getElementById("main-content").append(heading, body)
}

function renderFollow(){
    resetMainContent();

    let heading = document.createElement('h1')
    heading.innerText = "Follow us!"

    let body = document.createElement('h4')
    body.innerText = "IG: @NOMAD Twitter: @NOMADRecipes"

    document.getElementById("main-content").append(heading, body)
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


