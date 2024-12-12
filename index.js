// Ingredients in app
let ingredients = [
    "Løg",
    "Pasta",
    "Hakket Oksekød",
    "Hvidløg",
    "Tomat",
    "Hakkede tomater",
    "Guleord",
    "Olie",
    "Peberfrugt",
    "Squash",
    "Kyllingebryst",
    "Æg",
    "Mælk",
    "Fløde",
    "Hvedemel",
    "Bagepulver",
    "Vaniljesukker",
    "Bønner på dåse",
    "Sukker",
    "Kakaopulver",
    "Smør",
    "Bacon",
    "Rødvin",
    "Soltørrede tomater",
    "Balsamico",
    "Vodka",
    "Parmesan",
    "Laks",
    "Kartoffel",
    "Rodfrugter",
    "Nachos",
    "Oliven",
    "Cheddar",
    "Jalapenos",
    "Agurk",
    "Koriander",
    "Majs",
    "Avocado",
    "Lime",
    "Brød",
    "Ost",
    "Øl",
    "Snaps",
    "Hvidvin",
    "Rosévin",
    "Ethanol",
    "Whisky",
    "Salt"

]

// Searchable categories
let categories = {
    'grøntsag': ["Agurk", "Tomat", "Kartoffel", "Rodfrugter", "Gulerod", "Squash"],
    'kød': ["Hakket Oksekød", "Kyllingebryst", "Bacon", "Kød"],
    'ost': ["Ost", "Parmesan", "Cheddar"],
    'mejeri': ["Mælk", "Fløde"],
    'alkohol': ["Øl", "Snaps", "Rødvin", "Rosévin", "Hvidvin", "Ethanol", "Vodka", "Whisky"]
}
ingredients.sort()

// On document load
$(document).ready(function() {
    // Get selected items from localstorage
    let selected = sessionStorage.getItem("selected").split(",") || []
    let searchedString = ""

    // Add each ingredient to the html list of ingredients
    for (const key of ingredients) {
        let ing = document.createElement("div")
        ing.classList.add("ingredient")
        let name = document.createElement("h3")
        name.innerHTML = key

        ing.append(name)

        $(".resultsGrid").append(ing)
    }

    // After loading page, select each element, which was previously selected from local storage
    $(".resultsGrid").children(".ingredient").each(function() {
        let ingName = $(this).first().text().toString()
        if (selected.includes(ingName.toLowerCase())) {
            $(this).toggleClass("select", true)
        }
    })

    // When ingredients is clicked, select the element
    $(".ingredient").on('click', function() {
        // Make green/grey in app
        $(this).toggleClass("select")

        // Add or remove element to list of selected ingredients depending on if it was already selected
        let ingName = $(this).first().text().toString()

        console.log(ingName)
        if (selected.includes(ingName.toLowerCase())) {
            selected.splice(selected.indexOf(ingName.toLowerCase()),1)
        } else {
            selected.push(ingName.toLowerCase())
        }

        // Save the selected items in local storage
        sessionStorage.setItem("selected", selected)

        console.log(selected)
    })

    // When something typed into searchbar filter ingredients
    $("#searchBar").on('input', function() {
        // Get what is seatched
        searchedString = $("#searchBar").val()
    
        // For each ingredient
        $(".resultsGrid").children(".ingredient").each(function() {
            let ingName = $(this).first().text().toString()

            // Get the categories of ingredients, which are searched for
            let selectedCats = Object.keys(categories).filter(value => value.includes(searchedString))
            // Find all the ingredients in the searched categories
            let catIngredients = []
            for (let cat of selectedCats) {
                catIngredients.push(...categories[cat])
            }

            // If ingredients is not searched for and not in one of the searched categories then hide, else show
            if (!ingName.toLowerCase().includes(searchedString.toLowerCase()) && !catIngredients.includes(ingName)) {
                $(this).toggleClass("hide", true)
            }
            else {
                $(this).toggleClass("hide", false)
            }
        })
    })

    // When remove button is clicked remove all selected ingredients, and set all to grey
    $(".removeBtn").on('click', function() {
        selected = []
        sessionStorage.setItem("selected", selected)
        $(".resultsGrid").children(".ingredient").each(function() {
            $(this).toggleClass("select", false)
        })
    })
})

