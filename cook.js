const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const recipe = urlParams.get('recipe')
console.log(recipe);

$(document).ready(function() {
    $(".title").text(recipe)
    document.title=recipe
})