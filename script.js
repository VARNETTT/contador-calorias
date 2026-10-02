// ==========================================
// CALORIETRACK
// SCRIPT COMPLETO
// ==========================================


// ==========================================
// BASE DE DATOS DE ALIMENTOS
// ==========================================

const foods = {

    // CARNES
    asado: {
        calories: 280,
        protein: 26,
        portion: 200,
        measures: {
            plato: 300
        }
    },

    carne: {
        calories: 250,
        protein: 26,
        portion: 150,
        measures: {
            plato: 250
        }
    },

    vacio: {
        calories: 290,
        protein: 26,
        portion: 200
    },

    entraña: {
        calories: 280,
        protein: 25,
        portion: 180
    },

    costilla: {
        calories: 300,
        protein: 24,
        portion: 200
    },

    chorizo: {
        calories: 320,
        protein: 14,
        portion: 100,
        measures: {
            unidad: 100
        }
    },

    pollo: {
        calories: 165,
        protein: 31,
        portion: 150,
        measures: {
            plato: 200
        }
    },

    cerdo: {
        calories: 242,
        protein: 27,
        portion: 150
    },

    bondiola: {
        calories: 280,
        protein: 25,
        portion: 150
    },


    // HUEVOS
    huevo: {
        calories: 78,
        protein: 6.3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    huevoFrito: {
        calories: 100,
        protein: 6.3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    huevoRevuelto: {
        calories: 95,
        protein: 6.5,
        portion: 1,
        measures: {
            unidad: 1
        }
    },


    // CARBOHIDRATOS
    arroz: {
        calories: 210,
        protein: 4,
        portion: 1,
        measures: {
            taza: 1,
            plato: 2,
            cucharada: 0.1
        }
    },

    pasta: {
        calories: 220,
        protein: 8,
        portion: 1,
        measures: {
            plato: 2
        }
    },

    fideos: {
        calories: 220,
        protein: 8,
        portion: 1,
        measures: {
            plato: 2
        }
    },

    papa: {
        calories: 130,
        protein: 3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    batata: {
        calories: 115,
        protein: 1.5,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    avena: {
        calories: 150,
        protein: 5,
        portion: 40,
        measures: {
            cucharada: 0.25,
            cucharadita: 0.08
        }
    },

    lentejas: {
        calories: 230,
        protein: 16,
        portion: 1,
        measures: {
            taza: 1,
            plato: 2
        }
    },


    // PAN
    pan: {
        calories: 80,
        protein: 3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    panLactal: {
        calories: 70,
        protein: 3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    tostada: {
        calories: 70,
        protein: 3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },


    // LÁCTEOS
    queso: {
        calories: 100,
        protein: 7,
        portion: 30
    },

    leche: {
        calories: 120,
        protein: 6,
        portion: 1,
        measures: {
            vaso: 1,
            taza: 0.8
        }
    },

    yogur: {
        calories: 100,
        protein: 5,
        portion: 1,
        measures: {
            vaso: 1
        }
    },

    quesoUntable: {
        calories: 50,
        protein: 2,
        portion: 30
    },

    manteca: {
        calories: 100,
        protein: 0,
        portion: 1,
        measures: {
            cucharada: 1,
            cucharadita: 0.33
        }
    },

    mermelada: {
        calories: 50,
        protein: 0,
        portion: 1,
        measures: {
            cucharada: 1
        }
    },

    dulceDeLeche: {
        calories: 60,
        protein: 1.5,
        portion: 1,
        measures: {
            cucharada: 1
        }
    },


    // FRUTAS
    banana: {
        calories: 105,
        protein: 1.3,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    manzana: {
        calories: 95,
        protein: 0.5,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    naranja: {
        calories: 62,
        protein: 1.2,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    pera: {
        calories: 100,
        protein: 0.6,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    palta: {
        calories: 160,
        protein: 2,
        portion: 100
    },


    // VERDURAS
    tomate: {
        calories: 22,
        protein: 1.1,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    cebolla: {
        calories: 40,
        protein: 1.1,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    lechuga: {
        calories: 15,
        protein: 1,
        portion: 1
    },

    zanahoria: {
        calories: 41,
        protein: 0.9,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    morron: {
        calories: 31,
        protein: 1,
        portion: 1,
        measures: {
            unidad: 1
        }
    },

    zapallo: {
        calories: 40,
        protein: 1,
        portion: 150
    },

    brocoli: {
        calories: 35,
        protein: 2.4,
        portion: 100
    },

    espinaca: {
        calories: 23,
        protein: 2.9,
        portion: 100
    },

    pepino: {
        calories: 15,
        protein: 0.7,
        portion: 100
    },

    repollo: {
        calories: 25,
        protein: 1.3,
        portion: 100
    },


    // FIAMBRES
    jamon: {
        calories: 120,
        protein: 18,
        portion: 50
    },

    salame: {
        calories: 400,
        protein: 22,
        portion: 50
    },


    // OTROS
    aceite: {
        calories: 120,
        protein: 0,
        portion: 1,
        measures: {
            cucharada: 1,
            cucharadita: 0.33,
            chorrito: 0.5
        }
    },

    mayonesa: {
        calories: 100,
        protein: 0,
        portion: 1,
        measures: {
            cucharada: 1,
            cucharadita: 0.33
        }
    },

    ketchup: {
        calories: 20,
        protein: 0,
        portion: 1,
        measures: {
            cucharada: 1,
            cucharadita: 0.33
        }
    },

    azucar: {
        calories: 20,
        protein: 0,
        portion: 1,
        measures: {
            cucharadita: 1,
            cucharada: 3
        }
    },

    atun: {
        calories: 130,
        protein: 28,
        portion: 100
    },

    galletitas: {
        calories: 130,
        protein: 2,
        portion: 30
    }

};


// ==========================================
// ALIAS
// ==========================================

const aliases = {

    "queso untable": "quesoUntable",
    "queso crema": "quesoUntable",

    "dulce de leche": "dulceDeLeche",

    "pan lactal": "panLactal",

    "huevo frito": "huevoFrito",
    "huevos fritos": "huevoFrito",

    "huevo revuelto": "huevoRevuelto",
    "huevos revueltos": "huevoRevuelto",

    "morron": "morron",
    "morrón": "morron"

};


// ==========================================
// ALIMENTOS SIMPLES
// ==========================================

const simpleFoods = [

    "asado",
    "carne",
    "vacio",
    "entraña",
    "costilla",
    "chorizo",
    "pollo",
    "cerdo",
    "bondiola",

    "huevo",
    "huevoFrito",
    "huevoRevuelto",

    "arroz",
    "pasta",
    "fideos",
    "papa",
    "batata",
    "avena",
    "lentejas",

    "pan",
    "panLactal",
    "tostada",

    "queso",
    "leche",
    "yogur",
    "quesoUntable",
    "manteca",
    "mermelada",
    "dulceDeLeche",

    "banana",
    "manzana",
    "naranja",
    "pera",
    "palta",

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

    "jamon",
    "salame",

    "aceite",
    "mayonesa",
    "ketchup",
    "azucar",
    "atun",
    "galletitas"

];


// ==========================================
// NÚMEROS EN ESPAÑOL
// ==========================================

const numbers = {

    "un": 1,
    "una": 1,

    "dos": 2,
    "tres": 3,
    "cuatro": 4,
    "cinco": 5,
    "seis": 6,
    "siete": 7,
    "ocho": 8,
    "nueve": 9,
    "diez": 10,

    "once": 11,
    "doce": 12,
    "trece": 13,
    "catorce": 14,
    "quince": 15

};


// ==========================================
// NORMALIZAR TEXTO
// ==========================================

function normalize(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


// ==========================================
// OBTENER CANTIDAD
// ==========================================

function getQuantity(text) {

    const normalized = normalize(text);


    if (
        normalized.includes("media ") ||
        normalized.includes("medio ")
    ) {

        return 0.5;

    }


    if (
        normalized.includes("poco ") ||
        normalized.includes("un poco ")
    ) {

        return 0.5;

    }


    if (
        normalized.includes("bastante ") ||
        normalized.includes("mucho ") ||
        normalized.includes("bien cargado") ||
        normalized.includes("bien cargada")
    ) {

        return 1.35;

    }


    const numberWords =
        Object.keys(numbers)
            .sort((a, b) => b.length - a.length);


    for (const word of numberWords) {

        const regex =
            new RegExp(`\\b${word}\\b`);

        if (regex.test(normalized)) {

            return numbers[word];

        }

    }


    const numberMatch =
        normalized.match(
            /(?:^|\s)(\d+(?:[.,]\d+)?)/ 
        );


    if (numberMatch) {

        return parseFloat(
            numberMatch[1].replace(",", ".")
        );

    }


    return 1;

}


// ==========================================
// MULTIPLICADOR DE MEDIDA
// ==========================================

function getMeasureMultiplier(text, foodKey) {

    const normalized =
        normalize(text);

    const food =
        foods[foodKey];


    if (!food || !food.measures) {

        return 1;

    }


    if (
        normalized.includes("cucharada") ||
        normalized.includes("cucharadas")
    ) {

        return food.measures.cucharada || 1;

    }


    if (
        normalized.includes("cucharadita") ||
        normalized.includes("cucharaditas")
    ) {

        return food.measures.cucharadita || 1;

    }


    if (normalized.includes("taza")) {

        return food.measures.taza || 1;

    }


    if (normalized.includes("plato")) {

        return food.measures.plato || 1;

    }


    if (normalized.includes("vaso")) {

        return food.measures.vaso || 1;

    }


    if (
        normalized.includes("unidad") ||
        normalized.includes("unidades")
    ) {

        return food.measures.unidad || 1;

    }


    if (normalized.includes("chorrito")) {

        return food.measures.chorrito || 1;

    }


    return 1;

}


// ==========================================
// MULTIPLICADOR DE PORCIÓN
// ==========================================

function getPortionMultiplier() {

    const selected =
        document.querySelector(
            'input[name="portion"]:checked'
        );


    if (!selected) {

        return 1;

    }


    if (selected.value === "poco") {

        return 0.7;

    }


    if (selected.value === "abundante") {

        return 1.35;

    }


    return 1;

}


// ==========================================
// ANALIZAR ALIMENTO
// ==========================================

function analyzeFood(text) {

    const normalized =
        normalize(text);


    const results = [];


    // --------------------------------------
    // ALIAS
    // --------------------------------------

    let searchText = normalized;

    const aliasEntries =
        Object.entries(aliases)
            .sort((a, b) => b[0].length - a[0].length);


    for (const [alias, key] of aliasEntries) {

        if (searchText.includes(normalize(alias))) {

            searchText =
                searchText.replace(
                    normalize(alias),
                    key.toLowerCase()
                );

        }

    }


    // --------------------------------------
    // DETECCIÓN ESPECIAL
    // --------------------------------------

    for (const foodKey of simpleFoods) {

        const food =
            foods[foodKey];

        if (!food) continue;


        let keyForSearch =
            normalize(foodKey);


        // Evitamos algunos falsos positivos
        if (
            foodKey === "huevoFrito" ||
            foodKey === "huevoRevuelto" ||
            foodKey === "panLactal" ||
            foodKey === "quesoUntable" ||
            foodKey === "dulceDeLeche"
        ) {

            continue;

        }


        if (
            searchText.includes(keyForSearch)
        ) {

            const cantidad =
                getQuantity(searchText);


            const medida =
                getMeasureMultiplier(
                    searchText,
                    foodKey
                );


            let factor =
                cantidad * medida;


            // Para alimentos expresados en gramos
            const gramsMatch =
                searchText.match(
                    /(\d+(?:[.,]\d+)?)\s*(gramos|gramo|g)\b/
                );


            if (gramsMatch) {

                const gramos =
                    parseFloat(
                        gramsMatch[1].replace(",", ".")
                    );

                factor =
                    gramos / 100;

                const calories =
                    food.calories * factor;

                const protein =
                    food.protein * factor;


                results.push({

                    name: foodKey,

                    calories: calories,

                    protein: protein

                });

                continue;

            }


            // Si es unidad / porción
            if (
                foodKey === "huevo" ||
                foodKey === "banana" ||
                foodKey === "manzana" ||
                foodKey === "naranja" ||
                foodKey === "pera" ||
                foodKey === "tomate" ||
                foodKey === "cebolla" ||
                foodKey === "zanahoria" ||
                foodKey === "morron" ||
                foodKey === "papa" ||
                foodKey === "batata"
            ) {

                results.push({

                    name: foodKey,

                    calories:
                        food.calories * factor,

                    protein:
                        food.protein * factor

                });

            } else {

                results.push({

                    name: foodKey,

                    calories:
                        food.calories * factor,

                    protein:
                        food.protein * factor

                });

            }

        }

    }


    // --------------------------------------
    // HUEVO FRITO
    // --------------------------------------

    if (
        searchText.includes("huevo frito") ||
        searchText.includes("huevos fritos")
    ) {

        const cantidad =
            getQuantity(searchText);

        results.push({

            name: "Huevo frito",

            calories:
                foods.huevoFrito.calories * cantidad,

            protein:
                foods.huevoFrito.protein * cantidad

        });

    }


    // --------------------------------------
    // HUEVO REVUELTO
    // --------------------------------------

    if (
        searchText.includes("huevo revuelto") ||
        searchText.includes("huevos revueltos")
    ) {

        const cantidad =
            getQuantity(searchText);

        results.push({

            name: "Huevo revuelto",

            calories:
                foods.huevoRevuelto.calories * cantidad,

            protein:
                foods.huevoRevuelto.protein * cantidad

        });

    }


    // --------------------------------------
    // PAN LACTAL
    // --------------------------------------

    if (
        searchText.includes("pan lactal")
    ) {

        const cantidad =
            getQuantity(searchText);

        results.push({

            name: "Pan lactal",

            calories:
                foods.panLactal.calories * cantidad,

            protein:
                foods.panLactal.protein * cantidad

        });

    }


    // --------------------------------------
    // TOSTADA
    // --------------------------------------

    if (
        searchText.includes("tostada") ||
        searchText.includes("tostadas")
    ) {

        const cantidad =
            getQuantity(searchText);

        results.push({

            name: "Tostada",

            calories:
                foods.tostada.calories * cantidad,

            protein:
                foods.tostada.protein * cantidad

        });

    }


    // --------------------------------------
    // PORCIÓN GENERAL
    // --------------------------------------

    const portionMultiplier =
        getPortionMultiplier();


    if (portionMultiplier !== 1) {

        for (const item of results) {

            item.calories *=
                portionMultiplier;

            item.protein *=
                portionMultiplier;

        }

    }


    return results;

}


// ==========================================
// ANALIZAR COMIDA COMPLETA
// ==========================================

function analyzeMeal(text) {

    const results =
        analyzeFood(text);


    // --------------------------------------
    // COMIDAS COMPUESTAS
    // --------------------------------------

    const normalized =
        normalize(text);


    // MILANESA DE POLLO
    if (
        normalized.includes("milanesa") &&
        normalized.includes("pollo")
    ) {

        const alreadyChicken =
            results.some(
                item =>
                    normalize(item.name) === "pollo"
            );


        if (!alreadyChicken) {

            results.push({

                name: "Milanesa de pollo",

                calories: 300,

                protein: 27

            });

        }

    }


    // MILANESA DE CARNE
    if (
        normalized.includes("milanesa") &&
        normalized.includes("carne")
    ) {

        results.push({

            name: "Milanesa de carne",

            calories: 350,

            protein: 25

        });

    }


    // PURÉ DE PAPA
    if (
        normalized.includes("pure de papa") ||
        normalized.includes("pure papa")
    ) {

        results.push({

            name: "Puré de papa",

            calories: 180,

            protein: 4

        });

    }


    // ENSALADA
    if (
        normalized.includes("ensalada")
    ) {

        // Si ya hay verduras detectadas,
        // no agregamos calorías extra.
        if (results.length === 0) {

            results.push({

                name: "Ensalada",

                calories: 60,

                protein: 2

            });

        }

    }


    return results;

}


// ==========================================
// MOSTRAR ESTIMACIÓN
// ==========================================

function showEstimate(results) {

    const resultSection =
        document.getElementById(
            "resultSection"
        );

    const estimatedCalories =
        document.getElementById(
            "estimatedCalories"
        );

    const estimatedProtein =
        document.getElementById(
            "estimatedProtein"
        );

    const estimatedFoods =
        document.getElementById(
            "estimatedFoods"
        );


    if (!results || results.length === 0) {

        alert(
            "No pude reconocer los alimentos. Probá describiéndolos de otra manera."
        );

        return null;

    }


    let totalCalories = 0;
    let totalProtein = 0;


    results.forEach(item => {

        totalCalories +=
            item.calories;

        totalProtein +=
            item.protein;

    });


    // Margen de estimación
    const caloriesMin =
        Math.round(
            totalCalories * 0.85
        );

    const caloriesMax =
        Math.round(
            totalCalories * 1.15
        );


    estimatedCalories.textContent =
        `${caloriesMin}-${caloriesMax}`;


    estimatedProtein.textContent =
        Math.round(totalProtein);


    estimatedFoods.innerHTML = "";


    results.forEach(item => {

        const div =
            document.createElement("div");

        div.textContent =
            `${item.name}: ${Math.round(item.calories)} kcal — ${item.protein.toFixed(1)} g proteína`;

        estimatedFoods.appendChild(div);

    });


    resultSection.style.display =
        "block";


    window.currentMeal = {

        foods: results,

        calories: totalCalories,

        protein: totalProtein

    };


    return window.currentMeal;

}


// ==========================================
// OPEN FOOD FACTS
// ==========================================

async function buscarProductoOpenFoodFacts(
    codigoBarras
) {

    try {

        const respuesta =
            await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${codigoBarras}.json`
            );


        if (!respuesta.ok) {

            return null;

        }


        const datos =
            await respuesta.json();


        if (datos.status !== 1) {

            console.log(
                "Producto no encontrado"
            );

            return null;

        }


        const producto =
            datos.product;


        console.log(
            "PRODUCTO ENCONTRADO"
        );

        console.log(
            "Nombre:",
            producto.product_name
        );

        console.log(
            "Marca:",
            producto.brands
        );

        console.log(
            "Calorías:",
            producto.nutriments?.[
                "energy-kcal_100g"
            ]
        );

        console.log(
            "Proteínas:",
            producto.nutriments?.[
                "proteins_100g"
            ]
        );


        return producto;


    } catch (error) {

        console.error(
            "Error conectando con Open Food Facts:",
            error
        );


        return null;

    }

}


// ==========================================
// EQUIVALENCIAS PARA PRODUCTOS ESCANEADOS
// ==========================================

function getProductUnitGrams(
    product,
    unit
) {

    const texto = (

        (product.product_name || "") +
        " " +
        (product.brands || "") +
        " " +
        (product.categories || "")

    ).toLowerCase();


    // AVENA
    if (
        texto.includes("avena") ||
        texto.includes("oat")
    ) {

        if (unit === "tbsp") return 10;
        if (unit === "tsp") return 3.3;
        if (unit === "unit") return 40;
        if (unit === "portion") return 40;

    }


    // AZÚCAR
    if (
        texto.includes("azucar") ||
        texto.includes("azúcar") ||
        texto.includes("sugar")
    ) {

        if (unit === "tbsp") return 12;
        if (unit === "tsp") return 4;
        if (unit === "unit") return 100;
        if (unit === "portion") return 12;

    }


    // HARINA
    if (
        texto.includes("harina") ||
        texto.includes("flour")
    ) {

        if (unit === "tbsp") return 8;
        if (unit === "tsp") return 2.7;
        if (unit === "unit") return 100;
        if (unit === "portion") return 30;

    }


    // ACEITE
    if (
        texto.includes("aceite") ||
        texto.includes("oil")
    ) {

        if (unit === "tbsp") return 13.5;
        if (unit === "tsp") return 4.5;
        if (unit === "unit") return 13.5;
        if (unit === "portion") return 13.5;

    }


    // LECHE
    if (
        texto.includes("leche") ||
        texto.includes("milk")
    ) {

        if (unit === "tbsp") return 15;
        if (unit === "tsp") return 5;
        if (unit === "unit") return 200;
        if (unit === "portion") return 200;

    }


    // YOGUR
    if (
        texto.includes("yogur") ||
        texto.includes("yogurt")
    ) {

        if (unit === "tbsp") return 15;
        if (unit === "tsp") return 5;
        if (unit === "unit") return 125;
        if (unit === "portion") return 125;

    }


    // GALLETITAS
    if (
        texto.includes("galleta") ||
        texto.includes("cookie")
    ) {

        if (unit === "unit") return 10;
        if (unit === "portion") return 30;

    }


    // DEFAULT
    if (unit === "tbsp") return 10;
    if (unit === "tsp") return 3.3;
    if (unit === "unit") return 30;
    if (unit === "portion") return 30;


    return 1;

}


// ==========================================
// NOMBRE DE UNIDAD
// ==========================================

function getUnitName(unit) {

    if (unit === "tbsp") {
        return "cucharada";
    }

    if (unit === "tsp") {
        return "cucharadita";
    }

    if (unit === "unit") {
        return "unidad";
    }

    if (unit === "portion") {
        return "porción";
    }

    return "gramo";

}


// ==========================================
// CALCULAR PRODUCTO ESCANEADO
// ==========================================

function calculateScannedProduct() {

    if (!window.scannedProduct) {

        return;

    }


    const product =
        window.scannedProduct;


    const cantidad =
        parseFloat(
            document.getElementById(
                "productAmount"
            ).value
        ) || 0;


    const unidad =
        document.getElementById(
            "productUnit"
        ).value;


    const gramosPorUnidad =
        getProductUnitGrams(
            product,
            unidad
        );


    let gramos;


    if (unidad === "g") {

        gramos =
            cantidad;

    } else {

        gramos =
            cantidad *
            gramosPorUnidad;

    }


    const calorias100 =
        Number(
            product.nutriments?.[
                "energy-kcal_100g"
            ]
        ) || 0;


    const proteinas100 =
        Number(
            product.nutriments?.[
                "proteins_100g"
            ]
        ) || 0;


    const calorias =
        calorias100 *
        gramos /
        100;


    const proteinas =
        proteinas100 *
        gramos /
        100;


    document.getElementById(
        "scannedProductResult"
    ).innerHTML = `

        <strong>
            ${Math.round(calorias)} kcal
        </strong>

        <br>

        <span>
            ${proteinas.toFixed(1)} g de proteína
        </span>

    `;


    const conversionInfo =
        document.getElementById(
            "productConversionInfo"
        );


    if (unidad === "g") {

        conversionInfo.textContent =
            `${gramos.toFixed(0)} g`;

    } else {

        conversionInfo.textContent =
            `≈ ${gramos.toFixed(1)} g (${gramosPorUnidad} g por ${getUnitName(unidad)})`;

    }


    window.scannedProductResult = {

        nombre:
            product.product_name ||
            "Producto",

        marca:
            product.brands ||
            "",

        gramos:
            gramos,

        calorias:
            calorias,

        proteinas:
            proteinas

    };

}


// ==========================================
// ESCÁNER
// ==========================================

let html5QrCode = null;


async function startScanner() {

    const scannerContainer =
        document.getElementById(
            "scannerContainer"
        );

    const scannerStatus =
        document.getElementById(
            "scannerStatus"
        );


    scannerContainer.style.display =
        "block";


    scannerStatus.textContent =
        "Solicitando acceso a la cámara...";


    try {

        html5QrCode =
            new Html5Qrcode(
                "scannerVideo"
            );


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


            async codigo => {

                console.log(
                    "Código detectado:",
                    codigo
                );


                scannerStatus.textContent =
                    "Código detectado: " +
                    codigo;


                try {

                    await html5QrCode.stop();

                } catch (error) {

                    console.log(error);

                }


                scannerContainer.style.display =
                    "none";


                scannerStatus.textContent =
                    "Buscando producto...";


                const producto =
                    await buscarProductoOpenFoodFacts(
                        codigo
                    );


                if (!producto) {

                    alert(
                        "No encontramos este producto en Open Food Facts."
                    );

                    return;

                }


                // Guardamos producto
                window.scannedProduct =
                    producto;


                // Mostrar nombre
                document.getElementById(
                    "scannedProductName"
                ).textContent =
                    producto.product_name ||
                    "Producto sin nombre";


                // Mostrar marca
                document.getElementById(
                    "scannedProductBrand"
                ).textContent =
                    producto.brands
                        ? "Marca: " +
                          producto.brands
                        : "";


                // Mostrar kcal
                document.getElementById(
                    "scannedProductCalories"
                ).textContent =
                    producto.nutriments?.[
                        "energy-kcal_100g"
                    ] || 0;


                // Mostrar proteína
                document.getElementById(
                    "scannedProductProtein"
                ).textContent =
                    producto.nutriments?.[
                        "proteins_100g"
                    ] || 0;


                // Mostrar panel
                document.getElementById(
                    "scannedProductContainer"
                ).style.display =
                    "block";


                // Valores iniciales
                document.getElementById(
                    "productAmount"
                ).value = 1;


                document.getElementById(
                    "productUnit"
                ).value = "g";


                calculateScannedProduct();

            },


            () => {

                // Los errores normales de lectura
                // no se muestran.

            }

        );


        scannerStatus.textContent =
            "📷 Cámara activa. Apuntá al código de barras.";


    } catch (error) {

        console.error(
            "Error iniciando cámara:",
            error
        );


        scannerStatus.textContent =
            "❌ No se pudo abrir la cámara: " +
            error.message;

    }

}


// ==========================================
// GUARDAR COMIDA
// ==========================================

function getMeals() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "calorietrack_meals"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveMeals(meals) {

    localStorage.setItem(
        "calorietrack_meals",
        JSON.stringify(meals)
    );

}


// ==========================================
// ACTUALIZAR DASHBOARD
// ==========================================

function updateDashboard() {

    const meals =
        getMeals();


    let totalCalories = 0;
    let totalProtein = 0;


    meals.forEach(meal => {

        totalCalories +=
            Number(meal.calories) || 0;

        totalProtein +=
            Number(meal.protein) || 0;

    });


    document.getElementById(
        "totalCalories"
    ).textContent =
        Math.round(totalCalories);


    document.getElementById(
        "totalProtein"
    ).textContent =
        Math.round(totalProtein);


    document.getElementById(
        "totalMeals"
    ).textContent =
        meals.length;


    renderMeals();

}


// ==========================================
// MOSTRAR COMIDAS
// ==========================================

function renderMeals() {

    const mealsList =
        document.getElementById(
            "mealsList"
        );


    const meals =
        getMeals();


    if (meals.length === 0) {

        mealsList.innerHTML = `

            <div
                id="emptyMeals"
                class="empty-state"
            >

                <p>
                    Todavía no agregaste ninguna comida.
                </p>

            </div>

        `;

        return;

    }


    mealsList.innerHTML = "";


    meals.forEach((meal, index) => {

        const card =
            document.createElement("div");


        card.className =
            "dashboard-card";


        card.innerHTML = `

            <span>
                ${meal.type || "Comida"}
            </span>

            <strong>
                ${Math.round(meal.calories)} kcal
            </strong>

            <small>
                ${Math.round(meal.protein)} g de proteína
            </small>

            <small>
                ${meal.description || ""}
            </small>

            <button
                type="button"
                class="secondary-btn delete-meal"
                data-index="${index}"
                style="margin-top: 10px;"
            >
                Eliminar
            </button>

        `;


        mealsList.appendChild(card);

    });


    document
        .querySelectorAll(".delete-meal")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const meals =
                        getMeals();


                    meals.splice(
                        index,
                        1
                    );


                    saveMeals(
                        meals
                    );


                    updateDashboard();

                }
            );

        });

}


// ==========================================
// MODAL
// ==========================================

function openModal() {

    document.getElementById(
        "mealModal"
    ).style.display =
        "flex";

}


function closeModal() {

    document.getElementById(
        "mealModal"
    ).style.display =
        "none";

}


// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ----------------------------------
        // BOTONES MODAL
        // ----------------------------------

        const openMealModal =
            document.getElementById(
                "openMealModal"
            );


        const openMealModal2 =
            document.getElementById(
                "openMealModal2"
            );


        const closeMealModal =
            document.getElementById(
                "closeMealModal"
            );


        openMealModal.addEventListener(
            "click",
            openModal
        );


        openMealModal2.addEventListener(
            "click",
            openModal
        );


        closeMealModal.addEventListener(
            "click",
            closeModal
        );


        // ----------------------------------
        // CERRAR MODAL AL TOCAR AFUERA
        // ----------------------------------

        document
            .getElementById("mealModal")
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "mealModal"
                    ) {

                        closeModal();

                    }

                }
            );


        // ----------------------------------
        // FORMULARIO
        // ----------------------------------

        const mealForm =
            document.getElementById(
                "mealForm"
            );


        mealForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const description =
                    document.getElementById(
                        "mealDescription"
                    ).value.trim();


                if (!description) {

                    alert(
                        "Escribí qué comiste."
                    );

                    return;

                }


                // Si existe producto escaneado
                // y fue usado, mantenemos ese resultado.
                if (
                    window.currentMeal &&
                    window.scannedProductResult
                ) {

                    showEstimate(
                        window.currentMeal.foods
                    );

                    return;

                }


                const results =
                    analyzeMeal(
                        description
                    );


                showEstimate(
                    results
                );

            }
        );


        // ----------------------------------
        // AGREGAR AL DÍA
        // ----------------------------------

        const saveMealBtn =
            document.getElementById(
                "saveMealBtn"
            );


        saveMealBtn.addEventListener(
            "click",
            () => {

                if (!window.currentMeal) {

                    alert(
                        "Primero analizá una comida."
                    );

                    return;

                }


                const mealType =
                    document.getElementById(
                        "mealType"
                    ).value;


                const description =
                    document.getElementById(
                        "mealDescription"
                    ).value;


                const meals =
                    getMeals();


                meals.push({

                    type:
                        mealType,

                    description:
                        description,

                    calories:
                        window.currentMeal.calories,

                    protein:
                        window.currentMeal.protein,

                    date:
                        new Date().toISOString()

                });


                saveMeals(
                    meals
                );


                updateDashboard();


                alert(
                    "✅ Comida agregada al día."
                );


                // Limpiar
                window.currentMeal =
                    null;


                window.scannedProduct =
                    null;


                window.scannedProductResult =
                    null;


                document.getElementById(
                    "mealDescription"
                ).value = "";


                document.getElementById(
                    "resultSection"
                ).style.display =
                    "none";


                closeModal();

            }
        );


        // ----------------------------------
        // ESCÁNER
        // ----------------------------------

        const scanButton =
            document.getElementById(
                "scanButton"
            );


        scanButton.addEventListener(
            "click",
            startScanner
        );


        // ----------------------------------
        // CAMBIAR CANTIDAD ESCANEADA
        // ----------------------------------

        document
            .getElementById(
                "productAmount"
            )
            .addEventListener(
                "input",
                calculateScannedProduct
            );


        document
            .getElementById(
                "productUnit"
            )
            .addEventListener(
                "change",
                calculateScannedProduct
            );


        // ----------------------------------
        // USAR PRODUCTO ESCANEADO
        // ----------------------------------

        document
            .getElementById(
                "useScannedProduct"
            )
            .addEventListener(
                "click",
                () => {

                    if (
                        !window.scannedProductResult
                    ) {

                        alert(
                            "Primero indicá cuánto consumiste."
                        );

                        return;

                    }


                    const producto =
                        window.scannedProductResult;


                    // Crear comida
                    window.currentMeal = {

                        foods: [

                            {

                                name:
                                    producto.nombre,

                                calories:
                                    producto.calorias,

                                protein:
                                    producto.proteinas

                            }

                        ],

                        calories:
                            producto.calorias,

                        protein:
                            producto.proteinas

                    };


                    // Mostrar descripción
                    document.getElementById(
                        "mealDescription"
                    ).value =

                        `${producto.nombre} - ${producto.gramos.toFixed(0)} g`;


                    // Mostrar resultado
                    document.getElementById(
                        "estimatedCalories"
                    ).textContent =
                        `${Math.round(producto.calorias)}`;


                    document.getElementById(
                        "estimatedProtein"
                    ).textContent =
                        producto.proteinas.toFixed(1);


                    document.getElementById(
                        "estimatedFoods"
                    ).innerHTML = `

                        <div>
                            ${producto.nombre}
                            — ${producto.gramos.toFixed(0)} g
                        </div>

                    `;


                    document.getElementById(
                        "resultSection"
                    ).style.display =
                        "block";


                    document.getElementById(
                        "scannedProductContainer"
                    ).style.display =
                        "none";


                    alert(
                        "✅ Producto agregado al análisis."
                    );

                }
            );


        // ----------------------------------
        // DASHBOARD INICIAL
        // ----------------------------------

        updateDashboard();

    }
);
