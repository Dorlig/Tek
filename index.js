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

let categories = {
    'grøntsag': ["Agurk", "Tomat", "Kartoffel", "Rodfrugter", "Gulerod", "Squash"],
    'kød': ["Hakket Oksekød", "Kyllingebryst", "Bacon", "Kød"],
    'ost': ["Ost", "Parmesan", "Cheddar"],
    'mejeri': ["Mælk", "Fløde"],
    'alkohol': ["Øl", "Snaps", "Rødvin", "Rosévin", "Hvidvin", "Ethanol", "Vodka", "Whisky"]
}

ingredients.sort()


$(document).ready(function() {
    let selected = localStorage.getItem("selected").split(",") || []
    let searchedString = ""

    for (const key of ingredients) {
        let ing = document.createElement("div")
        ing.classList.add("ingredient")
        let name = document.createElement("h3")
        name.innerHTML = key

        ing.append(name)


        $(".resultsGrid").append(ing)
    }

    $(".resultsGrid").children(".ingredient").each(function() {
        let ingName = $(this).first().text().toString()
        if (selected.includes(ingName.toLowerCase())) {
            $(this).toggleClass("select", true)
        }
    })

    $(".ingredient").on('click', function() {
        $(this).toggleClass("select")

        let ingName = $(this).first().text().toString()

        console.log(ingName)
        if (selected.includes(ingName.toLowerCase())) {
            selected.splice(selected.indexOf(ingName.toLowerCase()),1)
        } else {
            selected.push(ingName.toLowerCase())
        }

        localStorage.setItem("selected", selected)

        console.log(selected)
    })

    $("#searchBar").on('input', function() {
        let searchedString = $("#searchBar").val()
    
        $(".resultsGrid").children(".ingredient").each(function() {
            let ingName = $(this).first().text().toString()

            let selectedCats = Object.keys(categories).filter(value => value.includes(searchedString))
            let catIngredients = []
            for (let cat of selectedCats) {
                catIngredients.push(...categories[cat])
            }

            if (!ingName.toLowerCase().includes(searchedString.toLowerCase()) && !catIngredients.includes(ingName)) {
                $(this).toggleClass("hide", true)
            }
            else {
                $(this).toggleClass("hide", false)
            }
        })
    })

    $(".removeBtn").on('click', function() {
        selected = []
        localStorage.setItem("selected", selected)
        $(".resultsGrid").children(".ingredient").each(function() {
            $(this).toggleClass("select", false)
        })
    })
})

