document.addEventListener("DOMContentLoaded", () => {
    getRecipe();
})
function getRecipe() {
    fetch('http://localhost:3000/recipes/')
    .then(res => res.json())
    .then(recipes => recipes.forEach(renderRecipe))
}
function renderRecipe(e) {
    // debugger
    let header = document.createElement("h2")
        header.innerText = e.name
    document.getElementById("test").appendChild(header)
}