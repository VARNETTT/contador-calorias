// ==========================================
// CALORIETRACK - SCRIPT.JS
// ==========================================

// ==========================================
// BASE DE DATOS DE ALIMENTOS
// ==========================================

const foods = {

    // Carnes
    asado: {
        calories: 420,
        protein: 30,
        portion: 150,
        unit: "g"
    },

    carne: {
        calories: 350,
        protein: 30,
        portion: 150,
        unit: "g"
    },

    vacio: {
        calories: 400,
        protein: 29,
        portion: 150,
        unit: "g"
    },

    entraña: {
        calories: 380,
        protein: 27,
        portion: 150,
        unit: "g"
    },

    costilla: {
        calories: 420,
        protein: 28,
        portion: 150,
        unit: "g"
    },

    chorizo: {
        calories: 300,
        protein: 15,
        portion: 1,
        unit: "unidad"
    },

    pollo: {
        calories: 250,
        protein: 31,
        portion: 150,
        unit: "g"
    },

    milanesaPollo: {
        calories: 330,
        protein: 27,
        portion: 1,
        unit: "unidad"
    },

    milanesaCarne: {
        calories: 350,
        protein: 25,
        portion: 1,
        unit: "unidad"
    },

    cerdo: {
        calories: 300,
        protein: 27,
        portion: 150,
        unit: "g"
    },

    bondiola: {
        calories: 360,
        protein: 25,
        portion: 150,
        unit: "g"
    },

        // Huevos
    huevo: {
        calories: 75,
        protein: 6,
        portion: 1,
        unit: "unidad"
    },

    // Carbohidratos
    arroz: {
    calories: 210,
    protein: 4,
    portion: 1,
    unit: "taza",

    measures: {
        taza: 1,
        plato: 2
        }
    },

    pasta: {
        calories: 260,
        protein: 9,
        portion: 1,
        unit: "porción"
    },

    fideos: {
        calories: 260,
        protein: 9,
        portion: 1,
        unit: "porción"
    },

    papa: {
        calories: 160,
        protein: 4,
        portion: 1,
        unit: "unidad"
    },

    purePapa: {
        calories: 220,
        protein: 4,
        portion: 200,
        unit: "g"
    },

    pureZapallo: {
        calories: 90,
        protein: 2,
        portion: 200,
        unit: "g"
    },

    pureMixto: {
        calories: 150,
        protein: 3,
        portion: 200,
        unit: "g"
    },

    lentejas: {
    calories: 230,
    protein: 16,
    portion: 1,
    unit: "taza",

    measures: {
        taza: 1,
        plato: 2
    }
}, 

    // Lácteos
    queso: {
        calories: 110,
        protein: 7,
        portion: 30,
        unit: "g"
    },

    leche: {
    calories: 120,
    protein: 6,
    portion: 1,
    unit: "vaso",

    measures: {
        vaso: 1,
        taza: 0.8
    }
},

    yogur: {
        calories: 120,
        protein: 6,
        portion: 1,
        unit: "unidad"
    },

        quesoUntable: {
        calories: 65,
        protein: 2,
        portion: 30,
        unit: "g"
    },

    manteca: {
        calories: 108,
        protein: 0,
        portion: 15,
        unit: "g"
    },

    mermelada: {
        calories: 50,
        protein: 0,
        portion: 20,
        unit: "g"
    },

    dulceDeLeche: {
        calories: 65,
        protein: 1.5,
        portion: 20,
        unit: "g"
    },





    // Pan
    pan: {
        calories: 140,
        protein: 5,
        portion: 2,
        unit: "rebanadas"
    },

    tostada: {
    calories: 70,
    protein: 2.5,
    portion: 1,
    unit: "unidad"
},

    // Frutas
    banana: {
        calories: 105,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    manzana: {
        calories: 95,
        protein: 0.5,
        portion: 1,
        unit: "unidad"
    },

    naranja: {
        calories: 70,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    pera: {
        calories: 100,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    // Verduras
    tomate: {
        calories: 25,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    cebolla: {
        calories: 40,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    lechuga: {
        calories: 15,
        protein: 1,
        portion: 1,
        unit: "porción"
    },

    zanahoria: {
        calories: 35,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    morron: {
        calories: 30,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    palta: {
        calories: 160,
        protein: 2,
        portion: 1,
        unit: "unidad"
    },

        // Más alimentos
    avena: {
        calories: 150,
        protein: 5,
        portion: 40,
        unit: "g"
    },

    panLactal: {
        calories: 130,
        protein: 5,
        portion: 2,
        unit: "rebanadas"
    },

    batata: {
        calories: 180,
        protein: 3,
        portion: 1,
        unit: "unidad"
    },

    zapallo: {
        calories: 50,
        protein: 1,
        portion: 200,
        unit: "g"
    },

    brocoli: {
        calories: 70,
        protein: 5,
        portion: 200,
        unit: "g"
    },

    espinaca: {
        calories: 45,
        protein: 6,
        portion: 200,
        unit: "g"
    },

    pepino: {
        calories: 30,
        protein: 1,
        portion: 1,
        unit: "unidad"
    },

    repollo: {
        calories: 50,
        protein: 3,
        portion: 200,
        unit: "g"
    },

    huevoFrito: {
        calories: 110,
        protein: 6,
        portion: 1,
        unit: "unidad"
    },

    huevoRevuelto: {
        calories: 100,
        protein: 7,
        portion: 1,
        unit: "unidad"
    },

    jamon: {
        calories: 45,
        protein: 7,
        portion: 30,
        unit: "g"
    },

    salame: {
        calories: 120,
        protein: 6,
        portion: 30,
        unit: "g"
    },

    mayonesa: {
        calories: 100,
        protein: 0,
        portion: 1,
        unit: "cucharada",

        measures: {
            cucharada: 1,
            cucharadita: 0.33
        }
    },

    ketchup: {
        calories: 20,
        protein: 0,
        portion: 1,
        unit: "cucharada",

        measures: {
            cucharada: 1,
            cucharadita: 0.33
        }
    },

    azucar: {
        calories: 20,
        protein: 0,
        portion: 1,
        unit: "cucharadita",

        measures: {
            cucharadita: 1,
            cucharada: 3
        }
    },












    // Otros
    
    aceite: {
    calories: 120,
    protein: 0,
    portion: 1,
    unit: "cucharada",

    measures: {
        cucharada: 1,
        cucharadita: 0.33
    }
},
    
    
    
    atun: {
        calories: 160,
        protein: 28,
        portion: 1,
        unit: "lata"
    },

    galletitas: {
        calories: 140,
        protein: 2,
        portion: 1,
        unit: "porción"
    }
};


// ==========================================
// NÚMEROS EN ESPAÑOL
// ==========================================

const numbers = {

    un: 1,
    uno: 1,
    una: 1,

    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
    diez: 10

};


// ==========================================
// NORMALIZAR TEXTO
// ==========================================

function normalize(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ==========================================
// OBTENER CANTIDAD
// ==========================================

function getQuantity(text, position) {

    const before = text.substring(
        Math.max(0, position - 40),
        position
    );

    // GRAMOS
    const gramsMatch = before.match(
        /(\d+(?:[.,]\d+)?)\s*(g|gr|gramo|gramos)\s*(?:de)?\s*$/
    );

    if (gramsMatch) {

        return parseFloat(
            gramsMatch[1].replace(",", ".")
        );

    }

    // NÚMERO
    const numberMatch = before.match(
        /(\d+(?:[.,]\d+)?)\s*$/
    );

    if (numberMatch) {

        return parseFloat(
            numberMatch[1].replace(",", ".")
        );

    }

    // NÚMEROS ESCRITOS
    for (const word in numbers) {

        const regex = new RegExp(
            "\\b" + word + "\\s*$"
        );

        if (regex.test(before)) {

            return numbers[word];

        }

    }

    // MEDIA / MEDIO
    if (
        before.endsWith("media ") ||
        before.endsWith("medio ")
    ) {

        return 0.5;

    }

    // POCO
    if (
        before.endsWith("poco ") ||
        before.endsWith("un poco ")
    ) {

        return 0.5;

    }

    // BASTANTE / MUCHO
    if (
        before.endsWith("bastante ") ||
        before.endsWith("mucho ")
    ) {

        return 1.35;

    }

    return 1;
}


// ==========================================
// OBTENER MEDIDA
// ==========================================

// ==========================================
// OBTENER MULTIPLICADOR SEGÚN MEDIDA
// ==========================================

function getMeasureMultiplier(text, position, food) {

    // Si el alimento no tiene medidas
    if (!food.measures) {
        return null;
    }

    const before = text.substring(
        Math.max(0, position - 50),
        position
    );

    // ==========================================
// CHORRITO
// ==========================================

if (
    food === foods.aceite &&
    (
        before.includes("chorrito") ||
        before.includes("un chorrito")
    )
) {

    return 0.5;
}

    // ==========================================
    // RECORRER LAS MEDIDAS
    // ==========================================

    for (const measure in food.measures) {

        const baseValue =
            food.measures[measure];

        // ==========================================
        // MEDIA / MEDIO
        // ==========================================

        if (
            before.includes(`media ${measure}`) ||
            before.includes(`medio ${measure}`)
        ) {

            return baseValue * 0.5;
        }


        // ==========================================
        // NÚMEROS ESCRITOS
        // ==========================================

        for (const word in numbers) {

            const value =
                numbers[word];

            const pattern =
                new RegExp(
                    `\\b${word}\\s+${measure}(?:s)?(?:\\s+de)?\\s*$`
                );

            if (
                pattern.test(before)
            ) {

                return baseValue * value;
            }
        }


        // ==========================================
        // NÚMEROS DIGITALES
        // ==========================================

        const numberMatch =
            before.match(
                new RegExp(
                    `(\\d+(?:[.,]\\d+)?)\\s+${measure}(?:s)?(?:\\s+de)?\\s*$`
                )
            );

        if (numberMatch) {

            const value =
                parseFloat(
                    numberMatch[1]
                        .replace(",", ".")
                );

            return baseValue * value;
        }

    }

    return null;
}


// ==========================================
// MULTIPLICADOR DE PORCIÓN
// ==========================================

function getPortionMultiplier() {

    const selected = document.querySelector(
        'input[name="portion"]:checked'
    );

    if (!selected) {

        return 1;

    }

    if (selected.value === "small") {

        return 0.7;

    }

    if (selected.value === "large") {

        return 1.35;

    }

    return 1;
}


// ==========================================
// ANALIZAR COMIDA
// ==========================================

function analyzeFood(description) {

    const originalText = normalize(description);

    let text = originalText;

    let calories = 0;
    let protein = 0;

    let found = [];

    let detected = {};


    // ==========================================
    // MILANESA DE POLLO
    // ==========================================

    if (
        text.includes("milanesa de pollo")
    ) {

        const position =
            text.indexOf("milanesa de pollo");

        const quantity =
            getQuantity(
                text,
                position
            );

        calories +=
            foods.milanesaPollo.calories *
            quantity;

        protein +=
            foods.milanesaPollo.protein *
            quantity;

        found.push(
            `${quantity}x milanesa de pollo`
        );

        detected.milanesaPollo = true;

    }


    // ==========================================
    // MILANESA DE CARNE
    // ==========================================

    if (
        text.includes("milanesa de carne")
    ) {

        const position =
            text.indexOf("milanesa de carne");

        const quantity =
            getQuantity(
                text,
                position
            );

        calories +=
            foods.milanesaCarne.calories *
            quantity;

        protein +=
            foods.milanesaCarne.protein *
            quantity;

        found.push(
            `${quantity}x milanesa de carne`
        );

        detected.milanesaCarne = true;

    }


    // ==========================================
    // PURÉ MIXTO
    // ==========================================

    if (
        text.includes("pure mixto") ||
        (
            text.includes("pure de papa") &&
            text.includes("pure de zapallo")
        ) ||
        (
            text.includes("pure papa") &&
            text.includes("pure zapallo")
        )
    ) {

        calories +=
            foods.pureMixto.calories;

        protein +=
            foods.pureMixto.protein;

        found.push(
            "1x puré mixto de papa y zapallo"
        );

        detected.pure = true;

    }


    // ==========================================
    // PURÉ DE ZAPALLO
    // ==========================================

    else if (
        text.includes("pure de zapallo") ||
        text.includes("pure zapallo")
    ) {

        const position =
            text.indexOf("pure");

        const quantity =
            getQuantity(
                text,
                position
            );

        calories +=
            foods.pureZapallo.calories *
            quantity;

        protein +=
            foods.pureZapallo.protein *
            quantity;

        found.push(
            `${quantity}x puré de zapallo`
        );

        detected.pure = true;

    }


    // ==========================================
    // PURÉ DE PAPA
    // ==========================================

    else if (
        text.includes("pure de papa") ||
        text.includes("pure papa") ||
        text.includes("pure")
    ) {

        const position =
            text.indexOf("pure");

        const quantity =
            getQuantity(
                text,
                position
            );

        calories +=
            foods.purePapa.calories *
            quantity;

        protein +=
            foods.purePapa.protein *
            quantity;

        found.push(
            `${quantity}x puré de papa`
        );

        detected.pure = true;

    }

    // ==========================================
// ALIMENTOS ESPECÍFICOS
// ==========================================

// HUEVO FRITO
if (
    text.includes("huevo frito") ||
    text.includes("huevos fritos")
) {

    const position =
        text.indexOf("huevo");

    const quantity =
        getQuantity(
            text,
            position
        );

    calories +=
        foods.huevoFrito.calories *
        quantity;

    protein +=
        foods.huevoFrito.protein *
        quantity;

    found.push(
        `${quantity}x huevo frito`
    );

    detected.huevoFrito = true;
}


// HUEVO REVUELTO
if (
    text.includes("huevo revuelto") ||
    text.includes("huevos revueltos")
) {

    const position =
        text.indexOf("huevo");

    const quantity =
        getQuantity(
            text,
            position
        );

    calories +=
        foods.huevoRevuelto.calories *
        quantity;

    protein +=
        foods.huevoRevuelto.protein *
        quantity;

    found.push(
        `${quantity}x huevo revuelto`
    );

    detected.huevoRevuelto = true;
}


// PAN LACTAL
if (
    text.includes("pan lactal")
) {

    const position =
        text.indexOf("pan lactal");

    const quantity =
        getQuantity(
            text,
            position
        );

    calories +=
        foods.panLactal.calories *
        quantity;

    protein +=
        foods.panLactal.protein *
        quantity;

    found.push(
        `${quantity}x pan lactal`
    );

    detected.panLactal = true;
}

    // ==========================================
// SINÓNIMOS
// ==========================================

const aliases = {

    "queso untable": "quesoUntable",
    "queso crema": "quesoUntable",

    "dulce de leche": "dulceDeLeche",

    "pan lactal": "panLactal",

    "huevo frito": "huevoFrito",
    "huevos fritos": "huevoFrito",

    "huevo revuelto": "huevoRevuelto",
    "huevos revueltos": "huevoRevuelto"

};

for (const alias in aliases) {

    text =
        text.replaceAll(
            alias,
            aliases[alias]
        );
}


// ==========================================
// ALIMENTOS SIMPLES
// ==========================================







    // ==========================================
    // ALIMENTOS SIMPLES
    // ==========================================

    const simpleFoods = [

    // Carnes
    "asado",
    "carne",
    "vacio",
    "entraña",
    "costilla",
    "chorizo",
    "pollo",
    "cerdo",
    "bondiola",

    // Huevos
    "huevo",
    "huevoFrito",
    "huevoRevuelto",

    // Carbohidratos
    "arroz",
    "pasta",
    "fideos",
    "papa",
    "batata",
    "avena",
    "lentejas",

    // Panificados
    "pan",
    "panLactal",
    "tostada",

    // Lácteos
    "queso",
    "leche",
    "yogur",
    "quesoUntable",
    "manteca",
    "mermelada",
    "dulceDeLeche",

    // Frutas
    "banana",
    "manzana",
    "naranja",
    "pera",
    "palta",

    // Verduras
    "tomate",
    "cebolla",
    "lechuga",
    "zanahoria",
    "morron",
    "zapallo",
    "brocoli",
    "espinaca",
    "pepino",
    "repollo",

    // Carnes / fiambres
    "jamon",
    "salame",

    // Otros
    "aceite",
    "mayonesa",
    "ketchup",
    "azucar",
    "atun",
    "galletitas"

];


    simpleFoods.forEach(key => {

        // Evitar duplicar pollo de la milanesa
        if (
            key === "pollo" &&
            detected.milanesaPollo
        ) {

            return;

        }

        // Evitar duplicar carne de la milanesa
        if (
            key === "carne" &&
            detected.milanesaCarne
        ) {

            return;

        }

        // Evitar duplicar huevo en preparaciones específicas
if (
    key === "huevo" &&
    (
        detected.huevoFrito ||
        detected.huevoRevuelto
    )
) {

    return;

}


        // Evitar papa cuando hay puré
        if (
            key === "papa" &&
            detected.pure
        ) {

            return;

        }


        const normalizedKey =
            normalize(key);

        if (
            text.includes(normalizedKey)
        ) {

            const position =
                text.indexOf(normalizedKey);

            const quantity =
                getQuantity(
                    text,
                    position
                );

            let multiplier =
                quantity;


            // ==========================================
            // MEDIDAS COMO TAZA
            // ==========================================

            const measureMultiplier =
                getMeasureMultiplier(
                    text,
                    position,
                    foods[key]
                );

            if (
                measureMultiplier !== null
            ) {

                multiplier =
                    measureMultiplier;

            }


            // ==========================================
            // DETECTAR GRAMOS
            // ==========================================

            const before =
                text.substring(
                    Math.max(
                        0,
                        position - 40
                    ),
                    position
                );

            const gramsMatch =
                before.match(
                    /(\d+(?:[.,]\d+)?)\s*(g|gr|gramo|gramos)\s*(?:de)?\s*$/
                );


            if (
                gramsMatch
            ) {

                const grams =
                    parseFloat(
                        gramsMatch[1]
                            .replace(",", ".")
                    );

                multiplier =
                    grams /
                    foods[key].portion;

            }


            // ==========================================
            // SUMAR CALORÍAS Y PROTEÍNA
            // ==========================================

            calories +=
                foods[key].calories *
                multiplier;

            protein +=
                foods[key].protein *
                multiplier;


            // ==========================================
            // MOSTRAR LO DETECTADO
            // ==========================================

            if (
                gramsMatch
            ) {

                found.push(
                    `${gramsMatch[1]} g de ${key}`
                );

            }

            else if (
                measureMultiplier !== null
            ) {

                found.push(
                    `${measureMultiplier}x ${key}`
                );

            }

            else {

                found.push(
                    `${quantity}x ${key}`
                );

            }

        }

    });


    // ==========================================
    // ENSALADA
    // ==========================================

    if (
        text.includes("ensalada") &&
        !text.includes("tomate") &&
        !text.includes("cebolla") &&
        !text.includes("lechuga")
    ) {

        calories += 50;
        protein += 2;

        found.push(
            "ensalada"
        );

    }


    // ==========================================
    // PORCIÓN SELECCIONADA
    // ==========================================

    const portionMultiplier =
        getPortionMultiplier();

    calories *=
        portionMultiplier;

    protein *=
        portionMultiplier;


    return {

        found: found,

        calories:
            Math.round(calories),

        protein:
            Math.round(protein)

    };

}


// ==========================================
// MOSTRAR ESTIMACIÓN
// ==========================================

function showEstimate(description) {

    const result =
        analyzeFood(description);


    const caloriesElement =
        document.getElementById(
            "estimatedCalories"
        );

    const proteinElement =
        document.getElementById(
            "estimatedProtein"
        );

    const foodsElement =
        document.getElementById(
            "estimatedFoods"
        );

    const mealResult =
        document.getElementById(
            "mealResult"
        );


    mealResult.classList.add(
        "active"
    );


    if (
        result.found.length === 0
    ) {

        caloriesElement.textContent =
            "0";

        proteinElement.textContent =
            "0";

        foodsElement.textContent =
            "No pude reconocer los alimentos. Probá describirlos de otra manera.";

        window.currentMeal =
            null;

        return;

    }


    const minimumCalories =
        Math.round(
            result.calories * 0.85
        );

    const maximumCalories =
        Math.round(
            result.calories * 1.15
        );


    caloriesElement.textContent =
        `${minimumCalories} - ${maximumCalories}`;

    proteinElement.textContent =
        `${result.protein} g`;

    foodsElement.textContent =
        "Detecté: " +
        result.found.join(", ");


    window.currentMeal =
        result;

}


// ==========================================
// CUANDO CARGA LA PÁGINA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==========================================
        // BOTÓN COMENZAR
        // ==========================================

        const startBtn =
            document.getElementById(
                "startBtn"
            );

        if (
            startBtn
        ) {

            startBtn.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "comidas"
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        }


        // ==========================================
        // ABRIR MODAL
        // ==========================================

        const addMealBtn =
            document.getElementById(
                "addMealBtn"
            );

        const mealModal =
            document.getElementById(
                "mealModal"
            );

        if (
            addMealBtn
        ) {

            addMealBtn.addEventListener(
                "click",
                function () {

                    mealModal.classList.add(
                        "active"
                    );

                }
            );

        }


        // ==========================================
        // CERRAR MODAL
        // ==========================================

        const closeModal =
            document.getElementById(
                "closeModal"
            );

        if (
            closeModal
        ) {

            closeModal.addEventListener(
                "click",
                function () {

                    mealModal.classList.remove(
                        "active"
                    );

                }
            );

        }


        // ==========================================
        // FORMULARIO
        // ==========================================

        const mealForm =
            document.getElementById(
                "mealForm"
            );

        if (
            mealForm
        ) {

            mealForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const description =
                        document.getElementById(
                            "mealDescription"
                        ).value.trim();


                    if (
                        !description
                    ) {

                        alert(
                            "Escribí qué comiste."
                        );

                        return;

                    }


                    showEstimate(
                        description
                    );

                }
            );

        }


        // ==========================================
        // GUARDAR COMIDA
        // ==========================================

        const saveMealBtn =
            document.getElementById(
                "saveMealBtn"
            );

        if (
            saveMealBtn
        ) {

            saveMealBtn.addEventListener(
                "click",
                function () {


                    if (
                        !window.currentMeal
                    ) {

                        alert(
                            "Primero analizá una comida."
                        );

                        return;

                    }


                    const meal =
                        window.currentMeal;


                    // ==========================================
                    // CALORÍAS
                    // ==========================================

                    const caloriesConsumed =
                        document.getElementById(
                            "caloriesConsumed"
                        );

                    const currentCalories =
                        parseInt(
                            caloriesConsumed.textContent
                        ) || 0;

                    const newCalories =
                        currentCalories +
                        meal.calories;

                    caloriesConsumed.textContent =
                        newCalories;


                    // ==========================================
                    // PROTEÍNA
                    // ==========================================

                    const proteinConsumed =
                        document.getElementById(
                            "proteinConsumed"
                        );

                    const currentProtein =
                        parseInt(
                            proteinConsumed.textContent
                        ) || 0;

                    proteinConsumed.textContent =
                        currentProtein +
                        meal.protein;


                    // ==========================================
                    // COMIDAS
                    // ==========================================

                    const mealCount =
                        document.getElementById(
                            "mealCount"
                        );

                    const currentMealCount =
                        parseInt(
                            mealCount.textContent
                        ) || 0;

                    mealCount.textContent =
                        currentMealCount + 1;


                    // ==========================================
                    // CALORÍAS RESTANTES
                    // ==========================================

                    const calorieGoal =
                        parseInt(
                            document.getElementById(
                                "calorieGoal"
                            ).textContent
                        ) || 2200;


                    const remainingCalories =
                        document.getElementById(
                            "remainingCalories"
                        );


                    remainingCalories.textContent =
                        Math.max(
                            calorieGoal -
                            newCalories,
                            0
                        );


                    // ==========================================
                    // PROGRESO
                    // ==========================================

                    const progress =
                        Math.min(
                            (
                                newCalories /
                                calorieGoal
                            ) * 100,
                            100
                        );


                    document.getElementById(
                        "calorieProgress"
                    ).style.width =
                        `${progress}%`;


                    // ==========================================
                    // ELIMINAR ESTADO VACÍO
                    // ==========================================

                    const emptyState =
                        document.getElementById(
                            "emptyState"
                        );

                    if (
                        emptyState
                    ) {

                        emptyState.remove();

                    }


                    // ==========================================
                    // CREAR TARJETA
                    // ==========================================

                    const mealList =
                        document.getElementById(
                            "mealList"
                        );

                    const mealCard =
                        document.createElement(
                            "div"
                        );


                    mealCard.classList.add(
                        "meal-card"
                    );


                    const mealType =
                        document.getElementById(
                            "mealType"
                        ).value;


                    mealCard.innerHTML = `

                        <div class="meal-card-info">

                            <strong>
                                ${mealType}
                            </strong>

                            <p>
                                ${meal.found.join(", ")}
                            </p>

                        </div>

                        <div class="meal-card-nutrition">

                            <strong>
                                ${meal.calories} kcal
                            </strong>

                            <span>
                                ${meal.protein} g proteína
                            </span>

                        </div>

                    `;


                    mealList.appendChild(
                        mealCard
                    );


                    // ==========================================
                    // CERRAR MODAL
                    // ==========================================

                    mealModal.classList.remove(
                        "active"
                    );


                    // ==========================================
                    // LIMPIAR FORMULARIO
                    // ==========================================

                    mealForm.reset();


                    const normalPortion =
                        document.querySelector(
                            'input[name="portion"][value="normal"]'
                        );


                    if (
                        normalPortion
                    ) {

                        normalPortion.checked =
                            true;

                    }


                    document
                        .getElementById(
                            "mealResult"
                        )
                        .classList.remove(
                            "active"
                        );


                    window.currentMeal =
                        null;

                }
            );

        }

    }
);









async function buscarProductoOpenFoodFacts(codigoBarras) {

    try {

        const respuesta = await fetch(
            `https://world.openfoodfacts.org/api/v2/product/${codigoBarras}.json`
        );

        const datos = await respuesta.json();

        if (datos.status !== 1) {
            console.log("Producto no encontrado");
            return null;
        }

        const producto = datos.product;

        console.log("PRODUCTO ENCONTRADO");
        console.log("Nombre:", producto.product_name);
        console.log("Marca:", producto.brands);
        console.log("Calorías:", producto.nutriments?.["energy-kcal_100g"]);
        console.log("Proteínas:", producto.nutriments?.proteins_100g);

        return producto;

    } catch (error) {

        console.error(
            "Error conectando con Open Food Facts:",
            error
        );

        return null;
    }
}

const scanButton = document.getElementById("scanButton");
const scannerContainer = document.getElementById("scannerContainer");
const scannerStatus = document.getElementById("scannerStatus");

let html5QrCode = null;

scanButton.addEventListener("click", async () => {

    scannerContainer.style.display = "block";

    scannerStatus.textContent =
        "Apuntá la cámara al código de barras...";

    html5QrCode = new Html5Qrcode("scannerVideo");

    try {

        await html5QrCode.start(
            {
                facingMode: "environment"
            },

            {
                fps: 10,

                qrbox: {
                    width: 300,
                    height: 150
                },

                formatsToSupport: [
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.UPC_E
                ]
            },

            async (codigo) => {

                console.log("Código detectado:", codigo);

                scannerStatus.textContent =
                    "Código detectado: " + codigo;

                await html5QrCode.stop();

                scannerContainer.style.display = "none";

                buscarProductoOpenFoodFacts(codigo);

            },

            (errorMessage) => {

                // No hacemos nada.
                // Este mensaje aparece mientras busca el código.

            }
        );

    } catch (error) {

        console.error(
            "Error iniciando el escáner:",
            error
        );

        scannerStatus.textContent =
            "No se pudo iniciar el escáner.";

    }

});
