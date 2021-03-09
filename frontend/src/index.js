
// document.addEventListener("DOMContentLoaded", () => {
//     getRecipe();
// })
document.getElementById("home-button").addEventListener("click", () => {
    renderHome();
})
document.getElementById("cooking-styles").addEventListener("click", () => {
    getCookingStyles();
})
function renderHome() {
    let mainContent = document.getElementById("main-content")
    document.getElementById("display-cooking-styles").style.display = "none"
    // debugger
    // while (mainContent.hasChildNodes()){
    //     mainContent.removeChild(mainContent.firstChild)
    // }

}
// function getRecipe() {
//     fetch('http://localhost:3000/recipes/')
//     .then(res => res.json())
//     .then(recipes => recipes.forEach(renderRecipe))
// }
// function renderRecipe(e) {
//     // debugger
//     let header = document.createElement("h2")
//         header.innerText = e.name
//     document.getElementById("test").appendChild(header)
// }
function getCookingStyles() {
    if (document.getElementById("display-cooking-styles").hasChildNodes()){
        document.getElementById("display-cooking-styles").style.display = "block"
    }
    else {
        fetch('http://localhost:3000/recipes/')
        .then(res => res.json())
        .then(recipes => recipes.forEach(renderCookingStyle))
    }
}
function renderCookingStyle(e) {
        let style = document.createElement('h3')
            style.innerText = e.cuisine
        document.getElementById("display-cooking-styles").appendChild(style)
}


