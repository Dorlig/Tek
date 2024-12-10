let recipes = {
    "Spaghetti Bolognese": {"timeTotal": 60, "time": 15, "difficulty": "green", "health": "yellow", ingredients: {
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
    "Laks med Rodfrugter": {"timeTotal": 60, "time": 15, "difficulty": "green", "health": "green", ingredients: {
        "laks": "500 g",
        "kartoffel": "540 g",
        "rodfrugter": "1000 g",
        "løg": "2 stk",
        "olie": "4 spsk"
    }},
    "Nachos": {"timeTotal": 25, "time": 10, "difficulty": "green", "health": "red", ingredients: {
        "nachos": "125 g",
        "oliven": "150 g",
        "cheddar": "200 g",
        "jalapenos": "2 spsk",
        "agurk": "0,5 stk",
        "koriander": "1 håndfuld",
        "tomat": "10 små stk",
        "majs": "1 dåse"
    }},
    "Avocado Sandwich": {"timeTotal": 25, "time": 10, "difficulty": "green", "health": "red", ingredients: {
        "avocado": "1 stk",
        "lime": "1 stk",
        "smør": "1 tsk",
        "brød": "2 skiver",
        "ost": "2 skiver"
    }},

}


const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const recipe = urlParams.get('recipe')
console.log(recipe);

$(document).ready(function() {
    $(".title").text(recipe)
    document.title=recipe
    let r = recipes[recipe]
    let ing = r["ingredients"]

    for (const [ingredient, quantity] of Object.entries(ing)) {
        $(".ingredientList").append(`<li>${ingredient}: ${quantity}</li>`)
    }
})