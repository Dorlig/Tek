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

swaps = [
    ["gulerod", "squash", "zuchini"],
    ["tomat", "tomat på dåse"],
    []

]

$(document).ready(function() {
    let selected = localStorage.getItem("selected").split(",") || []

    let recipeInfo = {}
    for (const [name, value] of Object.entries(recipes)) {
        let missingCount = 0;
        for (const [ingName, ingNum] of Object.entries(value.ingredients)) {
            if (! selected.includes(ingName)) missingCount += 1;
        }


        if (!recipeInfo.hasOwnProperty(missingCount)) {
            recipeInfo[missingCount] = {}
        }
        recipeInfo[missingCount][name] = value
    }

    console.log(recipeInfo)

    for (const [count, value] of Object.entries(recipeInfo)) {
        let card = $(".cardTemp").clone()
        card.toggleClass("hide")
        card.toggleClass("cardTemp")
        
        card.find(".missing").text(count)

        
        
        for (const [name, info] of Object.entries(value)) {
            console.log(count, name)

            let r = $(".recipeTemp").clone()
            r.toggleClass("hide")
            r.toggleClass("recipeTemp")
            
            r.find(".recipeName").text(name)

            r.on("click", function() {
                window.location.replace("cook.html?recipe="+name);
            })
            
            card.find(".recipeList").append(r)
        }
        $(".cardContainer").append(card)
    }


    // $(".")
})

