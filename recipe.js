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
        "sukker": "til servering"
    }},
}

swaps = [
    ["gulerod", "squash"],
    ["tomat", "tomat på dåse"],
    ["cheddar", "ost", "parmesan"],
    ["olie", "smør"]

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
            r.find(".time").text(info["timeTotal"])
            r.find(".difficultySvg").css({ fill: info["difficulty"] })
            r.find(".healthSvg").css({ fill: info["health"]})

            r.find(".recipeImage").attr("src",info["image"]);

            let missingIng = Object.keys(info.ingredients).filter(x => !selected.includes(x))
            console.log(missingIng)

            let swapCount = 0
            for (let ing of missingIng) {
                for (let swapList of swaps) {
                    if (swapList.includes(ing)) {
                        if (swapList.filter(value => selected.includes(value)).length > 0) {
                            // console.log(swapList)
                            swapCount++
                        }
                    }
                }
            }
            // console.log(swapCount)
            r.find(".replaceCount").text(swapCount)


            r.on("click", function() {
                window.location.replace("cook.html?recipe="+name);
            })
            
            card.find(".recipeList").append(r)
        }
        $(".cardContainer").append(card)
    }


    // $(".")
})

