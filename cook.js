// Redefine all recipes

let recipes = {
    "Spaghetti Bolognese": {"timeTotal": 60, "time": 15, "difficulty": "#ffd300", "health": "#ffd300", "image": "/kunst.jpg", ingredients: {
        "bacon": "50 g",
        "løg": "2 stk",
        "hvidløg": "2 stk",
        "hakket oksekød": "500 g",
        "rødvin": "1 dl",
        "soltørrede tomater": "100 g",
        "balsamico": "2 spsk",
        "hakkede tomater": "2 dåser",
        "olie": "2 spsk",
        "pasta": "400 g",
        "parmesan": "75 g"
    }},
    "Laks med Rodfrugter": {"timeTotal": 60, "time": 15, "difficulty": "#ffd300", "health": "green", "image": "/kunst.jpg", ingredients: {
        "laks": "500 g",
        "kartoffel": "540 g",
        "rodfrugter": "1000 g",
        "løg": "2 stk",
        "olie": "4 spsk"
    }},
    "Nachos": {"timeTotal": 25, "time": 10, "difficulty": "green", "health": "red", "image": "/kunst.jpg", ingredients: {
        "nachos": "125 g",
        "oliven": "150 g",
        "cheddar": "200 g",
        "jalapenos": "2 spsk",
        "agurk": "0,5 stk",
        "koriander": "1 håndfuld",
        "tomat": "10 små stk",
        "majs": "1 dåse"
    }},
    "Avocado Sandwich": {"timeTotal": 25, "time": 10, "difficulty": "green", "health": "red", "image": "/kunst.jpg", ingredients: {
        "avocado": "1 stk",
        "lime": "1 stk",
        "smør": "1 tsk",
        "brød": "2 skiver",
        "ost": "2 skiver"
    }},
    "Pandekager": {"timeTotal": 60, "time": 60, "difficulty": "#ffd300", "health": "red", "image": "/kunst.jpg", ingredients: {
        "hvedemel": "500 g",
        "mælk": "2 dl",
        "øl": "1 dåse",
        "vaniljesukker": "2 spsk",
        "bagepulver": "1 spsk",
        "salt": "2 tsk",
        "smør": "til panden",
        "sukker": "til servering",
        "The corpses of your enemies": "3 stk"
    }},
}

// Get the recipe from the URL parameters
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const recipe = urlParams.get('recipe')
console.log(recipe);

// On document is loaded
$(document).ready(function() {
    // Update title of page 
    $(".title").text(recipe)
    document.title=recipe

    // Get the recipe
    let r = recipes[recipe]

    // Set the time to complete recipe, difficulty, and health
    $(".timeTotalValue").text(r["timeTotal"])
    $(".timeWorkValue").text(r["time"])
    $(".difficultySvg").css({ fill: r["difficulty"] })
    $(".healthSvg").css({ fill: r["health"]})

    // Create template steps for recipe, and append them to the list of steps in the recipe
    for (let i = 0; i < 5; i++) {
        let step = $(".tempStep").clone()
        step.toggleClass("hide")
        step.toggleClass("tempStep")

        $(".stepList").append(step)
    }

    // Append the ingredients to the list of ingredients
    for (const [ingredient, quantity] of Object.entries(r["ingredients"])) {
        $(".ingredientList").append(`<li>${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: ${quantity}</li>`)
    }
})