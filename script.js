// ==========================================
// CALORIETRACK
// SCRIPT.JS COMPLETO
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
        measures: { plato: 300 }
    },

    carne: {
        calories: 250,
        protein: 26,
        portion: 150,
        measures: { plato: 250 }
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
        measures: { unidad: 100 }
    },

    pollo: {
        calories: 165,
        protein: 31,
        portion: 150,
        measures: { plato: 200 }
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
        measures: { unidad: 1 }
    },

    huevoFrito: {
        calories: 100,
        protein: 6.3,
        portion: 1,
        measures: { unidad: 1 }
    },

    huevoRevuelto: {
        calories: 95,
        protein: 6.5,
        portion: 1,
        measures: { unidad: 1 }
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
        measures: { plato: 2 }
    },

    fideos: {
        calories: 220,
        protein: 8,
        portion: 1,
        measures: { plato: 2 }
    },

    papa: {
        calories: 130,
        protein: 3,
        portion: 1,
        measures: { unidad: 1 }
    },

    batata: {
        calories: 115,
        protein: 1.5,
        portion: 1,
        measures: { unidad: 1 }
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
        measures: { unidad: 1 }
    },

    panLactal: {
        calories: 70,
        protein: 3,
        portion: 1,
        measures: { unidad: 1 }
    },

    tostada: {
        calories: 70,
        protein: 3,
        portion: 1,
        measures: { unidad: 1 }
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
        measures: { vaso: 1 }
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
        measures: { cucharada: 1 }
    },

    dulceDeLeche: {
        calories: 60,
        protein: 1.5,
        portion: 1,
        measures: { cucharada: 1 }
    },


    // FRUTAS
    banana: {
        calories: 105,
        protein: 1.3,
        portion: 1,
        measures: { unidad: 1 }
    },

    manzana: {
        calories: 95,
        protein: 0.5,
        portion: 1,
        measures: { unidad: 1 }
    },

    naranja: {
        calories: 62,
        protein: 1.2,
        portion: 1,
        measures: { unidad: 1 }
    },

    pera: {
        calories: 100,
        protein: 0.6,
        portion: 1,
        measures: { unidad: 1 }
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
        measures: { unidad: 1 }
    },

    cebolla: {
        calories: 40,
        protein: 1.1,
        portion: 1,
        measures: { unidad: 1 }
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
        measures: { unidad: 1 }
    },

    morron: {
        calories: 31,
        protein: 1,
        portion: 1,
        measures: { unidad: 1 }
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

    const numberWords = Object.keys(numbers)
        .sort((a, b) => b.length - a.length);

    for (const word of numberWords) {

        const regex = new RegExp(`\\b${word}\\b`);

        if (regex.test(normalized)) {
            return numbers[word];
        }
    }

    const numberMatch =
        normalized.match(/(?:^|\s)(\d+(?:[.,]\d+)?)/);

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

    const normalized = normalize(text);
    const food = foods[foodKey];

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

    const normalized = normalize(text);
    const results = [];

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
    // ALIMENTOS SIMPLES
    // --------------------------------------

    for (const foodKey of simpleFoods) {

        const food = foods[foodKey];

        if (!food) continue;

        const keyForSearch =
            normalize(foodKey);

        // Estos se procesan por separado
        if (
            foodKey === "huevoFrito" ||
            foodKey === "huevoRevuelto" ||
            foodKey === "panLactal" ||
            foodKey === "quesoUntable" ||
            foodKey === "dulceDeLeche"
        ) {
            continue;
        }

        if (searchText.includes(keyForSearch)) {

            const cantidad =
                getQuantity(searchText);

            const medida =
                getMeasureMultiplier(
                    searchText,
                    foodKey
                );

            let factor =
                cantidad * medida;


            // GRAMOS
            const gramsMatch =
                searchText.match(
                    /(\d+(?:[.,]\d+)?)\s*(gramos|gramo|g)\b/
                );

            if (gramsMatch) {

                const gramos =
                    parseFloat(
                        gramsMatch[1].replace(",", ".")
                    );

                factor = gramos / 100;

                results.push({
                    name: foodKey,
                    calories:
                        food.calories * factor,
                    protein:
                        food.protein * factor
                });

                continue;
            }


            results.push({
                name: foodKey,
                calories:
                    food.calories * factor,
                protein:
                    food.protein * factor
            });
        }
    }


    // --------------------------------------
    // HUEVO FRITO
    // --------------------------------------

    if (
        normalized.includes("huevo frito") ||
        normalized.includes("huevos fritos")
    ) {

        const cantidad =
            getQuantity(normalized);

        results.push({
            name: "Huevo frito",
            calories:
                foods.huevoFrito.calories *
                cantidad,
            protein:
                foods.huevoFrito.protein *
                cantidad
        });
    }


    // --------------------------------------
    // HUEVO REVUELTO
    // --------------------------------------

    if (
        normalized.includes("huevo revuelto") ||
        normalized.includes("huevos revueltos")
    ) {

        const cantidad =
            getQuantity(normalized);

        results.push({
            name: "Huevo revuelto",
            calories:
                foods.huevoRevuelto.calories *
                cantidad,
            protein:
                foods.huevoRevuelto.protein *
                cantidad
        });
    }


    // --------------------------------------
    // PAN LACTAL
    // --------------------------------------

    if (normalized.includes("pan lactal")) {

        const cantidad =
            getQuantity(normalized);

        results.push({
            name: "Pan lactal",
            calories:
                foods.panLactal.calories *
                cantidad,
            protein:
                foods.panLactal.protein *
                cantidad
        });
    }


    // --------------------------------------
    // TOSTADA
    // --------------------------------------

    if (
        normalized.includes("tostada") ||
        normalized.includes("tostadas")
    ) {

        const cantidad =
            getQuantity(normalized);

        const yaExiste =
            results.some(
                item =>
                    normalize(item.name) ===
                    "tostada"
            );

        if (!yaExiste) {

            results.push({
                name: "Tostada",
                calories:
                    foods.tostada.calories *
                    cantidad,
                protein:
                    foods.tostada.protein *
                    cantidad
            });
        }
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
                    normalize(item.name) ===
                    "pollo"
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

        const alreadyMeat =
            results.some(
                item =>
                    normalize(item.name) ===
                    "carne"
            );

        if (!alreadyMeat) {

            results.push({
                name: "Milanesa de carne",
                calories: 350,
                protein: 25
            });
        }
    }


    // PURÉ DE PAPA
    if (
        normalized.includes("pure de papa") ||
        normalized.includes("pure papa")
    ) {

        const alreadyPotato =
            results.some(
                item =>
                    normalize(item.name) ===
                    "papa"
            );

        if (!alreadyPotato) {

            results.push({
                name: "Puré de papa",
                calories: 180,
                protein: 4
            });
        }
    }


    // ENSALADA
    if (normalized.includes("ensalada")) {

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
            Number(item.calories) || 0;

        totalProtein +=
            Number(item.protein) || 0;
    });

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
            `${item.name}: ${Math.round(item.calories)} kcal — ${Number(item.protein).toFixed(1)} g proteína`;

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
// EQUIVALENCIAS PRODUCTOS ESCANEADOS
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

    const amountElement =
        document.getElementById(
            "productAmount"
        );

    const unitElement =
        document.getElementById(
            "productUnit"
        );

    if (!amountElement || !unitElement) {
        return;
    }

    const cantidad =
        parseFloat(
            amountElement.value
        ) || 0;

    const unidad =
        unitElement.value;

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

    const resultElement =
        document.getElementById(
            "scannedProductResult"
        );

    if (resultElement) {

        resultElement.innerHTML = `
            <strong>
                ${Math.round(calorias)} kcal
            </strong>

            <br>

            <span>
                ${proteinas.toFixed(1)} g de proteína
            </span>
        `;
    }

    const conversionInfo =
        document.getElementById(
            "productConversionInfo"
        );

    if (conversionInfo) {

        if (unidad === "g") {

            conversionInfo.textContent =
                `${gramos.toFixed(0)} g`;

        } else {

            conversionInfo.textContent =
                `≈ ${gramos.toFixed(1)} g (${gramosPorUnidad} g por ${getUnitName(unidad)})`;
        }
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

    if (!scannerContainer || !scannerStatus) {
        return;
    }

    scannerContainer.style.display =
        "block";

    scannerStatus.textContent =
        "Solicitando acceso a la cámara...";

    try {

        if (
            typeof Html5Qrcode ===
            "undefined"
        ) {

            throw new Error(
                "No se cargó la librería del escáner."
            );
        }

        html5QrCode =
            new Html5Qrcode(
                "scannerVideo"
            );

        await html5QrCode.start(

            {
                facingMode:
                    "environment"
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

                    scannerStatus.textContent =
                        "Producto no encontrado.";

                    return;
                }

                window.scannedProduct =
                    producto;

                const nameElement =
                    document.getElementById(
                        "scannedProductName"
                    );

                const brandElement =
                    document.getElementById(
                        "scannedProductBrand"
                    );

                const caloriesElement =
                    document.getElementById(
                        "scannedProductCalories"
                    );

                const proteinElement =
                    document.getElementById(
                        "scannedProductProtein"
                    );

                const container =
                    document.getElementById(
                        "scannedProductContainer"
                    );

                if (nameElement) {

                    nameElement.textContent =
                        producto.product_name ||
                        "Producto sin nombre";
                }

                if (brandElement) {

                    brandElement.textContent =
                        producto.brands
                            ? "Marca: " +
                              producto.brands
                            : "";
                }

                if (caloriesElement) {

                    caloriesElement.textContent =
                        producto.nutriments?.[
                            "energy-kcal_100g"
                        ] || 0;
                }

                if (proteinElement) {

                    proteinElement.textContent =
                        producto.nutriments?.[
                            "proteins_100g"
                        ] || 0;
                }

                if (container) {

                    container.style.display =
                        "block";
                }

                const amount =
                    document.getElementById(
                        "productAmount"
                    );

                const unit =
                    document.getElementById(
                        "productUnit"
                    );

                if (amount) {
                    amount.value = 1;
                }

                if (unit) {
                    unit.value = "g";
                }

                calculateScannedProduct();
            },


            () => {
                // Errores normales de lectura
                // se ignoran.
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
// GUARDAR COMIDAS
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
// SABER SI UNA COMIDA ES DE HOY
// ==========================================

function isMealToday(meal) {

    if (!meal || !meal.date) {
        return false;
    }

    const mealDate =
        new Date(meal.date);

    const today =
        new Date();

    if (
        Number.isNaN(
            mealDate.getTime()
        )
    ) {
        return false;
    }

    return (
        mealDate.getFullYear() ===
            today.getFullYear() &&

        mealDate.getMonth() ===
            today.getMonth() &&

        mealDate.getDate() ===
            today.getDate()
    );
}


// ==========================================
// OBJETIVO CALÓRICO
// ==========================================

const GOAL_STORAGE_KEY =
    "calorietrack_goal";


function getGoal() {

    try {

        return JSON.parse(
            localStorage.getItem(
                GOAL_STORAGE_KEY
            )
        ) || null;

    } catch (error) {

        return null;
    }
}


function saveGoal(goal) {

    localStorage.setItem(
        GOAL_STORAGE_KEY,
        JSON.stringify(goal)
    );
}


// ==========================================
// ACTIVIDAD
// ==========================================

function getActivityLabel(factor) {

    const labels = {
        "1.2":
            "Sedentario",

        "1.375":
            "Actividad ligera",

        "1.55":
            "Actividad moderada",

        "1.725":
            "Actividad alta",

        "1.9":
            "Actividad muy alta"
    };

    return (
        labels[String(factor)] ||
        "Actividad seleccionada"
    );
}


// ==========================================
// CALCULAR OBJETIVO
// MIFFLIN-ST JEOR
// ==========================================

function calculateGoalCalories(
    weight,
    sex,
    height,
    age,
    activity,
    goalType
) {

    let bmr;

    // HOMBRE
    if (sex === "male") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

    // MUJER
    } else {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;
    }


    // Gasto energético diario estimado
    const tdee =
        bmr * activity;


    let targetCalories;
    let goalLabel;


    // DÉFICIT -15%
    if (goalType === "deficit") {

        targetCalories =
            tdee * 0.85;

        goalLabel =
            "Déficit calórico";


    // SUPERÁVIT +10%
    } else if (
        goalType === "surplus"
    ) {

        targetCalories =
            tdee * 1.10;

        goalLabel =
            "Superávit calórico";


    // MANTENIMIENTO
    } else {

        targetCalories =
            tdee;

        goalLabel =
            "Mantenimiento";
    }


    return {

        weight:
            weight,

        sex:
            sex,

        height:
            height,

        age:
            age,

        activity:
            activity,

        activityLabel:
            getActivityLabel(
                activity
            ),

        goalType:
            goalType,

        goalLabel:
            goalLabel,

        bmr:
            Math.round(bmr),

        tdee:
            Math.round(tdee),

        targetCalories:
            Math.round(
                targetCalories
            )
    };
}


// ==========================================
// MOSTRAR OBJETIVO
// ==========================================

function displayGoal(goal) {

    if (!goal) {
        return;
    }

    const goalResult =
        document.getElementById(
            "goalResult"
        );

    const goalCalories =
        document.getElementById(
            "goalCalories"
        );

    const goalBMR =
        document.getElementById(
            "goalBMR"
        );

    const goalTDEE =
        document.getElementById(
            "goalTDEE"
        );

    const goalExplanation =
        document.getElementById(
            "goalExplanation"
        );

    if (goalCalories) {

        goalCalories.textContent =
            Math.round(
                goal.targetCalories
            );
    }

    if (goalBMR) {

        goalBMR.textContent =
            Math.round(
                goal.bmr
            );
    }

    if (goalTDEE) {

        goalTDEE.textContent =
            Math.round(
                goal.tdee
            );
    }

    if (goalExplanation) {

        goalExplanation.textContent =
            `${goal.goalLabel} · ${goal.activityLabel}. ` +
            `El cálculo es una estimación basada en la fórmula Mifflin-St Jeor y el nivel de actividad seleccionado.`;
    }

    if (goalResult) {

        goalResult.style.display =
            "block";
    }
}


// ==========================================
// CARGAR OBJETIVO GUARDADO
// ==========================================

function loadSavedGoal() {

    const goal =
        getGoal();

    if (!goal) {
        return;
    }

    const goalWeight =
        document.getElementById(
            "goalWeight"
        );

    const goalSex =
        document.getElementById(
            "goalSex"
        );

    const goalHeight =
        document.getElementById(
            "goalHeight"
        );

    const goalAge =
        document.getElementById(
            "goalAge"
        );

    const goalActivity =
        document.getElementById(
            "goalActivity"
        );

    const goalType =
        document.getElementById(
            "goalType"
        );


    if (goalWeight) {
        goalWeight.value =
            goal.weight;
    }

    if (goalSex) {
        goalSex.value =
            goal.sex;
    }

    if (goalHeight) {
        goalHeight.value =
            goal.height;
    }

    if (goalAge) {
        goalAge.value =
            goal.age;
    }

    if (goalActivity) {
        goalActivity.value =
            goal.activity;
    }

    if (goalType) {
        goalType.value =
            goal.goalType;
    }

    displayGoal(goal);
}


// ==========================================
// TARJETA OBJETIVO DIARIO
// ==========================================

function updateDailyGoalCard(
    consumedCalories
) {

    const card =
        document.getElementById(
            "dailyGoalCard"
        );

    const consumed =
        document.getElementById(
            "dailyConsumedCalories"
        );

    const target =
        document.getElementById(
            "dailyTargetCalories"
        );

    const remaining =
        document.getElementById(
            "dailyRemainingCalories"
        );

    const progress =
        document.getElementById(
            "dailyProgress"
        );

    if (
        !card ||
        !consumed ||
        !target ||
        !remaining ||
        !progress
    ) {
        return;
    }

    const goal =
        getGoal();

    if (
        !goal ||
        !goal.targetCalories
    ) {

        card.style.display =
            "none";

        return;
    }


    const targetCalories =
        Number(
            goal.targetCalories
        ) || 0;

    const calories =
        Number(
            consumedCalories
        ) || 0;

    const difference =
        targetCalories -
        calories;


    consumed.textContent =
        Math.round(calories);

    target.textContent =
        Math.round(
            targetCalories
        );


    if (difference >= 0) {

        remaining.textContent =
            `${Math.round(difference)} kcal restantes`;

    } else {

        remaining.textContent =
            `${Math.round(Math.abs(difference))} kcal sobre el objetivo`;
    }


    const percentage =
        targetCalories > 0
            ? Math.min(
                (calories /
                    targetCalories) *
                    100,
                100
            )
            : 0;


    progress.style.width =
        `${percentage}%`;

    card.style.display =
        "block";
}


// ==========================================
// ACTUALIZAR DASHBOARD
// SOLO COMIDAS DE HOY
// ==========================================

function updateDashboard() {

    const meals =
        getMeals();

    const todayMeals =
        meals.filter(
            isMealToday
        );


    let totalCalories = 0;
    let totalProtein = 0;


    todayMeals.forEach(meal => {

        totalCalories +=
            Number(
                meal.calories
            ) || 0;

        totalProtein +=
            Number(
                meal.protein
            ) || 0;
    });


    const totalCaloriesElement =
        document.getElementById(
            "totalCalories"
        );

    const totalProteinElement =
        document.getElementById(
            "totalProtein"
        );

    const totalMealsElement =
        document.getElementById(
            "totalMeals"
        );


    if (totalCaloriesElement) {

        totalCaloriesElement.textContent =
            Math.round(
                totalCalories
            );
    }

    if (totalProteinElement) {

        totalProteinElement.textContent =
            Math.round(
                totalProtein
            );
    }

    if (totalMealsElement) {

        totalMealsElement.textContent =
            todayMeals.length;
    }


    updateDailyGoalCard(
        totalCalories
    );

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

    if (!mealsList) {
        return;
    }

    const meals =
        getMeals();

    const todayMeals =
        meals
            .map(
                (meal, originalIndex) => ({
                    meal,
                    originalIndex
                })
            )
            .filter(
                item =>
                    isMealToday(
                        item.meal
                    )
            );


    if (todayMeals.length === 0) {

        mealsList.innerHTML = `

            <div
                id="emptyMeals"
                class="empty-state"
            >
                <p>
                    Todavía no agregaste ninguna comida hoy.
                </p>
            </div>
        `;

        return;
    }


    mealsList.innerHTML = "";


    todayMeals.forEach(item => {

        const meal =
            item.meal;

        const originalIndex =
            item.originalIndex;

        const card =
            document.createElement(
                "div"
            );

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
                data-index="${originalIndex}"
                style="margin-top: 10px;"
            >
                Eliminar
            </button>
        `;

        mealsList.appendChild(
            card
        );
    });


    document
        .querySelectorAll(
            ".delete-meal"
        )
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

    const modal =
        document.getElementById(
            "mealModal"
        );

    if (modal) {

        modal.style.display =
            "flex";
    }
}


function closeModal() {

    const modal =
        document.getElementById(
            "mealModal"
        );

    if (modal) {

        modal.style.display =
            "none";
    }
}


// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ==================================
        // OBJETIVO DE CALORÍAS
        // ==================================

        const goalForm =
            document.getElementById(
                "goalForm"
            );


        if (goalForm) {

            goalForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const weight =
                        parseFloat(
                            document.getElementById(
                                "goalWeight"
                            ).value
                        );


                    const sex =
                        document.getElementById(
                            "goalSex"
                        ).value;


                    const height =
                        parseFloat(
                            document.getElementById(
                                "goalHeight"
                            ).value
                        );


                    const age =
                        parseInt(
                            document.getElementById(
                                "goalAge"
                            ).value,
                            10
                        );


                    const activity =
                        parseFloat(
                            document.getElementById(
                                "goalActivity"
                            ).value
                        );


                    const goalType =
                        document.getElementById(
                            "goalType"
                        ).value;


                    // VALIDACIONES

                    if (
                        !Number.isFinite(weight) ||
                        weight <= 0 ||
                        weight > 500
                    ) {

                        alert(
                            "Ingresá un peso válido."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(height) ||
                        height < 100 ||
                        height > 250
                    ) {

                        alert(
                            "Ingresá una altura válida en centímetros."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(age) ||
                        age < 13 ||
                        age > 120
                    ) {

                        alert(
                            "Ingresá una edad válida."
                        );

                        return;
                    }


                    if (
                        sex !== "male" &&
                        sex !== "female"
                    ) {

                        alert(
                            "Seleccioná el sexo biológico."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(
                            activity
                        )
                    ) {

                        alert(
                            "Seleccioná tu nivel de actividad."
                        );

                        return;
                    }


                    const goal =
                        calculateGoalCalories(
                            weight,
                            sex,
                            height,
                            age,
                            activity,
                            goalType
                        );


                    saveGoal(goal);

                    displayGoal(goal);

                    updateDashboard();


                    const resumen =
                        document.getElementById(
                            "resumen"
                        );

                    if (resumen) {

                        setTimeout(
                            () => {

                                resumen.scrollIntoView({
                                    behavior:
                                        "smooth",
                                    block:
                                        "start"
                                });

                            },
                            300
                        );
                    }
                }
            );
        }


        // ==================================
        // EDITAR OBJETIVO
        // ==================================

        const editGoalBtn =
            document.getElementById(
                "editGoalBtn"
            );


        if (editGoalBtn) {

            editGoalBtn.addEventListener(
                "click",
                () => {

                    const goalSection =
                        document.getElementById(
                            "objetivo"
                        );

                    if (goalSection) {

                        goalSection.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });
                    }


                    const weightInput =
                        document.getElementById(
                            "goalWeight"
                        );

                    if (weightInput) {

                        setTimeout(
                            () =>
                                weightInput.focus(),
                            400
                        );
                    }
                }
            );
        }


        // CARGAR OBJETIVO GUARDADO
        loadSavedGoal();


        // ==================================
        // BOTONES MODAL
        // ==================================

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


        if (openMealModal) {

            openMealModal.addEventListener(
                "click",
                openModal
            );
        }


        if (openMealModal2) {

            openMealModal2.addEventListener(
                "click",
                openModal
            );
        }


        if (closeMealModal) {

            closeMealModal.addEventListener(
                "click",
                closeModal
            );
        }


        // ==================================
        // CERRAR MODAL AL TOCAR AFUERA
        // ==================================

        const mealModal =
            document.getElementById(
                "mealModal"
            );


        if (mealModal) {

            mealModal.addEventListener(
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
        }


        // ==================================
        // ANALIZAR COMIDA
        // ==================================

        const mealForm =
            document.getElementById(
                "mealForm"
            );


        if (mealForm) {

            mealForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const descriptionElement =
                        document.getElementById(
                            "mealDescription"
                        );


                    const description =
                        descriptionElement
                            ? descriptionElement.value.trim()
                            : "";


                    if (!description) {

                        alert(
                            "Escribí qué comiste."
                        );

                        return;
                    }


                    // PRODUCTO ESCANEADO
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
        }


        // ==================================
        // AGREGAR COMIDA AL DÍA
        // ==================================

        const saveMealBtn =
            document.getElementById(
                "saveMealBtn"
            );


        if (saveMealBtn) {

            saveMealBtn.addEventListener(
                "click",
                () => {

                    if (
                        !window.currentMeal
                    ) {

                        alert(
                            "Primero analizá una comida."
                        );

                        return;
                    }


                    const mealTypeElement =
                        document.getElementById(
                            "mealType"
                        );


                    const descriptionElement =
                        document.getElementById(
                            "mealDescription"
                        );


                    const mealType =
                        mealTypeElement
                            ? mealTypeElement.value
                            : "Comida";


                    const description =
                        descriptionElement
                            ? descriptionElement.value
                            : "";


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


                    // LIMPIAR
                    window.currentMeal =
                        null;

                    window.scannedProduct =
                        null;

                    window.scannedProductResult =
                        null;


                    if (descriptionElement) {

                        descriptionElement.value =
                            "";
                    }


                    const resultSection =
                        document.getElementById(
                            "resultSection"
                        );


                    if (resultSection) {

                        resultSection.style.display =
                            "none";
                    }


                    const scannedContainer =
                        document.getElementById(
                            "scannedProductContainer"
                        );


                    if (scannedContainer) {

                        scannedContainer.style.display =
                            "none";
                    }


                    closeModal();
                }
            );
        }


        // ==================================
        // ESCÁNER
        // ==================================

        const scanButton =
            document.getElementById(
                "scanButton"
            );


        if (scanButton) {

            scanButton.addEventListener(
                "click",
                startScanner
            );
        }


        // ==================================
        // CANTIDAD PRODUCTO ESCANEADO
        // ==================================

        const productAmount =
            document.getElementById(
                "productAmount"
            );


        if (productAmount) {

            productAmount.addEventListener(
                "input",
                calculateScannedProduct
            );
        }


        // ==================================
        // UNIDAD PRODUCTO ESCANEADO
        // ==================================

        const productUnit =
            document.getElementById(
                "productUnit"
            );


        if (productUnit) {

            productUnit.addEventListener(
                "change",
                calculateScannedProduct
            );
        }


        // ==================================
        // USAR PRODUCTO ESCANEADO
        // ==================================

        const useScannedProduct =
            document.getElementById(
                "useScannedProduct"
            );


        if (useScannedProduct) {

            useScannedProduct.addEventListener(
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


                    // CREAR COMIDA
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


                    // DESCRIPCIÓN
                    const mealDescription =
                        document.getElementById(
                            "mealDescription"
                        );


                    if (mealDescription) {

                        mealDescription.value =
                            `${producto.nombre} - ${producto.gramos.toFixed(0)} g`;
                    }


                    // CALORÍAS
                    const estimatedCalories =
                        document.getElementById(
                            "estimatedCalories"
                        );


                    if (estimatedCalories) {

                        estimatedCalories.textContent =
                            `${Math.round(producto.calorias)}`;
                    }


                    // PROTEÍNA
                    const estimatedProtein =
                        document.getElementById(
                            "estimatedProtein"
                        );


                    if (estimatedProtein) {

                        estimatedProtein.textContent =
                            producto.proteinas.toFixed(1);
                    }


                    // ALIMENTO
                    const estimatedFoods =
                        document.getElementById(
                            "estimatedFoods"
                        );


                    if (estimatedFoods) {

                        estimatedFoods.innerHTML = `
                            <div>
                                ${producto.nombre}
                                — ${producto.gramos.toFixed(0)} g
                            </div>
                        `;
                    }


                    // MOSTRAR RESULTADO
                    const resultSection =
                        document.getElementById(
                            "resultSection"
                        );


                    if (resultSection) {

                        resultSection.style.display =
                            "block";
                    }


                    // OCULTAR PRODUCTO ESCANEADO
                    const scannedContainer =
                        document.getElementById(
                            "scannedProductContainer"
                        );


                    if (scannedContainer) {

                        scannedContainer.style.display =
                            "none";
                    }


                    alert(
                        "✅ Producto agregado al análisis."
                    );
                }
            );
        }


        // ==================================
        // DASHBOARD INICIAL
        // ==================================

        updateDashboard();

    }
);



/* ==================================================
   CALORIETRACK - MEJORAS DE INTERFAZ
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // NUEVOS BOTONES "AGREGAR COMIDA"
    // ==================================================

    const mealModalUI = document.getElementById("mealModal");

    const extraMealButtons = [
        document.getElementById("headerAddMeal"),
        document.getElementById("dashboardAddMeal"),
        document.getElementById("mobileAddMeal")
    ];

    extraMealButtons.forEach((button) => {

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            if (!mealModalUI) {
                console.warn("No se encontró el modal mealModal.");
                return;
            }

            // Abrimos el modal de agregar comida
            mealModalUI.style.display = "flex";

            button.addEventListener("click", () => {

    if (!mealModalUI) {
        console.warn("No se encontró el modal mealModal.");
        return;
    }

    // Abrimos el modal de agregar comida
    mealModalUI.style.display = "flex";

});

        });

    });


    // ==================================================
    // ELEMENTOS DEL PROGRESO DIARIO
    // ==================================================

    const consumedElement =
        document.getElementById("dailyConsumedCalories");

    const targetElement =
        document.getElementById("dailyTargetCalories");

    const percentageElement =
        document.getElementById("dailyProgressPercentage");

    const progressElement =
        document.getElementById("dailyProgress");

    const goalLabel =
        document.getElementById("progressGoalLabel");

    const remainingElement =
        document.getElementById("dailyRemainingCalories");


    // ==================================================
    // CONVERTIR TEXTO A NÚMERO
    // ==================================================

    function textToNumber(element) {

        if (!element) {
            return 0;
        }

        /*
         * Ejemplo:
         *
         * "2050"       -> 2050
         * "2.050"      -> 2050
         * "2,050 kcal" -> 2050
         */

        const text = element.textContent
            .trim()
            .replace(/[^\d]/g, "");

        return Number(text) || 0;
    }


    // ==================================================
    // ACTUALIZAR INTERFAZ DEL PROGRESO
    // ==================================================

    function updateProgressPercentageUI() {

        if (
            !consumedElement ||
            !targetElement ||
            !percentageElement ||
            !progressElement
        ) {
            return;
        }


        const consumed =
            textToNumber(consumedElement);

        const target =
            textToNumber(targetElement);


        // ----------------------------------------------
        // TODAVÍA NO HAY OBJETIVO
        // ----------------------------------------------

        if (target <= 0) {

            percentageElement.textContent = "0%";

            progressElement.style.width = "0%";

            progressElement.style.background =
                "linear-gradient(90deg, #2563eb, #60a5fa)";

            percentageElement.style.color = "#2563eb";


            if (goalLabel) {

                goalLabel.textContent =
                    "Configurá tu objetivo";

            }


            if (remainingElement) {

                remainingElement.textContent =
                    "Configurá tu objetivo para comenzar";

                remainingElement.style.color =
                    "#2563eb";

            }

            return;
        }


        // ==================================================
        // CALCULAR PORCENTAJE
        // ==================================================

        const percentage =
            Math.round((consumed / target) * 100);


        percentageElement.textContent =
            `${percentage}%`;


        /*
         * Si consume más del objetivo podemos mostrar
         * 105%, 110%, etc.
         *
         * Pero la barra visual se detiene en 100%.
         */

        const visualPercentage =
            Math.min(
                Math.max(percentage, 0),
                100
            );


        progressElement.style.width =
            `${visualPercentage}%`;


        // ==================================================
        // MOSTRAR OBJETIVO ABAJO DE LA BARRA
        // ==================================================

        if (goalLabel) {

            goalLabel.textContent =
                `${target.toLocaleString("es-AR")} kcal`;

        }


        // ==================================================
        // CALORÍAS RESTANTES
        // ==================================================

        if (remainingElement) {

            const difference =
                target - consumed;


            if (difference > 0) {

                remainingElement.textContent =
                    `${difference.toLocaleString("es-AR")} kcal restantes`;

            }

            else if (difference === 0) {

                remainingElement.textContent =
                    "¡Llegaste a tu objetivo diario!";

            }

            else {

                remainingElement.textContent =
                    `Superaste tu objetivo por ${Math.abs(difference).toLocaleString("es-AR")} kcal`;

            }

        }


        // ==================================================
        // COLORES SEGÚN EL PROGRESO
        // ==================================================

        if (percentage >= 105) {

            // ROJO
            // Se pasó considerablemente del objetivo

            progressElement.style.background =
                "#dc2626";

            percentageElement.style.color =
                "#dc2626";

            if (remainingElement) {
                remainingElement.style.color =
                    "#dc2626";
            }

        }

        else if (percentage >= 100) {

            // VERDE
            // Llegó al objetivo

            progressElement.style.background =
                "#16a34a";

            percentageElement.style.color =
                "#16a34a";

            if (remainingElement) {
                remainingElement.style.color =
                    "#16a34a";
            }

        }

        else if (percentage >= 80) {

            // NARANJA
            // Está cerca del objetivo

            progressElement.style.background =
                "#f59e0b";

            percentageElement.style.color =
                "#f59e0b";

            if (remainingElement) {
                remainingElement.style.color =
                    "#f59e0b";
            }

        }

        else {

            // AZUL
            // Progreso normal

            progressElement.style.background =
                "linear-gradient(90deg, #2563eb, #60a5fa)";

            percentageElement.style.color =
                "#2563eb";

            if (remainingElement) {
                remainingElement.style.color =
                    "#2563eb";
            }

        }

    }


    // ==================================================
    // DETECTAR CAMBIOS AUTOMÁTICAMENTE
    // ==================================================

    /*
     * Tu código original ya actualiza:
     *
     * dailyConsumedCalories
     * dailyTargetCalories
     *
     * cuando agregás comidas o modificás el objetivo.
     *
     * MutationObserver observa esos números.
     *
     * Cada vez que cambian, recalculamos la interfaz.
     */

    const progressObserver =
        new MutationObserver(() => {

            updateProgressPercentageUI();

        });


    if (consumedElement) {

        progressObserver.observe(
            consumedElement,
            {
                childList: true,
                characterData: true,
                subtree: true
            }
        );

    }


    if (targetElement) {

        progressObserver.observe(
            targetElement,
            {
                childList: true,
                characterData: true,
                subtree: true
            }
        );

    }


    // ==================================================
    // ACTUALIZACIÓN INICIAL
    // ==================================================

    updateProgressPercentageUI();

});

/* ==================================================
   MODAL - MI OBJETIVO
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const goalModal =
        document.getElementById("goalModal");

    const openGoalButton =
        document.getElementById("openGoalModal");

    const mobileOpenGoalButton =
        document.getElementById("mobileOpenGoalModal");

    const closeGoalButton =
        document.getElementById("closeGoalModal");

    const goalModalOverlay =
        document.getElementById("goalModalOverlay");

    const finishGoalButton =
        document.getElementById("finishGoalBtn");


    // ==============================================
    // ABRIR
    // ==============================================

    function openGoalModal(event) {

        if (event) {
            event.preventDefault();
        }

        if (!goalModal) {
            return;
        }

        goalModal.classList.add("active");

    }


    // ==============================================
    // CERRAR
    // ==============================================

    function closeGoalModal() {

        if (!goalModal) {
            return;
        }

        goalModal.classList.remove("active");

    }


    // PC

    if (openGoalButton) {

        openGoalButton.addEventListener(
            "click",
            openGoalModal
        );

    }


    // CELULAR

    if (mobileOpenGoalButton) {

        mobileOpenGoalButton.addEventListener(
            "click",
            openGoalModal
        );

    }


    // X

    if (closeGoalButton) {

        closeGoalButton.addEventListener(
            "click",
            closeGoalModal
        );

    }


    // CLICK EN EL FONDO

    if (goalModalOverlay) {

        goalModalOverlay.addEventListener(
            "click",
            closeGoalModal
        );

    }


    // GUARDAR Y CERRAR

    if (finishGoalButton) {

        finishGoalButton.addEventListener(
            "click",
            closeGoalModal
        );

    }


    // ==============================================
    // TECLA ESC
    // ==============================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                goalModal &&
                goalModal.classList.contains("active")
            ) {

                closeGoalModal();

            }

        }
    );

});
