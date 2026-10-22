// ======================================================
// CALORIETRACK
// SCRIPT.JS COMPLETO
// Motor de alimentos + comidas + objetivos + scanner
// ======================================================


// ======================================================
// 1. BASE DE DATOS DE ALIMENTOS
// ======================================================

const foods = {

    // CARNES
    asado: {
        name: "Asado",
        calories: 280,
        protein: 26,
        portion: 200
    },

    carne: {
        name: "Carne",
        calories: 250,
        protein: 26,
        portion: 150
    },

    vacio: {
        name: "Vacío",
        calories: 290,
        protein: 26,
        portion: 200
    },

    entraña: {
        name: "Entraña",
        calories: 280,
        protein: 25,
        portion: 180
    },

    costilla: {
        name: "Costilla",
        calories: 300,
        protein: 24,
        portion: 200
    },

    chorizo: {
        name: "Chorizo",
        calories: 320,
        protein: 14,
        portion: 1
    },

    pollo: {
        name: "Pollo",
        calories: 248,
        protein: 46,
        portion: 150
    },

    cerdo: {
        name: "Cerdo",
        calories: 363,
        protein: 40,
        portion: 150
    },

    bondiola: {
        name: "Bondiola",
        calories: 420,
        protein: 37,
        portion: 150
    },


    // HUEVOS
    huevo: {
        name: "Huevo",
        calories: 78,
        protein: 6.3,
        portion: 1
    },

    huevoFrito: {
        name: "Huevo frito",
        calories: 100,
        protein: 6.3,
        portion: 1
    },

    huevoRevuelto: {
        name: "Huevo revuelto",
        calories: 95,
        protein: 6.5,
        portion: 1
    },


    // CARBOHIDRATOS
    arroz: {
        name: "Arroz",
        calories: 210,
        protein: 4,
        portion: 1
    },

    pasta: {
        name: "Pasta",
        calories: 220,
        protein: 8,
        portion: 1
    },

    fideos: {
        name: "Fideos",
        calories: 220,
        protein: 8,
        portion: 1
    },

    papa: {
        name: "Papa",
        calories: 130,
        protein: 3,
        portion: 1
    },

    batata: {
        name: "Batata",
        calories: 115,
        protein: 1.5,
        portion: 1
    },

    avena: {
        name: "Avena",
        calories: 150,
        protein: 5,
        portion: 40
    },

    lentejas: {
        name: "Lentejas",
        calories: 230,
        protein: 16,
        portion: 1
    },


    // PAN
    pan: {
        name: "Pan",
        calories: 80,
        protein: 3,
        portion: 1
    },

    panLactal: {
        name: "Pan lactal",
        calories: 70,
        protein: 3,
        portion: 1
    },

    tostada: {
        name: "Tostada",
        calories: 70,
        protein: 3,
        portion: 1
    },


    // LÁCTEOS
    queso: {
        name: "Queso",
        calories: 100,
        protein: 7,
        portion: 30
    },

    leche: {
        name: "Leche",
        calories: 120,
        protein: 6,
        portion: 200
    },

    yogur: {
        name: "Yogur",
        calories: 100,
        protein: 5,
        portion: 1
    },

    quesoUntable: {
        name: "Queso untable",
        calories: 50,
        protein: 2,
        portion: 30
    },

    manteca: {
        name: "Manteca",
        calories: 100,
        protein: 0,
        portion: 1
    },

    mermelada: {
        name: "Mermelada",
        calories: 50,
        protein: 0,
        portion: 1
    },

    dulceDeLeche: {
        name: "Dulce de leche",
        calories: 60,
        protein: 1.5,
        portion: 1
    },


    // BEBIDAS
    cafe: {
        name: "Café",
        calories: 2,
        protein: 0.3,
        portion: 1
    },


    // FRUTAS
    banana: {
        name: "Banana",
        calories: 105,
        protein: 1.3,
        portion: 1
    },

    manzana: {
        name: "Manzana",
        calories: 95,
        protein: 0.5,
        portion: 1
    },

    naranja: {
        name: "Naranja",
        calories: 62,
        protein: 1.2,
        portion: 1
    },

    pera: {
        name: "Pera",
        calories: 100,
        protein: 0.6,
        portion: 1
    },

    palta: {
        name: "Palta",
        calories: 160,
        protein: 2,
        portion: 100
    },


    // VERDURAS
    tomate: {
        name: "Tomate",
        calories: 22,
        protein: 1.1,
        portion: 1
    },

    cebolla: {
        name: "Cebolla",
        calories: 40,
        protein: 1.1,
        portion: 1
    },

    lechuga: {
        name: "Lechuga",
        calories: 15,
        protein: 1,
        portion: 1
    },

    zanahoria: {
        name: "Zanahoria",
        calories: 41,
        protein: 0.9,
        portion: 1
    },

    morron: {
        name: "Morrón",
        calories: 31,
        protein: 1,
        portion: 1
    },

    zapallo: {
        name: "Zapallo",
        calories: 40,
        protein: 1,
        portion: 150
    },

    brocoli: {
        name: "Brócoli",
        calories: 35,
        protein: 2.4,
        portion: 100
    },

    espinaca: {
        name: "Espinaca",
        calories: 23,
        protein: 2.9,
        portion: 100
    },

    pepino: {
        name: "Pepino",
        calories: 15,
        protein: 0.7,
        portion: 100
    },

    repollo: {
        name: "Repollo",
        calories: 25,
        protein: 1.3,
        portion: 100
    },


    // FIAMBRES
    jamon: {
        name: "Jamón",
        calories: 120,
        protein: 18,
        portion: 50
    },

    salame: {
        name: "Salame",
        calories: 400,
        protein: 22,
        portion: 50
    },


    // OTROS
    aceite: {
        name: "Aceite",
        calories: 120,
        protein: 0,
        portion: 1
    },

    mayonesa: {
        name: "Mayonesa",
        calories: 100,
        protein: 0,
        portion: 1
    },

    ketchup: {
        name: "Ketchup",
        calories: 20,
        protein: 0,
        portion: 1
    },

    azucar: {
        name: "Azúcar",
        calories: 20,
        protein: 0,
        portion: 1
    },

    atun: {
        name: "Atún",
        calories: 130,
        protein: 28,
        portion: 100
    },

    galletitas: {
        name: "Galletitas",
        calories: 130,
        protein: 2,
        portion: 30
    },

    gelatina: {
        name: "Gelatina",
        calories: 70,
        protein: 1.5,
        portion: 1
    }
};


// ======================================================
// 2. NÚMEROS EN ESPAÑOL
// ======================================================

const numbers = {
    un: 1,
    una: 1,
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
    diez: 10,
    once: 11,
    doce: 12,
    trece: 13,
    catorce: 14,
    quince: 15
};


// ======================================================
// 3. NORMALIZAR TEXTO
// ======================================================

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,;:!?]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// ======================================================
// 4. DEFINICIONES PARA RECONOCER ALIMENTOS
// ======================================================

const foodDefinitions = [

    { key: "huevoFrito", terms: ["huevos fritos", "huevo frito"] },

    {
        key: "huevoRevuelto",
        terms: ["huevos revueltos", "huevo revuelto"]
    },

    { key: "panLactal", terms: ["pan lactal"] },

    {
        key: "quesoUntable",
        terms: ["queso untable", "queso crema"]
    },

    {
        key: "dulceDeLeche",
        terms: ["dulce de leche"]
    },

    { key: "asado", terms: ["asado"] },
    { key: "carne", terms: ["carne"] },
    { key: "vacio", terms: ["vacio"] },
    { key: "entraña", terms: ["entrana"] },
    { key: "costilla", terms: ["costillas", "costilla"] },
    { key: "chorizo", terms: ["chorizos", "chorizo"] },
    { key: "pollo", terms: ["pollo"] },
    { key: "cerdo", terms: ["cerdo"] },
    { key: "bondiola", terms: ["bondiola"] },

    { key: "huevo", terms: ["huevos", "huevo"] },

    { key: "arroz", terms: ["arroz"] },
    { key: "pasta", terms: ["pastas", "pasta"] },
    { key: "fideos", terms: ["fideos", "fideo"] },
    { key: "papa", terms: ["papas", "papa"] },
    { key: "batata", terms: ["batatas", "batata"] },
    { key: "avena", terms: ["avena"] },
    { key: "lentejas", terms: ["lentejas", "lenteja"] },

    { key: "tostada", terms: ["tostadas", "tostada"] },
    { key: "pan", terms: ["pan"] },

    { key: "queso", terms: ["queso"] },
    { key: "leche", terms: ["leche"] },
    { key: "yogur", terms: ["yogurt", "yogur"] },
    { key: "manteca", terms: ["manteca"] },
    { key: "mermelada", terms: ["mermelada"] },

    { key: "cafe", terms: ["cafe"] },

    { key: "banana", terms: ["bananas", "banana"] },
    { key: "manzana", terms: ["manzanas", "manzana"] },
    { key: "naranja", terms: ["naranjas", "naranja"] },
    { key: "pera", terms: ["peras", "pera"] },
    { key: "palta", terms: ["paltas", "palta"] },

    { key: "tomate", terms: ["tomates", "tomate"] },
    { key: "cebolla", terms: ["cebollas", "cebolla"] },
    { key: "lechuga", terms: ["lechuga"] },
    { key: "zanahoria", terms: ["zanahorias", "zanahoria"] },
    { key: "morron", terms: ["morrones", "morron"] },
    { key: "zapallo", terms: ["zapallo"] },
    { key: "brocoli", terms: ["brocoli"] },
    { key: "espinaca", terms: ["espinaca"] },
    { key: "pepino", terms: ["pepinos", "pepino"] },
    { key: "repollo", terms: ["repollo"] },

    { key: "jamon", terms: ["jamon"] },
    { key: "salame", terms: ["salame"] },

    { key: "aceite", terms: ["aceite"] },
    { key: "mayonesa", terms: ["mayonesa"] },
    { key: "ketchup", terms: ["ketchup"] },
    { key: "azucar", terms: ["azucar"] },
    { key: "atun", terms: ["atun"] },
    { key: "galletitas", terms: ["galletitas", "galletita"] },
    { key: "gelatina", terms: ["gelatina"] }
];


// ======================================================
// 5. DETECTAR NÚMERO EN UN FRAGMENTO
// ======================================================

function findNumber(text) {

    const normalized = normalize(text);

    const numeric =
        normalized.match(/\b(\d+(?:[.,]\d+)?)\b/);

    if (numeric) {

        return parseFloat(
            numeric[1].replace(",", ".")
        );
    }


    for (const [word, value] of Object.entries(numbers)) {

        const regex =
            new RegExp(`\\b${word}\\b`);

        if (regex.test(normalized)) {
            return value;
        }
    }


    if (
        /\bmedia\b/.test(normalized) ||
        /\bmedio\b/.test(normalized)
    ) {
        return 0.5;
    }


    return null;
}


// ======================================================
// 6. BUSCAR CANTIDAD ESPECÍFICA DEL ALIMENTO
// ======================================================

function getFoodQuantity(text, termPosition) {

    const normalized =
        normalize(text);

    const before =
        normalized.substring(
            Math.max(0, termPosition - 45),
            termPosition
        );


    const numericMatch =
        before.match(
            /(\d+(?:[.,]\d+)?)\s*(?:unidades?\s*)?$/
        );


    if (numericMatch) {

        return parseFloat(
            numericMatch[1].replace(",", ".")
        );
    }


    const words =
        Object.keys(numbers)
            .sort(
                (a, b) =>
                    b.length - a.length
            );


    for (const word of words) {

        const regex =
            new RegExp(
                `\\b${word}\\s*$`
            );

        if (regex.test(before)) {
            return numbers[word];
        }
    }


    if (/\b(media|medio)\s*$/.test(before)) {
        return 0.5;
    }


    return 1;
}


// ======================================================
// 7. DETECTAR GRAMOS / ML CERCANOS AL ALIMENTO
// ======================================================

function getAmountNearFood(
    text,
    position,
    term
) {

    const normalized =
        normalize(text);


    if (
        !normalized ||
        !Number.isFinite(position) ||
        !term
    ) {
        return null;
    }


    /*
        ==================================================
        CANTIDAD EXPLÍCITA ASOCIADA AL ALIMENTO
        ==================================================

        Buscamos primero una cantidad que esté
        directamente antes del alimento.

        Ejemplos:

        "100 g de huevo"
        "20 g de aceite de oliva"
        "200 ml de leche"

        Esto evita que una cantidad perteneciente
        a otro alimento sea utilizada por error.
    */


    const before =
        normalized.substring(
            Math.max(
                0,
                position - 45
            ),
            position
        );


    /*
        GRAMOS

        La expresión debe terminar justo antes
        del alimento reconocido.

        Acepta:

        "100 g de "
        "100 gr de "
        "100 gramos de "
        "100 g "
    */

    const grams =
        before.match(
            /(\d+(?:[.,]\d+)?)\s*(?:g|gr|gramo|gramos)\s*(?:de\s*)?$/
        );


    if (grams) {

        const amount =
            parseFloat(
                grams[1].replace(
                    ",",
                    "."
                )
            );


        if (
            Number.isFinite(amount) &&
            amount > 0
        ) {

            return {
                type: "grams",
                amount: amount
            };
        }
    }


    /*
        MILILITROS

        Misma lógica que gramos.

        Ejemplos:

        "200 ml de leche"
        "250 mililitros de leche"
    */

    const ml =
        before.match(
            /(\d+(?:[.,]\d+)?)\s*(?:ml|mililitro|mililitros)\s*(?:de\s*)?$/
        );


    if (ml) {

        const amount =
            parseFloat(
                ml[1].replace(
                    ",",
                    "."
                )
            );


        if (
            Number.isFinite(amount) &&
            amount > 0
        ) {

            return {
                type: "ml",
                amount: amount
            };
        }
    }


    return null;
}

// ======================================================
// 8. DETECTAR MEDIDAS
// ======================================================

function getMeasureNearFood(
    text,
    position
) {

    const normalized =
        normalize(text);

    const before =
        normalized.substring(
            Math.max(0, position - 45),
            position
        );


    if (
        /\bcucharaditas?\s*(?:de)?\s*$/.test(before)
    ) {
        return "cucharadita";
    }


    if (
        /\bcucharadas?\s*(?:de)?\s*$/.test(before)
    ) {
        return "cucharada";
    }


    if (
        /\btazas?\s*(?:de)?\s*$/.test(before)
    ) {
        return "taza";
    }


    if (
        /\bvasos?\s*(?:de)?\s*$/.test(before)
    ) {
        return "vaso";
    }


    if (
        /\bplatos?\s*(?:de)?\s*$/.test(before)
    ) {
        return "plato";
    }


    return null;
}


// ======================================================
// 9. CALCULAR SEGÚN MEDIDA
// ======================================================

function getMeasureFactor(
    foodKey,
    measure
) {

    if (!measure) {
        return 1;
    }


    const factors = {

        avena: {
            cucharada: 0.25,
            cucharadita: 0.08,
            taza: 2
        },

        aceite: {
            cucharada: 1,
            cucharadita: 0.33
        },

        mayonesa: {
            cucharada: 1,
            cucharadita: 0.33
        },

        ketchup: {
            cucharada: 1,
            cucharadita: 0.33
        },

        azucar: {
            cucharadita: 1,
            cucharada: 3
        },

        arroz: {
            taza: 1,
            plato: 2
        },

        lentejas: {
            taza: 1,
            plato: 2
        },

        leche: {
            vaso: 1,
            taza: 1
        },

        cafe: {
            taza: 1,
            vaso: 1
        }
    };


    return (
        factors[foodKey]?.[measure] ||
        1
    );
}


// ======================================================
// 10. PORCIÓN GENERAL
// ======================================================

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


// ======================================================
// 11. BUSCAR OCURRENCIAS DE ALIMENTOS
// ======================================================
// ======================================================
// CALORIETRACK FOODS AR - RESOLVER V2
// ======================================================

function findFoodsAR(text) {

    /*
        Seguridad durante la migración.

        Si foods-ar.js no cargó correctamente,
        el motor viejo puede seguir funcionando.
    */

    if (
        typeof calorieTrackFoodsAR === "undefined" ||
        !Array.isArray(calorieTrackFoodsAR)
    ) {

        console.warn(
            "CalorieTrack Foods AR no está disponible."
        );

        return [];
    }


    const normalized =
        normalize(text);


    if (!normalized) {
        return [];
    }


    const matches = [];


    for (
        const food
        of calorieTrackFoodsAR
    ) {

        if (
            !food ||
            !food.id ||
            !Array.isArray(food.aliases)
        ) {
            continue;
        }


        for (
            const alias
            of food.aliases
        ) {

            const normalizedAlias =
                normalize(alias);


            if (!normalizedAlias) {
                continue;
            }


            /*
                Escapamos caracteres especiales antes
                de construir la expresión regular.
            */

            const escapedAlias =
                normalizedAlias.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                );


            const regex =
                new RegExp(
                    `\\b${escapedAlias}\\b`,
                    "g"
                );


            let match;


            while (
                (
                    match =
                        regex.exec(
                            normalized
                        )
                ) !== null
            ) {

                matches.push({

                    foodId:
                        food.id,

                    food:
                        food,

                    alias:
                        normalizedAlias,

                    index:
                        match.index,

                    length:
                        normalizedAlias.length,

                    source:
                        "foods-ar"

                });
            }
        }
    }


    /*
        Priorizamos expresiones largas.

        Ejemplo:

        "milanesa de pollo"

        debe ganar frente a cualquier alias
        más corto que pueda superponerse.
    */

    matches.sort(
        (a, b) => {

            if (
                a.index !== b.index
            ) {

                return (
                    a.index -
                    b.index
                );
            }


            return (
                b.length -
                a.length
            );
        }
    );


    const filtered = [];


    for (
        const match
        of matches
    ) {

        const overlaps =
            filtered.some(
                existing => {

                    const startA =
                        match.index;

                    const endA =
                        match.index +
                        match.length;

                    const startB =
                        existing.index;

                    const endB =
                        existing.index +
                        existing.length;


                    return (
                        startA < endB &&
                        endA > startB
                    );
                }
            );


        if (!overlaps) {

            filtered.push(
                match
            );
        }
    }


    return filtered;
}

// ======================================================
// CALORIETRACK FOODS AR - ANALIZADOR V2
// ======================================================
// ======================================================
// CALORIETRACK FOODS AR - PREPARACIONES
// ======================================================

function detectFoodPreparationAR(
    text,
    foodId
) {

    const normalized =
        normalize(text);


    /*
        Por ahora comenzamos solamente con huevo.

        La función está separada del cálculo nutricional
        para poder agregar nuevas preparaciones después
        sin modificar la base Foods AR.
    */

    if (foodId === "huevo") {

        if (
            /\b(revuelto|revueltos)\b/.test(
                normalized
            )
        ) {

            return {
                id: "revuelto",
                name: "revuelto"
            };
        }


        if (
            /\b(frito|fritos)\b/.test(
                normalized
            )
        ) {

            return {
                id: "frito",
                name: "frito"
            };
        }
    }


    return null;
}
// ======================================================
// CALORIETRACK FOODS AR - MEDIDAS NATURALES
// ======================================================

function detectFoodMeasureAR(
    text,
    match
) {

    const normalized =
        normalize(text);


    if (
        !match ||
        !match.food ||
        !Number.isFinite(match.index)
    ) {
        return null;
    }


    /*
        Miramos solamente el contexto cercano
        anterior al alimento.

        Ejemplos:

        "una cucharadita de aceite de oliva"
        "2 cucharadas de aceite de oliva"
        "un chorrito de aceite de oliva"

        Esto evita que una medida perteneciente
        a otro alimento contamine el resultado.
    */

    const before =
        normalized.substring(
            Math.max(
                0,
                match.index - 45
            ),
            match.index
        );


    const measures = [

        {
            id: "teaspoon",
            regex:
                /\bcucharaditas?\s+(?:de\s*)?$/
        },

        {
            id: "tablespoon",
            regex:
                /\bcucharadas?\s+(?:de\s*)?$/
        },

        {
            id: "splash",
            regex:
                /\bchorritos?\s+(?:de\s*)?$/
        }

    ];


    for (const measure of measures) {

        if (
            measure.regex.test(before)
        ) {

            const portion =
                match.food.portions
                    ?.[measure.id];


            if (!portion) {
                continue;
            }


            let quantity = 1;

/*
    Buscamos la cantidad asociada directamente
    a la medida.

    Ejemplos:
    "2 cucharaditas de"
    "tres cucharadas de"
    "un chorrito de"
*/

const quantityContext =
    before.match(
        /(?:^|\s)(\d+(?:[.,]\d+)?|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince)\s+(?:cucharaditas?|cucharadas?|chorritos?)\s+(?:de\s*)?$/
    );


if (quantityContext) {

    const rawQuantity =
        quantityContext[1];


    if (
        /^\d+(?:[.,]\d+)?$/.test(
            rawQuantity
        )
    ) {

        quantity =
            parseFloat(
                rawQuantity.replace(",", ".")
            );

    } else if (
        Object.prototype.hasOwnProperty.call(
            numbers,
            rawQuantity
        )
    ) {

        quantity =
            numbers[rawQuantity];
    }
}


            return {
                id:
                    measure.id,

                quantity:
                    quantity,

                grams:
                    Number(
                        portion.grams
                    ),

                ml:
                    Number(
                        portion.ml
                    ),

                estimated:
                    portion.estimated ===
                    true,

                confidence:
                    portion.confidence ||
                    (
                        portion.estimated
                            ? "medium"
                            : "high"
                    )
            };
        }
    }


    return null;
}
function analyzeFoodAR(text) {

    const normalized =
        normalize(text);

    const matches =
        findFoodsAR(normalized);

    const results = [];


    for (const match of matches) {

        const food =
            match.food;


        if (!food) {
            continue;
        }


        // ------------------------------------------
        // PREPARACIÓN
        // ------------------------------------------

        const preparation =
            detectFoodPreparationAR(
                normalized,
                food.id
            );


        const nutrition =
            food.nutrition;


        // ------------------------------------------
        // VALIDAR INFORMACIÓN NUTRICIONAL
        // ------------------------------------------

        if (
            !nutrition ||
            nutrition.source?.verified !== true ||
            !Number.isFinite(
                nutrition.calories100g
            ) ||
            !Number.isFinite(
                nutrition.protein100g
            )
        ) {

            console.warn(
                `Foods AR: ${food.name} todavía no tiene información nutricional verificada.`
            );

            continue;
        }


        // ------------------------------------------
        // CANTIDAD EXPLÍCITA
        // ------------------------------------------

        const explicitAmount =
            getAmountNearFood(
                normalized,
                match.index,
                match.alias
            );


        let grams = null;

        let estimated = false;

        let confidence = "high";

        let detectedMeasure = null;


        /*
            PRIORIDAD

            1. Gramos explícitos
            2. Medida natural
            3. Unidad natural
        */


        // ==========================================
        // 1. GRAMOS EXPLÍCITOS
        // ==========================================

        if (
            explicitAmount &&
            explicitAmount.type === "grams"
        ) {

            grams =
                explicitAmount.amount;
        }


        // ==========================================
        // 2. MEDIDA NATURAL
        // ==========================================

        else {

            detectedMeasure =
                detectFoodMeasureAR(
                    normalized,
                    match
                );


            if (
                detectedMeasure &&
                Number.isFinite(
                    detectedMeasure.grams
                ) &&
                detectedMeasure.grams > 0
            ) {

                const measureQuantity =
                    Number(
                        detectedMeasure.quantity
                    );


                if (
                    !Number.isFinite(
                        measureQuantity
                    ) ||
                    measureQuantity <= 0
                ) {

                    continue;
                }


                grams =
                    detectedMeasure.grams *
                    measureQuantity;


                estimated =
                    detectedMeasure.estimated ===
                    true;


                confidence =
                    detectedMeasure.confidence ||
                    (
                        estimated
                            ? "medium"
                            : "high"
                    );
            }


            // ======================================
            // 3. UNIDAD NATURAL
            // ======================================

            else {

                const unitGrams =
                    Number(
                        food.portions
                            ?.unit
                            ?.grams
                    );


                if (
                    !Number.isFinite(
                        unitGrams
                    ) ||
                    unitGrams <= 0
                ) {

                    console.info(
                        `Foods AR: ${food.name} reconocida, pero todavía no tiene una cantidad interpretable.`
                    );

                    continue;
                }


                const quantity =
                    getFoodQuantity(
                        normalized,
                        match.index
                    );


                if (
                    !Number.isFinite(
                        quantity
                    ) ||
                    quantity <= 0
                ) {

                    continue;
                }


                grams =
                    quantity *
                    unitGrams;


                estimated = true;

                confidence = "medium";
            }
        }


        // ------------------------------------------
        // VALIDACIÓN FINAL DE CANTIDAD
        // ------------------------------------------

        if (
            !Number.isFinite(grams) ||
            grams <= 0
        ) {

            continue;
        }


        // ------------------------------------------
        // CÁLCULO NUTRICIONAL
        // ------------------------------------------

        const factor =
            grams / 100;


        const calories =
            nutrition.calories100g *
            factor;


        const protein =
            nutrition.protein100g *
            factor;


        // ------------------------------------------
        // RESULTADO
        // ------------------------------------------

        results.push({

            key:
                `foodsAR_${food.id}`,

            foodId:
                food.id,

            name:
                food.name,

            grams:
                grams,

            quantity:
                grams,

            unit:
                "g",

            calories:
                calories,

            protein:
                protein,

            source:
                "foods-ar",

            nutritionSource:
                nutrition.source,

            estimated:
                estimated,

            confidence:
                confidence,

            preparation:
                preparation,

            measure:
                detectedMeasure
                    ? detectedMeasure.id
                    : null
        });
    }


    return results;
}
function findFoods(text) {

    const normalized =
        normalize(text);

    const matches = [];


    for (const definition of foodDefinitions) {

        for (const term of definition.terms) {

            const normalizedTerm =
                normalize(term);

            const regex =
                new RegExp(
                    `\\b${normalizedTerm}\\b`,
                    "g"
                );

            let match;


            while (
                (match = regex.exec(normalized)) !== null
            ) {

                matches.push({
                    key: definition.key,
                    term: normalizedTerm,
                    index: match.index,
                    length: normalizedTerm.length
                });
            }
        }
    }


    /*
        Evitamos duplicados.

        Ejemplo:
        "pan lactal" no debe contar también "pan".
        "queso crema" no debe contar también "queso".
        "huevo frito" no debe contar también "huevo".
    */

    matches.sort(
        (a, b) => {

            if (a.index !== b.index) {
                return a.index - b.index;
            }

            return b.length - a.length;
        }
    );


    const filtered = [];


    for (const match of matches) {

        const overlaps =
            filtered.some(existing => {

                const startA =
                    match.index;

                const endA =
                    match.index +
                    match.length;

                const startB =
                    existing.index;

                const endB =
                    existing.index +
                    existing.length;


                return (
                    startA < endB &&
                    endA > startB
                );
            });


        if (!overlaps) {
            filtered.push(match);
        }
    }


    return filtered;
}


// ======================================================
// 12. ANALIZAR ALIMENTOS
// ======================================================

function analyzeFood(text) {

    const normalized =
        normalize(text);

    const matches =
        findFoods(normalized);

    const results = [];


    for (const match of matches) {

        const food =
            foods[match.key];


        if (!food) {
            continue;
        }


        let quantity =
            getFoodQuantity(
                normalized,
                match.index
            );


        const measure =
            getMeasureNearFood(
                normalized,
                match.index
            );


        const explicitAmount =
            getAmountNearFood(
                normalized,
                match.index,
                match.term
            );


        let calories =
            food.calories;

        let protein =
            food.protein;


        // ------------------------------------------
        // GRAMOS
        // ------------------------------------------

        if (
            explicitAmount &&
            explicitAmount.type === "grams"
        ) {

            /*
                Alimentos cuya información base está
                expresada aproximadamente por 100 g.
            */

            const hundredGramFoods = [
                "palta",
                "zapallo",
                "brocoli",
                "espinaca",
                "pepino",
                "repollo",
                "atun",
                "jamon",
                "salame"
            ];


            if (
                hundredGramFoods.includes(
                    match.key
                )
            ) {

                const factor =
                    explicitAmount.amount /
                    100;

                calories =
                    food.calories *
                    factor;

                protein =
                    food.protein *
                    factor;

            } else {

                const basePortion =
                    Number(food.portion) ||
                    100;

                const factor =
                    explicitAmount.amount /
                    basePortion;

                calories =
                    food.calories *
                    factor;

                protein =
                    food.protein *
                    factor;
            }

        }


        // ------------------------------------------
        // MILILITROS
        // ------------------------------------------

        else if (
            explicitAmount &&
            explicitAmount.type === "ml"
        ) {

            if (match.key === "leche") {

                const factor =
                    explicitAmount.amount /
                    200;

                calories =
                    food.calories *
                    factor;

                protein =
                    food.protein *
                    factor;

            }

            else if (match.key === "cafe") {

                /*
                    Café solo prácticamente
                    no aporta calorías.
                */

                const factor =
                    explicitAmount.amount /
                    200;

                calories =
                    food.calories *
                    factor;

                protein =
                    food.protein *
                    factor;
            }

        }


        // ------------------------------------------
        // MEDIDAS
        // ------------------------------------------

        else {

            const measureFactor =

                            getMeasureFactor(
                    match.key,
                    measure
                );


            calories =
                food.calories *
                quantity *
                measureFactor;

            protein =
                food.protein *
                quantity *
                measureFactor;
        }


        results.push({

            key:
                match.key,

            name:
                food.name,

            quantity:
                quantity,

            calories:
                calories,

            protein:
                protein
        });
    }


    // ==================================================
    // CAFÉ CON LECHE
    // ==================================================

    /*
        Si dice:

        "café con leche"

        detectamos ambos alimentos.

        El café aporta ~2 kcal.

        Para la leche, si el usuario NO puso
        una cantidad específica, usamos media
        porción de leche (~100 ml).

        Así no contamos automáticamente un vaso
        entero de leche.
    */

    if (
        normalized.includes("cafe con leche")
    ) {

        const milk =
            results.find(
                item =>
                    item.key === "leche"
            );


        if (milk) {

            const milkMatch =
                matches.find(
                    item =>
                        item.key === "leche"
                );


            const explicitMilk =
                milkMatch
                    ? getAmountNearFood(
                        normalized,
                        milkMatch.index,
                        milkMatch.term
                    )
                    : null;


            const milkMeasure =
                milkMatch
                    ? getMeasureNearFood(
                        normalized,
                        milkMatch.index
                    )
                    : null;


            if (
                !explicitMilk &&
                !milkMeasure
            ) {

                milk.calories =
                    foods.leche.calories *
                    0.5;

                milk.protein =
                    foods.leche.protein *
                    0.5;

                milk.quantity =
                    0.5;

                milk.name =
                    "Leche (estimado 100 ml)";
            }
        }
    }


    // ==================================================
    // PORCIÓN GENERAL
    // ==================================================

    const portionMultiplier =
        getPortionMultiplier();


    if (portionMultiplier !== 1) {

        results.forEach(item => {

            item.calories *=
                portionMultiplier;

            item.protein *=
                portionMultiplier;
        });
    }


    return results;
}


// ======================================================
// 13. ANALIZAR COMIDA COMPLETA
// ======================================================

function analyzeMeal(text) {

    const normalized =
        normalize(text);

    let results =
        analyzeFood(text);


    // ==================================================
    // MILANESA DE POLLO
    // ==================================================

    if (
        normalized.includes(
            "milanesa de pollo"
        )
    ) {

        results =
            results.filter(
                item =>
                    item.key !== "pollo"
            );


        results.push({
            key: "milanesaPollo",
            name: "Milanesa de pollo",
            calories: 300,
            protein: 27
        });
    }


    // ==================================================
    // MILANESA DE CARNE
    // ==================================================

    if (
        normalized.includes(
            "milanesa de carne"
        )
    ) {

        results =
            results.filter(
                item =>
                    item.key !== "carne"
            );


        results.push({
            key: "milanesaCarne",
            name: "Milanesa de carne",
            calories: 350,
            protein: 25
        });
    }


    // ==================================================
    // PURÉ DE PAPA
    // ==================================================

    if (
        normalized.includes(
            "pure de papa"
        )
    ) {

        results =
            results.filter(
                item =>
                    item.key !== "papa"
            );


        results.push({
            key: "purePapa",
            name: "Puré de papa",
            calories: 180,
            protein: 4
        });
    }


    // ==================================================
    // ENSALADA GENÉRICA
    // ==================================================

    if (
        normalized.includes("ensalada") &&
        results.length === 0
    ) {

        results.push({
            key: "ensalada",
            name: "Ensalada",
            calories: 60,
            protein: 2
        });
    }


    return results;
}


// ======================================================
// 14. MOSTRAR ESTIMACIÓN
// ======================================================

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


    if (
        !results ||
        results.length === 0
    ) {

        alert(
            "No pude reconocer los alimentos. Probá describiéndolos de otra manera."
        );

        return null;
    }


    let totalCalories = 0;
    let totalProtein = 0;


    results.forEach(item => {

        totalCalories +=
            Number(item.calories) ||
            0;

        totalProtein +=
            Number(item.protein) ||
            0;
    });


    /*
    RANGO DE INCERTIDUMBRE

    Calculamos el margen alimento por alimento.

    high   -> dato preciso: sin margen
    medium -> cantidad estimada: ±10 %
    low    -> estimación débil: ±20 %

    Los resultados legacy que todavía no tienen
    metadata de confianza mantienen temporalmente
    el margen histórico de ±15 %.
*/

let caloriesMinRaw = 0;
let caloriesMaxRaw = 0;


results.forEach(item => {

    const calories =
        Number(item.calories) || 0;


    let margin = 0;


    if (
        item.source === "foods-ar"
    ) {

        if (
            item.estimated !== true ||
            item.confidence === "high"
        ) {

            margin = 0;

        } else if (
            item.confidence === "medium"
        ) {

            margin = 0.10;

        } else {

            margin = 0.20;
        }

    } else {

        /*
            Motor legacy / productos externos.

            Todavía no poseen el mismo sistema
            de confianza de Foods AR.
        */

        margin = 0.15;
    }


    caloriesMinRaw +=
        calories * (1 - margin);

    caloriesMaxRaw +=
        calories * (1 + margin);
});


const caloriesMin =
    Math.round(
        caloriesMinRaw
    );

const caloriesMax =
    Math.round(
        caloriesMaxRaw
    );

    if (estimatedCalories) {

        if (caloriesMin === caloriesMax) {

    estimatedCalories.textContent =
        `${caloriesMin}`;

} else {

    estimatedCalories.textContent =
        `${caloriesMin}-${caloriesMax}`;
}
    }


    if (estimatedProtein) {

        estimatedProtein.textContent =
            Math.round(totalProtein);
    }


    if (estimatedFoods) {

        estimatedFoods.innerHTML = "";


        results.forEach(item => {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                `${item.name}: ${Math.round(item.calories)} kcal — ${Number(item.protein).toFixed(1)} g proteína`;


            estimatedFoods.appendChild(
                div
            );
        });
    }


    if (resultSection) {

        resultSection.style.display =
            "block";
    }


    window.currentMeal = {

        foods:
            results,

        calories:
            totalCalories,

        protein:
            totalProtein
    };


    return window.currentMeal;
}


// ======================================================
// 15. OPEN FOOD FACTS - CÓDIGO DE BARRAS
// ======================================================

async function buscarProductoOpenFoodFacts(
    codigoBarras
) {

    try {

        const response =
            await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${codigoBarras}.json`
            );


        if (!response.ok) {
            return null;
        }


        const data =
            await response.json();


        if (
            data.status !== 1 ||
            !data.product
        ) {

            return null;
        }


        return data.product;

    } catch (error) {

        console.error(
            "Error Open Food Facts:",
            error
        );

        return null;
    }
}


// ======================================================
// 16. BÚSQUEDA DE PRODUCTOS POR NOMBRE / MARCA
// ======================================================

const PRODUCT_CACHE_KEY =
    "calorieTrackProductCache";


// ======================================================
// OBTENER PRODUCTOS GUARDADOS
// ======================================================

function getProductCache() {

    try {

        const saved =
            localStorage.getItem(
                PRODUCT_CACHE_KEY
            );


        if (!saved) {
            return {};
        }


        const parsed =
            JSON.parse(saved);


        if (
            !parsed ||
            typeof parsed !== "object"
        ) {
            return {};
        }


        return parsed;

    } catch (error) {

        console.error(
            "Error leyendo productos guardados:",
            error
        );

        return {};
    }
}


// ======================================================
// GUARDAR PRODUCTO EN MEMORIA
// ======================================================

function saveProductToCache(
    searchText,
    product
) {

    if (
        !searchText ||
        !product
    ) {
        return;
    }


    const cache =
        getProductCache();


    const key =
        normalize(searchText);


    cache[key] =
        product;


    try {

        localStorage.setItem(
            PRODUCT_CACHE_KEY,
            JSON.stringify(cache)
        );

    } catch (error) {

        console.error(
            "No se pudo guardar el producto:",
            error
        );
    }
}


// ======================================================
// BUSCAR PRODUCTO GUARDADO
// ======================================================

function getCachedProduct(
    searchText
) {

    if (!searchText) {
        return null;
    }


    const cache =
        getProductCache();


    return (
        cache[
            normalize(searchText)
        ] ||
        null
    );
}


// ======================================================
// NORMALIZAR PRODUCTO DE OPEN FOOD FACTS
// ======================================================

function normalizeOpenFoodFactsProduct(
    product
) {

    if (!product) {
        return null;
    }


    const nutriments =
        product.nutriments ||
        {};


    let calories =
        Number(
            nutriments[
                "energy-kcal_100g"
            ]
        );


    if (
        !Number.isFinite(calories) ||
        calories <= 0
    ) {

        const kj =
            Number(
                nutriments.energy_100g
            );


        if (
            Number.isFinite(kj) &&
            kj > 0
        ) {

            calories =
                kj / 4.184;

        } else {

            calories = 0;
        }
    }


    const protein =
        Number(
            nutriments.proteins_100g
        ) || 0;


    const name =
        product.product_name_es ||
        product.product_name ||
        "Producto";


    const brand =
        product.brands ||
        "";


    return {

        code:
            product.code ||
            "",

        name:
            name,

        brand:
            brand,

        calories100g:
            calories,

        protein100g:
            protein,

        servingSize:
            product.serving_size ||
            "",

        quantity:
            product.quantity ||
            "",

        image:
            product.image_front_small_url ||
            product.image_front_url ||
            "",

        categories:
            product.categories ||
            "",

        originalProduct:
            product
    };
}


// ======================================================
// BUSCAR PRODUCTOS POR NOMBRE
// ======================================================

// ======================================================
// VALIDAR RELEVANCIA DE PRODUCTOS
// ======================================================

function getProductSearchScore(
    product,
    searchText
) {

    if (
        !product ||
        !searchText
    ) {
        return 0;
    }

    const query =
        normalize(searchText);

    const name =
        normalize(
            product.name || ""
        );

    const brand =
        normalize(
            product.brand || ""
        );

    const words =
        query
            .split(/\s+/)
            .filter(
                word =>
                    word.length >= 3
            );

    if (
        words.length === 0
    ) {
        return 0;
    }

    let score = 0;


    // Marca exactamente igual
    if (
        brand === query
    ) {
        score += 100;
    }


    // La marca contiene la búsqueda
    if (
        brand.includes(query)
    ) {
        score += 80;
    }


    // El nombre contiene la búsqueda
    if (
        name.includes(query)
    ) {
        score += 60;
    }


    // Coincidencias palabra por palabra
    words.forEach(
        word => {

            if (
                brand.includes(word)
            ) {
                score += 30;
            }

            if (
                name.includes(word)
            ) {
                score += 20;
            }
        }
    );


    return score;
}

async function buscarProductosPorNombre(
    searchText
) {

    if (!searchText) {
        return [];
    }


    const cached =
        getCachedProduct(
            searchText
        );


    if (cached) {

        return [
            {
                ...cached,
                fromCache: true
            }
        ];
    }


    try {

        const url =
            "https://world.openfoodfacts.org/cgi/search.pl" +
            "?search_terms=" +
            encodeURIComponent(
                searchText
            ) +
            "&search_simple=1" +
            "&action=process" +
            "&json=1" +
            "&page_size=8";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Error HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        if (
            !data ||
            !Array.isArray(
                data.products
            )
        ) {

            return [];
        }


       const normalizedProducts =
    data.products
        .map(
            normalizeOpenFoodFactsProduct
        )
        .filter(
            product =>
                product &&
                product.calories100g > 0
        );


const relevantProducts =
    normalizedProducts
        .map(
            product => ({
                product: product,

                score:
                    getProductSearchScore(
                        product,
                        searchText
                    )
            })
        )
        .filter(
            item =>
                item.score >= 30
        )
        .sort(
            (a, b) =>
                b.score - a.score
        )
        .map(
            item =>
                item.product
        );


return relevantProducts; 

    } catch (error) {

        console.error(
            "Error buscando producto por nombre:",
            error
        );

        return [];
    }
}


// ======================================================
// 17. SEPARAR LA DESCRIPCIÓN DE LA COMIDA
// ======================================================

function splitMealIntoSegments(
    text
) {

    if (!text) {
        return [];
    }


    return String(text)
        .split(
            /,|\s+y\s+/i
        )
        .map(
            segment =>
                segment.trim()
        )
        .filter(Boolean);
}


// ======================================================
// 18. PALABRAS QUE NO FORMAN PARTE DE LA MARCA
// ======================================================

const productIgnoreWords =
    new Set([
        "de",
        "del",
        "con",
        "sin",
        "una",
        "uno",
        "un",
        "unos",
        "unas",
        "el",
        "la",
        "los",
        "las",
        "comi",
        "tome",
        "bebi",
        "desayune",
        "merende",
        "almorce",
        "cene",
        "poco",
        "poca",
        "mucho",
        "mucha",
        "grande",
        "chico",
        "chica"
    ]);


// ======================================================
// 19. LIMPIAR TEXTO PARA BUSCAR UNA MARCA
// ======================================================

function cleanProductSearchText(
    text
) {

    if (!text) {
        return "";
    }


    let cleaned =
        normalize(text);


    cleaned =
        cleaned.replace(
            /^\s*\d+(?:[.,]\d+)?\s*/,
            ""
        );


    cleaned =
        cleaned.replace(
            /\b(kg|g|gr|gramo|gramos|ml|cc|litro|litros|l)\b/gi,
            " "
        );


    cleaned =
    cleaned.replace(
        /\b(cucharada|cucharadas|cucharadita|cucharaditas|chorrito|chorritos|taza|tazas|vaso|vasos|plato|platos|porcion|porciones|unidad|unidades)\b/gi,
        " "
    );


    cleaned =
        cleaned.replace(
            /\s+/g,
            " "
        )
        .trim();


    let words =
        cleaned
            .split(/\s+/)
            .filter(Boolean);


    /*
    Eliminamos conectores y determinantes
    que no forman parte del nombre comercial.

    Esto se hace en cualquier posición del texto,
    no solamente al comienzo.

    Ejemplo:
    "con un chorrito de"
        ↓
    ""
*/

words =
    words.filter(
        word =>
            !productIgnoreWords.has(
                normalize(word)
            )
    );


    return words
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
}


// ======================================================
// 20. COMPROBAR SI EL SEGMENTO YA ES UN ALIMENTO
// ======================================================

function segmentHasKnownFood(
    segment
) {

    if (!segment) {
        return false;
    }


    try {

        const detected =
            findFoods(segment);


        return (
            Array.isArray(detected) &&
            detected.length > 0
        );

    } catch (error) {

        console.error(
            "Error comprobando alimento conocido:",
            error
        );

        return false;
    }
}

// ======================================================
// 20B. QUITAR ALIMENTOS GENÉRICOS DE UNA BÚSQUEDA
// ======================================================

function removeKnownFoodTerms(text) {

    if (!text) {
        return "";
    }

    let cleaned =
        normalize(text);

    /*
    Términos conocidos por el motor legacy.
*/

const legacyTerms =
    foodDefinitions
        .flatMap(
            definition =>
                definition.terms || []
        );


/*
    Términos conocidos por Foods AR.

    De esta forma, cualquier alimento que migremos
    al nuevo catálogo queda automáticamente excluido
    de las búsquedas de Open Food Facts.
*/

const foodsARTerms =
    (
        typeof calorieTrackFoodsAR !== "undefined" &&
        Array.isArray(calorieTrackFoodsAR)
    )
        ? calorieTrackFoodsAR.flatMap(
            food =>
                Array.isArray(food.aliases)
                    ? food.aliases
                    : []
        )
        : [];


/*
    Unificamos ambos motores y priorizamos
    expresiones largas.

    Ejemplo:
    "aceite de oliva" debe eliminarse antes
    que "aceite".
*/

const terms =
    [
        ...legacyTerms,
        ...foodsARTerms
    ]
        .map(
            term =>
                normalize(term)
        )
        .filter(Boolean)
        .filter(
            (term, index, array) =>
                array.indexOf(term) === index
        )
        .sort(
            (a, b) =>
                b.length - a.length
        );

    for (const term of terms) {

        const escapedTerm =
            term.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        const regex =
            new RegExp(
                `\\b${escapedTerm}\\b`,
                "gi"
            );

        cleaned =
            cleaned.replace(
                regex,
                " "
            );
    }

    return cleaned
        .replace(/\s+/g, " ")
        .trim();
}
// ======================================================
// MOTOR V2 - CLASIFICACIÓN DE TEXTO DESCONOCIDO
// ======================================================

const genericFoodVocabulary = new Set([

    // Bebidas e infusiones
    "mate",
    "matecocido",
    "te",
    "infusion",
    "agua",
    "jugo",
    "licuado",

    // Frutas
    "mandarina",
    "durazno",
    "frutilla",
    "frutillas",
    "kiwi",
    "melon",
    "sandia",
    "uva",
    "uvas",
    "ciruela",
    "ciruelas",

    // Verduras
    "acelga",
    "berenjena",
    "berenjenas",
    "zapallito",
    "zapallitos",
    "calabaza",
    "remolacha",
    "chaucha",
    "chauchas",

    // Cereales / legumbres
    "garbanzo",
    "garbanzos",
    "poroto",
    "porotos",
    "quinoa",

    // Preparaciones frecuentes
    "pizza",
    "empanada",
    "empanadas",
    "hamburguesa",
    "hamburguesas",
    "tortilla",
    "sopa",
    "guiso",
    "pure",
    "milanesa",

    // Otros alimentos
    "harina",
    "salsa",
    "nueces",
    "almendras",
    "mani"
]);


/*
    Palabras que suelen describir un alimento
    pero no identifican una marca.
*/
const genericFoodDescriptorWords = new Set([

    "integral",
    "descremada",
    "descremado",
    "entera",
    "entero",

    "cocido",
    "cocida",
    "cocidos",
    "cocidas",

    "hervido",
    "hervida",
    "hervidos",
    "hervidas",

    "horno",
    "plancha",

    "frito",
    "frita",
    "fritos",
    "fritas",

    "casero",
    "casera",
    "caseros",
    "caseras",

    "natural"
]);


/*
    Palabras que no aportan identidad al alimento.
*/
const genericFoodConnectorWords = new Set([

    "de",
    "del",
    "con",
    "sin",
    "al",
    "a",
    "la",
    "el",
    "los",
    "las",
    "un",
    "una",
    "unos",
    "unas"
]);


/*
    Devuelve las palabras útiles de un fragmento.
*/
function getMeaningfulFoodWords(text) {

    return normalize(text)
        .split(/\s+/)
        .filter(Boolean)
        .filter(
            word =>
                !productIgnoreWords.has(word) &&
                !genericFoodConnectorWords.has(word)
        );
}


/*
    Comprueba si un fragmento contiene vocabulario
    claramente alimentario.

    Importante:
    esto NO calcula todavía sus calorías.

    Su función es evitar que una comida normal
    desconocida sea tratada automáticamente
    como una marca comercial.
*/
function looksLikeGenericFood(text) {

    if (!text) {
        return false;
    }


    const normalized =
        normalize(text);


    /*
        Primero comprobamos los alimentos que
        CalorieTrack ya conoce oficialmente.
    */
    if (segmentHasKnownFood(normalized)) {
        return true;
    }


    const words =
        getMeaningfulFoodWords(normalized);


    if (words.length === 0) {
        return false;
    }


    /*
        Reconocemos expresiones equivalentes.

        Ejemplo:

        "mate cocido"
        "matecocido"
    */
    const compact =
        words.join("");


    if (
        compact === "matecocido" ||
        normalized.includes("mate cocido")
    ) {
        return true;
    }


    /*
        Si alguna palabra pertenece al vocabulario
        alimentario general, consideramos que
        probablemente estamos frente a un alimento.
    */
    const hasFoodWord =
        words.some(
            word =>
                genericFoodVocabulary.has(word)
        );


    if (hasFoodWord) {
        return true;
    }


    /*
        Un descriptor solo ("integral", "casero"...)
        no alcanza para afirmar que sea alimento.
    */
    const onlyDescriptors =
        words.every(
            word =>
                genericFoodDescriptorWords.has(word)
        );


    if (onlyDescriptors) {
        return false;
    }


    return false;
}


/*
    Clasificación inicial del fragmento.

    known-food
        alimento ya soportado por el motor actual

    generic-food
        parece comida, pero todavía no tenemos
        información nutricional suficiente

    unknown
        podría ser marca/producto u otro texto
*/
function classifyMealSegment(segment) {

    if (!segment) {
        return {
            type: "unknown",
            text: ""
        };
    }


    const normalized =
        normalize(segment);


    if (segmentHasKnownFood(normalized)) {

        return {
            type: "known-food",
            text: normalized
        };
    }


    if (looksLikeGenericFood(normalized)) {

        return {
            type: "generic-food",
            text: normalized
        };
    }


    return {
        type: "unknown",
        text: normalized
    };
}



// ======================================================
// 21. EXTRAER POSIBLES PRODUCTOS / MARCAS
// ======================================================

function extractPossibleProductSearches(
    text
) {

    const segments =
        splitMealIntoSegments(
            text
        );


    const searches = [];


    segments.forEach(
        segment => {
        const segmentClassification =
    classifyMealSegment(segment);


/*
    Si parece un alimento genérico que todavía
    no está en nuestra base nutricional,
    NO lo mandamos como si fuera una marca
    a Open Food Facts.
*/
if (
    segmentClassification.type ===
    "generic-food"
) {

    console.info(
        "CalorieTrack V2: alimento genérico pendiente:",
        segment
    );

    return;
}    
           const cleanedSegment =
    cleanProductSearchText(
        segment
    );

const cleaned =
    removeKnownFoodTerms(
        cleanedSegment
    ); 


            if (!cleaned) {
                return;
            }


            if (
                segmentHasKnownFood(
                    segment
                )
            ) {

                const knownFoods =
                    findFoods(
                        segment
                    );


                const normalizedCleaned =
                    normalize(
                        cleaned
                    );


                const onlyKnownFood =
                    knownFoods.some(
                        item =>
                            normalize(
                                item.term
                            ) ===
                            normalizedCleaned
                    );


                if (onlyKnownFood) {
                    return;
                }


                const genericCombination =
                    (
                        normalize(segment)
                            .includes(
                                "cafe con leche"
                            )
                    );


                if (genericCombination) {
                    return;
                }
            }


            if (
                cleaned.length < 3
            ) {
                return;
            }


            const alreadyExists =
                searches.some(
                    item =>
                        normalize(item) ===
                        normalize(cleaned)
                );


            if (!alreadyExists) {

                searches.push(
                    cleaned
                );
            }
        }
    );


    return searches;
}


// ======================================================
// 22. MODAL PARA ELEGIR PRODUCTO
// ======================================================

// ======================================================
// PRODUCTO / MARCA NO ENCONTRADO
// ======================================================

function seleccionarAccionProductoNoEncontrado(
    searchText
) {

    return new Promise(
        resolve => {

            const overlay =
                document.createElement("div");

            overlay.className =
                "product-not-found-overlay";


            // ==========================================
            // FONDO
            // ==========================================

            Object.assign(
                overlay.style,
                {
                    position: "fixed",
                    inset: "0",
                    background: "rgba(15, 23, 42, 0.65)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    zIndex: "100000"
                }
            );


            // ==========================================
            // VENTANA
            // ==========================================

            const modal =
                document.createElement("div");

            Object.assign(
                modal.style,
                {
                    width: "100%",
                    maxWidth: "480px",
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow:
                        "0 25px 70px rgba(0,0,0,0.30)"
                }
            );


            // ==========================================
            // TÍTULO
            // ==========================================

            const title =
                document.createElement("h3");

            title.textContent =
                `No encontré "${searchText}"`;

            title.style.margin =
                "0 0 8px";


            // ==========================================
            // EXPLICACIÓN
            // ==========================================

            const description =
                document.createElement("p");

            description.textContent =
                "No encontré una coincidencia confiable para este producto. Elegí cómo querés continuar.";

            Object.assign(
                description.style,
                {
                    margin: "0 0 20px",
                    color: "#64748b",
                    lineHeight: "1.5"
                }
            );


            // ==========================================
            // CONTENEDOR DE BOTONES
            // ==========================================

            const buttons =
                document.createElement("div");

            Object.assign(
                buttons.style,
                {
                    display: "grid",
                    gap: "10px"
                }
            );


            // ==========================================
            // FUNCIÓN PARA CREAR BOTONES
            // ==========================================

            function createButton(
                text,
                action,
                primary = false
            ) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.textContent =
                    text;


                Object.assign(
                    button.style,
                    {
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "600",

                        border:
                            primary
                                ? "none"
                                : "1px solid #e2e8f0",

                        background:
                            primary
                                ? "#2563eb"
                                : "#ffffff",

                        color:
                            primary
                                ? "#ffffff"
                                : "#0f172a"
                    }
                );


                button.addEventListener(
                    "click",
                    () => {

                        overlay.remove();

                        resolve(action);
                    }
                );


                return button;
            }


            // ==========================================
            // OPCIONES
            // ==========================================

            const scanButton =
                createButton(
                    "📷 Escanear producto",
                    "scan",
                    true
                );


            const manualButton =
                createButton(
                    "✏️ Cargar información manualmente",
                    "manual"
                );


            const genericButton =
                createButton(
                    "Continuar con alimento genérico",
                    "generic"
                );


            const cancelButton =
                createButton(
                    "Cancelar",
                    "cancel"
                );


            buttons.append(
                scanButton,
                manualButton,
                genericButton,
                cancelButton
            );


            modal.append(
                title,
                description,
                buttons
            );


            overlay.appendChild(
                modal
            );


            document.body.appendChild(
                overlay
            );


            // ==========================================
            // CLICK FUERA = CANCELAR
            // ==========================================

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.remove();

                        resolve("cancel");
                    }
                }
            );
        }
    );
}

function seleccionarProductoEncontrado(
    searchText,
    products
) {

    return new Promise(
        resolve => {

            if (
                !products ||
                products.length === 0
            ) {

                resolve(null);
                return;
            }


            // Si viene de caché,
            // lo usamos automáticamente.

            if (
                products.length === 1 &&
                products[0].fromCache
            ) {

                resolve(
                    products[0]
                );

                return;
            }


            const overlay =
                document.createElement(
                    "div"
                );


            overlay.className =
                "product-search-overlay";


            overlay.style.position =
                "fixed";

            overlay.style.inset =
                "0";

            overlay.style.background =
                "rgba(15, 23, 42, 0.65)";

            overlay.style.display =
                "flex";

            overlay.style.alignItems =
                "center";

            overlay.style.justifyContent =
                "center";

            overlay.style.padding =
                "20px";

            overlay.style.zIndex =
                "99999";


            const modal =
                document.createElement(
                    "div"
                );


            modal.className =
                "product-search-modal";


            modal.style.width =
                "100%";

            modal.style.maxWidth =
                "600px";

            modal.style.maxHeight =
                "85vh";

            modal.style.overflowY =
                "auto";

            modal.style.background =
                "#ffffff";

            modal.style.borderRadius =
                "20px";

            modal.style.padding =
                "24px";

            modal.style.boxShadow =
                "0 25px 70px rgba(0,0,0,0.30)";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                `Encontré productos para "${searchText}"`;


            title.style.margin =
                "0 0 8px";


            const subtitle =
                document.createElement(
                    "p"
                );


            subtitle.textContent =
                "Elegí el producto que consumiste.";


            subtitle.style.margin =
                "0 0 20px";

            subtitle.style.color =
                "#64748b";


            modal.appendChild(
                title
            );

            modal.appendChild(
                subtitle
            );


            let resolved =
                false;


            function finish(
                product
            ) {

                if (resolved) {
                    return;
                }


                resolved =
                    true;


                if (
                    overlay.parentNode
                ) {

                    overlay.parentNode
                        .removeChild(
                            overlay
                        );
                }


                resolve(
                    product
                );
            }


            products
                .slice(0, 6)
                .forEach(
                    product => {

                        const button =
                            document.createElement(
                                "button"
                            );


                        button.type =
                            "button";


                        button.style.width =
                            "100%";

                        button.style.display =
                            "flex";

                        button.style.alignItems =
                            "center";

                        button.style.gap =
                            "14px";

                        button.style.textAlign =
                            "left";

                        button.style.padding =
                            "14px";

                        button.style.marginBottom =
                            "10px";

                        button.style.border =
                            "1px solid #e2e8f0";

                        button.style.borderRadius =
                            "14px";

                        button.style.background =
                            "#ffffff";

                        button.style.cursor =
                            "pointer";


                        // ==================================
                        // IMAGEN
                        // ==================================

                        if (product.image) {

                            const image =
                                document.createElement(
                                    "img"
                                );


                            image.src =
                                product.image;

                            image.alt =
                                product.name ||
                                "Producto";

                            image.style.width =
                                "55px";

                            image.style.height =
                                "55px";

                            image.style.objectFit =
                                "contain";

                            image.style.flexShrink =
                                "0";


                            button.appendChild(
                                image
                            );
                        }


                        // ==================================
                        // INFORMACIÓN
                        // ==================================

                        const info =
                            document.createElement(
                                "div"
                            );


                        info.style.flex =
                            "1";


                        const name =
                            document.createElement(
                                "strong"
                            );


                        name.textContent =
                            product.name ||
                            "Producto";


                        name.style.display =
                            "block";

                        name.style.marginBottom =
                            "4px";


                        const brand =
                            document.createElement(
                                "span"
                            );


                        brand.textContent =
                            product.brand
                                ? product.brand
                                : "Marca no especificada";


                        brand.style.display =
                            "block";

                        brand.style.fontSize =
                            "13px";

                        brand.style.color =
                            "#64748b";


                        const nutrition =
                            document.createElement(
                                "small"
                            );


                        nutrition.textContent =
                            `${Math.round(
                                product.calories100g
                            )} kcal / 100 g`;


                        nutrition.style.display =
                            "block";

                        nutrition.style.marginTop =
                            "5px";

                        nutrition.style.color =
                            "#334155";


                        info.appendChild(
                            name
                        );

                        info.appendChild(
                            brand
                        );

                        info.appendChild(
                            nutrition
                        );


                        button.appendChild(
                            info
                        );


                        button.addEventListener(
                            "click",
                            () => {

                                saveProductToCache(
                                    searchText,
                                    product
                                );


                                finish(
                                    product
                                );
                            }
                        );


                        modal.appendChild(
                            button
                        );
                    }
                );


            // ==========================================
            // NINGUNO DE ESTOS
            // ==========================================

            const cancelButton =
                document.createElement(
                    "button"
                );


            cancelButton.type =
                "button";

            cancelButton.textContent =
                "Ninguno de estos";


            cancelButton.style.width =
                "100%";

            cancelButton.style.marginTop =
                "10px";

            cancelButton.style.padding =
                "12px";

            cancelButton.style.border =
                "none";

            cancelButton.style.borderRadius =
                "12px";

            cancelButton.style.background =
                "#f1f5f9";

            cancelButton.style.cursor =
                "pointer";


            cancelButton.addEventListener(
                "click",
                () => {

                    finish(null);
                }
            );


            modal.appendChild(
                cancelButton
            );


            overlay.appendChild(
                modal
            );


            document.body.appendChild(
                overlay
            );


            // Cerrar tocando el fondo

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        finish(null);
                    }
                }
            );
        }
    );
}


// ======================================================
// 23. OBTENER CALORÍAS POR 100 G
// ======================================================

function getProductCalories100g(
    product
) {

    if (!product) {
        return 0;
    }


    /*
        Esta función puede recibir:

        1. El producto normalizado por nosotros.
        2. El producto original de Open Food Facts.
    */


    if (
        Number.isFinite(
            Number(
                product.calories100g
            )
        )
    ) {

        return Number(
            product.calories100g
        );
    }


    const nutriments =
        product.nutriments ||
        {};


    let calories =
        Number(
            nutriments[
                "energy-kcal_100g"
            ]
        );


    if (
        Number.isFinite(calories) &&
        calories > 0
    ) {

        return calories;
    }


    const energyKj =
        Number(
            nutriments.energy_100g
        );


    if (
        Number.isFinite(energyKj) &&
        energyKj > 0
    ) {

        return (
            energyKj /
            4.184
        );
    }


    return 0;
}


// ======================================================
// 24. OBTENER PROTEÍNA POR 100 G
// ======================================================

function getProductProtein100g(
    product
) {

    if (!product) {
        return 0;
    }


    if (
        Number.isFinite(
            Number(
                product.protein100g
            )
        )
    ) {

        return Number(
            product.protein100g
        );
    }


    return (
        Number(
            product
                .nutriments
                ?.proteins_100g
        ) ||
        0
    );
}


// ======================================================
// 25. ESTIMAR GRAMOS SEGÚN UNIDAD
// ======================================================

function getProductUnitGrams(
    product,
    unit
) {

    const name =
        normalize(
            [
                product?.name,
                product?.brand,
                product?.product_name,
                product?.brands
            ]
                .filter(Boolean)
                .join(" ")
        );


    // ==============================================
    // AVENA
    // ==============================================

    if (
        name.includes("avena")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 10;
        }


        if (
            unit === "tsp"
        ) {
            return 3.3;
        }


        if (
            unit === "unit"
        ) {
            return 40;
        }


        return 40;
    }


    // ==============================================
    // AZÚCAR / EDULCORANTE
    // ==============================================

    if (
        name.includes("azucar") ||
        name.includes("edulcorante") ||
        name.includes("hileret")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 12;
        }


        if (
            unit === "tsp"
        ) {
            return 4;
        }


        return 12;
    }


    // ==============================================
    // HARINA
    // ==============================================

    if (
        name.includes("harina")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 8;
        }


        if (
            unit === "tsp"
        ) {
            return 2.7;
        }


        return 30;
    }


    // ==============================================
    // ACEITE
    // ==============================================

    if (
        name.includes("aceite")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 13.5;
        }


        if (
            unit === "tsp"
        ) {
            return 4.5;
        }


        return 13.5;
    }


    // ==============================================
    // LECHE
    // ==============================================

    if (
        name.includes("leche")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 15;
        }


        if (
            unit === "tsp"
        ) {
            return 5;
        }


        if (
            unit === "unit"
        ) {
            return 200;
        }


        return 200;
    }


    // ==============================================
    // YOGUR
    // ==============================================

    if (
        name.includes("yogur") ||
        name.includes("yogurt")
    ) {

        if (
            unit === "tbsp"
        ) {
            return 15;
        }


        if (
            unit === "tsp"
        ) {
            return 5;
        }


        if (
            unit === "unit"
        ) {
            return 125;
        }


        return 125;
    }


    // ==============================================
    // GALLETITAS
    // ==============================================

    if (
        name.includes("gallet")
    ) {

        if (
            unit === "unit"
        ) {
            return 10;
        }


        return 30;
    }


    // ==============================================
    // PORCIÓN DECLARADA POR OPEN FOOD FACTS
    // ==============================================

    const original =
        product?.originalProduct ||
        product;


    const servingQuantity =
        Number(
            original
                ?.serving_quantity
        );


    if (
        Number.isFinite(
            servingQuantity
        ) &&
        servingQuantity > 0
    ) {

        return servingQuantity;
    }


    // ==============================================
    // VALORES GENÉRICOS
    // ==============================================

    if (
        unit === "tbsp"
    ) {
        return 10;
    }


    if (
        unit === "tsp"
    ) {
        return 3.3;
    }


    if (
        unit === "unit"
    ) {
        return 30;
    }


    return 30;
}


// ======================================================
// 26. NOMBRE DE LA UNIDAD
// ======================================================

function getUnitName(
    unit
) {

    const units = {

        g:
            "g",

        ml:
            "ml",

        tbsp:
            "cucharada",

        tsp:
            "cucharadita",

        unit:
            "unidad",

        portion:
            "porción"
    };


    return (
        units[unit] ||
        unit
    );
}


// ======================================================
// 27. VARIABLES DEL SCANNER
// ======================================================

let html5QrCode =
    null;


window.scannedProductResult =
    null;
// Producto que estamos intentando resolver
// mediante scanner.
window.pendingProductSearch =
    null;

// ======================================================
// 28. CALCULAR PRODUCTO ESCANEADO
// ======================================================

function calculateScannedProduct() {

    const product =
        window.scannedProductResult;


    if (!product) {
        return;
    }


    const amountInput =
        document.getElementById(
            "productAmount"
        );


    const unitSelect =
        document.getElementById(
            "productUnit"
        );


    const caloriesElement =
        document.getElementById(
            "scannedCalories"
        );


    const proteinElement =
        document.getElementById(
            "scannedProtein"
        );


    const amount =
        Number(
            amountInput?.value
        ) || 1;


    const unit =
        unitSelect?.value ||
        "g";


    let grams =
        amount;


    if (
        unit === "ml"
    ) {

        grams =
            amount;

    } else if (
        unit !== "g"
    ) {

        grams =
            amount *
            getProductUnitGrams(
                product,
                unit
            );
    }


    const calories100 =
        getProductCalories100g(
            product
        );


    const protein100 =
        getProductProtein100g(
            product
        );


    const calories =
        calories100 *
        grams /
        100;


    const protein =
        protein100 *
        grams /
        100;


    product.gramos =
        grams;

    product.calorias =
        calories;

    product.proteinas =
        protein;


    if (caloriesElement) {

        caloriesElement.textContent =
            `${Math.round(calories)} kcal`;
    }


    if (proteinElement) {

        proteinElement.textContent =
            `${protein.toFixed(1)} g`;
    }
}


// ======================================================
// 29. MOSTRAR PRODUCTO ESCANEADO
// ======================================================

function showScannedProduct(
    product
) {

    if (!product) {
        return;
    }


    const normalized =
        normalizeOpenFoodFactsProduct(
            product
        );


    if (!normalized) {

        alert(
            "No pude leer la información nutricional del producto."
        );

        return;
    }


    window.scannedProductResult =
        normalized;


    const container =
        document.getElementById(
            "scannedProductContainer"
        );


    const productName =
        document.getElementById(
            "scannedProductName"
        );


    const productBrand =
        document.getElementById(
            "scannedProductBrand"
        );


    const productImage =
        document.getElementById(
            "scannedProductImage"
        );


    const amountInput =
        document.getElementById(
            "productAmount"
        );


    const unitSelect =
        document.getElementById(
            "productUnit"
        );


    if (productName) {

        productName.textContent =
            normalized.name;
    }


    if (productBrand) {

        productBrand.textContent =
            normalized.brand ||
            "Marca no especificada";
    }


    if (productImage) {

        if (normalized.image) {

            productImage.src =
                normalized.image;

            productImage.style.display =
                "block";

        } else {

            productImage.style.display =
                "none";
        }
    }


    if (amountInput) {

        amountInput.value =
            1;
    }


    if (unitSelect) {

        unitSelect.value =
            "unit";
    }


    if (container) {

        container.style.display =
            "block";
    }


    calculateScannedProduct();
}


// ======================================================
// 30. INICIAR SCANNER
// ======================================================

async function startScanner() {

    const scannerContainer =
        document.getElementById(
            "scannerContainer"
        );


    const reader =
        document.getElementById(
            "reader"
        );


    if (
        !scannerContainer ||
        !reader
    ) {

        alert(
            "No encontré el lector de códigos de barras."
        );

        return;
    }


    if (
        typeof Html5Qrcode ===
        "undefined"
    ) {

        alert(
            "El lector de códigos de barras no está disponible."
        );

        return;
    }


    scannerContainer.style.display =
        "block";


    if (html5QrCode) {

        try {

            await html5QrCode.stop();

        } catch (_) {

            // El scanner quizá todavía no estaba activo.
        }


        try {

            html5QrCode.clear();

        } catch (_) {

            // Ignorar.
        }
    }


    html5QrCode =
        new Html5Qrcode(
            "reader"
        );


    try {

        await html5QrCode.start(

            {
                facingMode:
                    "environment"
            },

            {
                fps: 10,

                qrbox: {
                    width: 250,
                    height: 150
                }
            },

            async decodedText => {

                try {

                    await html5QrCode.stop();

                } catch (_) {

                    // Ignorar.
                }


                scannerContainer.style.display =
                    "none";


                const product =
                    await buscarProductoOpenFoodFacts(
                        decodedText
                    );


                if (!product) {

                    alert(
                        "No encontré ese producto en Open Food Facts."
                    );

                    return;
                }


                showScannedProduct(
                    product
                );
            },

            () => {

                /*
                    Los errores de lectura mientras
                    la cámara busca un código son normales.
                    No mostramos nada.
                */
            }
        );

    } catch (error) {

        console.error(
            "Error iniciando scanner:",
            error
        );


        scannerContainer.style.display =
            "none";


        alert(
            "No pude iniciar la cámara. Revisá los permisos del navegador."
        );
    }
}


// ======================================================
// 31. DETECTAR CANTIDAD DE PRODUCTO EN TEXTO
// ======================================================

function getProductAmountFromText(
    text,
    product
) {

    const normalized =
        normalize(text);


    let quantity =
        findNumber(
            normalized
        );


    if (
        quantity === null ||
        !Number.isFinite(quantity)
    ) {

        quantity = 1;
    }


    // ==============================================
    // GRAMOS
    // ==============================================

    const gramsMatch =
        normalized.match(
            /(\d+(?:[.,]\d+)?)\s*(?:g|gr|gramo|gramos)\b/
        );


    if (gramsMatch) {

        return {

            grams:
                parseFloat(
                    gramsMatch[1]
                        .replace(",", ".")
                ),

            amount:
                parseFloat(
                    gramsMatch[1]
                        .replace(",", ".")
                ),

            unit:
                "g"
        };
    }


    // ==============================================
    // MILILITROS
    // ==============================================

    const mlMatch =
        normalized.match(
            /(\d+(?:[.,]\d+)?)\s*(?:ml|mililitro|mililitros|cc)\b/
        );


    if (mlMatch) {

        const amount =
            parseFloat(
                mlMatch[1]
                    .replace(",", ".")
            );


        return {

            grams:
                amount,

            amount:
                amount,

            unit:
                "ml"
        };
    }


    // ==============================================
    // CUCHARADITA
    // ==============================================

    if (
        /\bcucharaditas?\b/.test(
            normalized
        )
    ) {

        return {

            grams:
                quantity *
                getProductUnitGrams(
                    product,
                    "tsp"
                ),

            amount:
                quantity,

            unit:
                "tsp"
        };
    }


    // ==============================================
    // CUCHARADA
    // ==============================================

    if (
        /\bcucharadas?\b/.test(
            normalized
        )
    ) {

        return {

            grams:
                quantity *
                getProductUnitGrams(
                    product,
                    "tbsp"
                ),

            amount:
                quantity,

            unit:
                "tbsp"
        };
    }


    // ==============================================
    // TAZA
    // ==============================================

    if (
        /\btazas?\b/.test(
            normalized
        )
    ) {

        return {

            grams:
                quantity *
                200,

            amount:
                quantity,

            unit:
                "portion"
        };
    }


    // ==============================================
    // VASO
    // ==============================================

    if (
        /\bvasos?\b/.test(
            normalized
        )
    ) {

        return {

            grams:
                quantity *
                200,

            amount:
                quantity,

            unit:
                "portion"
        };
    }


    // ==============================================
    // UNIDAD
    // ==============================================

    if (
        /\b(unidad|unidades)\b/.test(
            normalized
        )
    ) {

        return {

            grams:
                quantity *
                getProductUnitGrams(
                    product,
                    "unit"
                ),

            amount:
                quantity,

            unit:
                "unit"
        };
    }


    // ==============================================
    // PORCIÓN / VALOR POR DEFECTO
    // ==============================================

    return {

        grams:
            quantity *
            getProductUnitGrams(
                product,
                "unit"
            ),

        amount:
            quantity,

        unit:
            "unit"
    };
}


// ======================================================
// 32. CONVERTIR PRODUCTO EN ALIMENTO
// ======================================================

function convertSelectedProductToMealItem(
    product,
    originalText
) {

    if (!product) {
        return null;
    }


    const amount =
        getProductAmountFromText(
            originalText,
            product
        );


    const calories100 =
        getProductCalories100g(
            product
        );


    const protein100 =
        getProductProtein100g(
            product
        );


    const calories =
        calories100 *
        amount.grams /
        100;


    const protein =
        protein100 *
        amount.grams /
        100;


    const displayName =
        [
            product.name,
            product.brand
        ]
            .filter(Boolean)
            .join(" · ");


    return {

        key:
            "product_" +
            (
                product.code ||
                normalize(
                    displayName
                )
            ),

        name:
            displayName ||
            "Producto",

        calories:
            calories,

        protein:
            protein,

        quantity:
            amount.amount,

        grams:
            amount.grams,

        unit:
            amount.unit,

        brandedProduct:
            true
    };
}


// ======================================================
// 33. EVITAR DUPLICADOS ENTRE GENÉRICO Y MARCA
// ======================================================

function removeGenericFoodsForSelectedProduct(
    genericResults,
    searchText
) {

    if (
        !Array.isArray(
            genericResults
        )
    ) {

        return [];
    }


    const normalizedSearch =
        normalize(
            searchText
        );


    return genericResults.filter(
        item => {

            const itemName =
                normalize(
                    item.name ||
                    ""
                );


            const definition =
                foodDefinitions.find(
                    def =>
                        def.key ===
                        item.key
                );


            const terms =
                definition
                    ?.terms ||
                [];


            const matchesSearch =
                terms.some(
                    term =>

                        normalizedSearch.includes(
                            normalize(term)
                        )
                ) ||
                (
                    itemName &&
                    normalizedSearch.includes(
                        itemName
                    )
                );


            return !matchesSearch;
        }
    );
}


// ======================================================
// 34. ANALIZAR COMIDA + PRODUCTOS DE MARCA
// ======================================================

async function analyzeMealWithProducts(
    description
) {

    /*
        MOTOR LEGACY

        Se mantiene funcionando durante
        la migración a Parser V2.
    */

    let genericResults =
        analyzeMeal(
            description
        );


    /*
        FOODS AR / PARSER V2

        Analizamos también la descripción
        utilizando el nuevo catálogo argentino.
    */

    const foodsARResults =
        analyzeFoodAR(
            description
        );

        /*
    ==================================================
    PRIORIDAD DE PREPARACIONES ESPECÍFICAS
    ==================================================

    Una preparación específica tiene prioridad
    sobre el alimento base.

    Ejemplo:

    "2 huevos revueltos"

    El motor legacy reconoce:
        huevoRevuelto

    Foods AR reconoce:
        huevo

    No debemos contar ambos porque el huevo
    ya forma parte de la preparación.
*/

const preparationBaseFoods = {

    huevoRevuelto:
        "huevo",

    huevoFrito:
        "huevo",

    milanesaPollo:
        "pollo",

    milanesaCarne:
        "carne",

    purePapa:
        "papa"
};


/*
    Buscamos qué alimentos base ya están
    representados por una preparación específica.
*/

/*
    ==================================================
    FOODS AR V2 VS PREPARACIONES LEGACY
    ==================================================

    Si Foods AR reconoce explícitamente una
    preparación, esa versión V2 tiene prioridad
    sobre la preparación equivalente del motor
    legacy.

    Ejemplo:

    "2 huevos revueltos"

    Foods AR:
        huevo + preparation "revuelto"

    Legacy:
        huevoRevuelto

    Conservamos Foods AR y eliminamos el legacy.
*/

const preparationLegacyKeys = {

    huevo: {
        revuelto:
            "huevoRevuelto",

        frito:
            "huevoFrito"
    }

};


const legacyPreparationKeysToRemove =
    new Set();


foodsARResults.forEach(
    item => {

        const preparationId =
            item.preparation?.id;


        if (!preparationId) {
            return;
        }


        const legacyKey =
            preparationLegacyKeys[
                item.foodId
            ]?.[
                preparationId
            ];


        if (legacyKey) {

            legacyPreparationKeysToRemove.add(
                legacyKey
            );
        }
    }
);


/*
    Quitamos solamente la preparación legacy
    que fue reemplazada explícitamente por V2.
*/

genericResults =
    genericResults.filter(
        item =>
            !legacyPreparationKeysToRemove.has(
                item.key
            )
    );


/*
    A partir de este punto todos los resultados
    válidos de Foods AR continúan normalmente.
*/

const filteredFoodsARResults =
    foodsARResults;
    /*
        Evitamos duplicar un alimento cuando
        ya existe una versión V2 del mismo.

        Esto será importante durante la migración
        de alimentos del motor viejo a Foods AR.
    */

    if (
    Array.isArray(filteredFoodsARResults) &&
    filteredFoodsARResults.length > 0
) {

        /*
    Foods AR tiene prioridad sobre el motor legacy.

    No podemos comparar solamente foodId === key,
    porque los identificadores de ambos motores
    no necesariamente coinciden.

    Ejemplo:
        legacy   -> aceite
        Foods AR -> aceiteOliva
*/

const foodsARIds =
    new Set(
        foodsARResults.map(
            item =>
                item.foodId
        )
    );


const foodsARMatches =
    findFoodsAR(
        description
    );


genericResults =
    genericResults.filter(
        item => {

            /*
                Caso simple:
                ambos motores utilizan el mismo ID.

                Ejemplo:
                huevo -> huevo
            */

            if (
                foodsARIds.has(
                    item.key
                )
            ) {
                return false;
            }


            /*
                Buscamos qué términos pertenecen
                al alimento legacy.
            */

            const legacyDefinition =
                foodDefinitions.find(
                    definition =>
                        definition.key ===
                        item.key
                );


            if (!legacyDefinition) {
                return true;
            }


            const legacyTerms =
                (
                    legacyDefinition.terms ||
                    []
                )
                    .map(
                        term =>
                            normalize(term)
                    )
                    .filter(Boolean);


            /*
                Si un término legacy está contenido
                dentro de un alias que Foods AR ya
                reconoció, conservamos solamente
                Foods AR.

                Ejemplo:

                legacy:
                    "aceite"

                Foods AR:
                    "aceite de oliva"

                "aceite" está contenido en
                "aceite de oliva"
                    ↓
                eliminamos el resultado legacy.
            */

            const coveredByFoodsAR =
                foodsARMatches.some(
                    match => {

                        const alias =
                            normalize(
                                match.alias ||
                                ""
                            );

                        return legacyTerms.some(
                            term => {

                                const escapedTerm =
                                    term.replace(
                                        /[.*+?^${}()|[\]\\]/g,
                                        "\\$&"
                                    );

                                return new RegExp(
                                    `\\b${escapedTerm}\\b`
                                ).test(alias);
                            }
                        );
                    }
                );


            return !coveredByFoodsAR;
        }
    );


        genericResults.push(
    ...filteredFoodsARResults
);
    }


    const selectedProducts =
        [];


    const searches =
        extractPossibleProductSearches(
            description
        );


    if (
        searches.length === 0
    ) {

        window
            .calorieTrackSelectedProducts =
            [];


        return genericResults;
    }


    const segments =
        splitMealIntoSegments(
            description
        );


    for (
        const searchText
        of searches
    ) {

        let products = [];


        try {

            products =
                await buscarProductosPorNombre(
                    searchText
                );

        } catch (error) {

            console.error(
                `No se pudo buscar "${searchText}":`,
                error
            );


            continue;
        }


                if (
            !products ||
            products.length === 0
        ) {

            /*
                Open Food Facts no encontró el texto exacto.

                Antes simplemente hacíamos "continue",
                por eso marcas como "Hileret Light"
                desaparecían silenciosamente.

                Ahora intentamos búsquedas progresivamente
                más simples.
            */

            const searchWords =
                normalize(searchText)
                    .split(/\s+/)
                    .filter(Boolean);


            /*
                Ejemplo:

                "hileret light"
                    ↓
                primero busca "hileret light"
                    ↓
                si no encuentra, busca "hileret"
            */

            if (searchWords.length > 1) {

                for (
                    let wordCount =
                        searchWords.length - 1;

                    wordCount >= 1;

                    wordCount--
                ) {

                    const simplerSearch =
                        searchWords
                            .slice(
                                0,
                                wordCount
                            )
                            .join(" ");


                    /*
                        Evitamos búsquedas demasiado
                        genéricas.
                    */

                    if (
                        simplerSearch.length < 3
                    ) {
                        continue;
                    }


                    try {

                        const fallbackProducts =
                            await buscarProductosPorNombre(
                                simplerSearch
                            );


                        if (
                            Array.isArray(
                                fallbackProducts
                            ) &&
                            fallbackProducts.length > 0
                        ) {

                            products =
                                fallbackProducts;

                            break;
                        }

                    } catch (error) {

                        console.error(
                            `No se pudo buscar "${simplerSearch}":`,
                            error
                        );
                    }
                }
            }


            /*
                Si ni siquiera la búsqueda simplificada
                encontró algo, no inventamos calorías.
            */

           if (
    !products ||
    products.length === 0
) {

    console.warn(
        `CalorieTrack: no se encontró el producto "${searchText}".`
    );


    const action =
        await seleccionarAccionProductoNoEncontrado(
            searchText
        );


    /*
        POR AHORA:

        Solo estamos comprobando
        que el selector funcione.

        Scanner y carga manual
        se conectarán después.
    */


    if (
        action === "generic"
    ) {

        // Mantener alimento genérico.

        continue;
    }


    if (
    action === "scan"
) {

    /*
        Recordamos qué marca/producto
        está intentando identificar.
    */

    window.pendingProductSearch =
        searchText;


    /*
        Abrimos el scanner que CalorieTrack
        ya tiene implementado.
    */

    await startScanner();


    /*
        Por ahora terminamos este intento.

        En el siguiente paso conectaremos
        el producto escaneado con "Hileret"
        y con el cálculo de la comida.
    */

    continue;
}


    if (
        action === "manual"
    ) {

        alert(
            "En el próximo paso conectaremos la carga manual."
        );

        continue;
    }


    // Cancelar

    continue;
} 
        }

        let selected =
            null;


        if (
            products.length === 1 &&
            products[0].fromCache
        ) {

            selected =
                products[0];

        } else {

            selected =
                await seleccionarProductoEncontrado(
                    searchText,
                    products
                );
        }


        if (!selected) {
            continue;
        }


        /*
            Buscamos el fragmento original donde
            apareció esa marca/producto.

            Esto nos permite saber si el usuario dijo:

            "una cucharadita de Hileret Light"

            o:

            "2 galletitas Oreo"
        */

const matchingSegment =
    segments.find(
        segment => {

            const cleaned =
                removeKnownFoodTerms(
                    cleanProductSearchText(
                        segment
                    )
                );


            return (
                normalize(
                    cleaned
                ) ===
                normalize(
                    searchText
                )
            );
        }
    ) ||
    searchText;

        const mealItem =
            convertSelectedProductToMealItem(
                selected,
                matchingSegment
            );


        if (!mealItem) {
            continue;
        }


        /*
            Si el producto seleccionado representa
            algo que ya estaba detectado como genérico,
            quitamos el genérico para no contar dos veces.

            Ejemplo:

            "azúcar Hileret Light"

            No queremos sumar:
            Azúcar genérica + Hileret Light.
        */

        genericResults =
            removeGenericFoodsForSelectedProduct(
                genericResults,
                matchingSegment
            );


        selectedProducts.push(
            mealItem
        );


        saveProductToCache(
            searchText,
            selected
        );
    }


    window
        .calorieTrackSelectedProducts =
        selectedProducts;


    return [
        ...genericResults,
        ...selectedProducts
    ];
}


// ======================================================
// 35. LOCALSTORAGE - COMIDAS
// ======================================================

const MEALS_STORAGE_KEY =
    "calorieTrackMeals";


function getSavedMeals() {

    try {

        const saved =
            localStorage.getItem(
                MEALS_STORAGE_KEY
            );


        if (!saved) {
            return [];
        }


        const parsed =
            JSON.parse(
                saved
            );


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Error leyendo comidas guardadas:",
            error
        );


        return [];
    }
}


function saveMeals(
    meals
) {

    try {

        localStorage.setItem(
            MEALS_STORAGE_KEY,
            JSON.stringify(
                meals
            )
        );

    } catch (error) {

        console.error(
            "Error guardando comidas:",
            error
        );
    }
}


// ======================================================
// 36. FECHA LOCAL
// ======================================================

function getLocalDateKey(
    date = new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        )
            .padStart(
                2,
                "0"
            );


    const day =
        String(
            date.getDate()
        )
            .padStart(
                2,
                "0"
            );


    return (
        `${year}-${month}-${day}`
    );
}


// ======================================================
// 37. OBTENER COMIDAS DE HOY
// ======================================================

function getTodayMeals() {

    const today =
        getLocalDateKey();


    return getSavedMeals()
        .filter(
            meal =>
                meal.date ===
                today
        );
}


// ======================================================
// 38. GUARDAR UNA COMIDA
// ======================================================

function saveMeal(
    meal
) {

    if (!meal) {
        return;
    }


    const meals =
        getSavedMeals();


    const now =
        new Date();


    meals.push({

        id:
            Date.now(),

        date:
            getLocalDateKey(
                now
            ),

        createdAt:
            now.toISOString(),

        type:
            meal.type ||
            "Comida",

        description:
            meal.description ||
            "",

        calories:
            Number(
                meal.calories
            ) ||
            0,

        protein:
            Number(
                meal.protein
            ) ||
            0,

        foods:
            Array.isArray(
                meal.foods
            )
                ? meal.foods
                : []
    });


    saveMeals(
        meals
    );
}


// ======================================================
// 39. ELIMINAR COMIDA
// ======================================================

function deleteMeal(
    mealId
) {

    const meals =
        getSavedMeals();


    const filtered =
        meals.filter(
            meal =>
                Number(meal.id) !==
                Number(mealId)
        );


    saveMeals(
        filtered
    );


    updateDashboard();
}


// ======================================================
// 40. OBJETIVO
// ======================================================

const GOAL_STORAGE_KEY =
    "calorieTrackGoal";


function getSavedGoal() {

    try {

        const saved =
            localStorage.getItem(
                GOAL_STORAGE_KEY
            );


        if (!saved) {
            return null;
        }


        return JSON.parse(
            saved
        );

    } catch (error) {

        console.error(
            "Error leyendo objetivo:",
            error
        );


        return null;
    }
}


function saveGoal(
    goal
) {

    if (!goal) {
        return;
    }


    try {

        localStorage.setItem(
            GOAL_STORAGE_KEY,
            JSON.stringify(
                goal
            )
        );

    } catch (error) {

        console.error(
            "Error guardando objetivo:",
            error
        );
    }
}


// ======================================================
// 41. CALCULAR CALORÍAS OBJETIVO
// ======================================================

function calculateGoalCalories(
    weight,
    sex,
    height,
    age,
    activity,
    goalType
) {

    weight =
        Number(weight);

    height =
        Number(height);

    age =
        Number(age);


    if (
        !Number.isFinite(weight) ||
        !Number.isFinite(height) ||
        !Number.isFinite(age) ||
        weight <= 0 ||
        height <= 0 ||
        age <= 0
    ) {

        return null;
    }


    /*
        Fórmula Mifflin-St Jeor
    */

    let bmr;


    if (
        sex === "female"
    ) {

        bmr =
            (
                10 * weight
            ) +
            (
                6.25 * height
            ) -
            (
                5 * age
            ) -
            161;

    } else {

        bmr =
            (
                10 * weight
            ) +
            (
                6.25 * height
            ) -
            (
                5 * age
            ) +
            5;
    }


    const activityFactors = {

        sedentary:
            1.2,

        light:
            1.375,

        moderate:
            1.55,

        active:
            1.725,

        veryActive:
            1.9
    };


    const factor =
        activityFactors[
            activity
        ] ||
        1.2;


    let calories =
        bmr *
        factor;


    if (
        goalType === "lose"
    ) {

        calories -=
            400;

    } else if (
        goalType === "gain"
    ) {

        calories +=
            300;
    }


    /*
        Evitamos objetivos absurdamente bajos
        por datos incorrectos.
    */

    calories =
        Math.max(
            1200,
            calories
        );


    return Math.round(
        calories
    );
}


// ======================================================
// 42. MOSTRAR OBJETIVO
// ======================================================

function displayGoal(
    goal
) {

    if (!goal) {
        return;
    }


    const targetCalories =
        document.getElementById(
            "targetCalories"
        );


    const goalCalories =
        document.getElementById(
            "goalCalories"
        );


    const dailyGoal =
        Number(
            goal.calories
        ) ||
        0;


    if (targetCalories) {

        targetCalories.textContent =
            Math.round(
                dailyGoal
            );
    }


    if (goalCalories) {

        goalCalories.textContent =
            Math.round(
                dailyGoal
            );
    }
}


// ======================================================
// 43. CARGAR OBJETIVO GUARDADO
// ======================================================

function loadSavedGoal() {

    const goal =
        getSavedGoal();


    if (!goal) {
        return;
    }


    displayGoal(
        goal
    );


    const fields = {

        goalWeight:
            goal.weight,

        goalHeight:
            goal.height,

        goalAge:
            goal.age,

        goalSex:
            goal.sex,

        goalActivity:
            goal.activity,

        goalType:
            goal.goalType
    };


    Object.entries(
        fields
    )
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(
                        id
                    );


                if (
                    element &&
                    value !== undefined &&
                    value !== null
                ) {

                    element.value =
                        value;
                }
            }
        );
}


// ======================================================
// 44. ACTUALIZAR DASHBOARD
// ======================================================

function updateDashboard() {

    const meals =
        getTodayMeals();


    const totalCalories =
        meals.reduce(
            (
                total,
                meal
            ) =>
                total +
                (
                    Number(
                        meal.calories
                    ) ||
                    0
                ),
            0
        );


    const totalProtein =
        meals.reduce(
            (
                total,
                meal
            ) =>
                total +
                (
                    Number(
                        meal.protein
                    ) ||
                    0
                ),
            0
        );


    const goal =
        getSavedGoal();


    const goalCalories =
        Number(
            goal?.calories
        ) ||
        0;


    const remaining =
        goalCalories > 0
            ? Math.max(
                0,
                goalCalories -
                totalCalories
            )
            : 0;


    const consumedCalories =
        document.getElementById(
            "consumedCalories"
        );


    const consumedProtein =
        document.getElementById(
            "consumedProtein"
        );


    const remainingCalories =
        document.getElementById(
            "remainingCalories"
        );


    const totalMeals =
        document.getElementById(
            "totalMeals"
        );


    if (consumedCalories) {

        consumedCalories.textContent =
            Math.round(
                totalCalories
            );
    }


    if (consumedProtein) {

        consumedProtein.textContent =
            Math.round(
                totalProtein
            );
    }


    if (remainingCalories) {

        remainingCalories.textContent =
            goalCalories > 0
                ? Math.round(
                    remaining
                )
                : "--";
    }


    if (totalMeals) {

        totalMeals.textContent =
            meals.length;
    }


    renderMeals(
        meals
    );
}


// ======================================================
// 45. MOSTRAR COMIDAS GUARDADAS
// ======================================================

function renderMeals(
    meals = getTodayMeals()
) {

    const container =
        document.getElementById(
            "mealsList"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (
        !meals ||
        meals.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-meals";


        empty.textContent =
            "Todavía no registraste comidas hoy.";


        container.appendChild(
            empty
        );


        return;
    }


    meals
        .slice()
        .reverse()
        .forEach(
            meal => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "meal-item";


                const header =
                    document.createElement(
                        "div"
                    );


                header.className =
                    "meal-item-header";


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    meal.type ||
                    "Comida";


                const calories =
                    document.createElement(
                        "span"
                    );


                calories.textContent =
                    `${Math.round(
                        Number(
                            meal.calories
                        ) ||
                        0
                    )} kcal`;


                header.appendChild(
                    title
                );


                header.appendChild(
                    calories
                );


                const description =
                    document.createElement(
                        "div"
                    );


                description.className =
                    "meal-item-description";


                description.textContent =
                    meal.description ||
                    "";


                const nutrition =
                    document.createElement(
                        "div"
                    );


                nutrition.className =
                    "meal-item-nutrition";


                nutrition.textContent =
                    `${Number(
                        meal.protein ||
                        0
                    ).toFixed(1)} g proteína`;


                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.type =
                    "button";


                deleteButton.className =
                    "delete-meal-btn";


                deleteButton.textContent =
                    "Eliminar";


                deleteButton.addEventListener(
                    "click",
                    () => {

                        deleteMeal(
                            meal.id
                        );
                    }
                );


                item.appendChild(
                    header
                );


                if (
                    meal.description
                ) {

                    item.appendChild(
                        description
                    );
                }


                item.appendChild(
                    nutrition
                );


                item.appendChild(
                    deleteButton
                );


                container.appendChild(
                    item
                );
            }
        );
}


// ======================================================
// 46. ABRIR / CERRAR MODAL DE COMIDA
// ======================================================

function openModal() {

    const modal =
        document.getElementById(
            "mealModal"
        );


    if (!modal) {
        return;
    }


    /*
        Algunos HTML anteriores tenían
        style="display:none" directamente.

        Lo eliminamos para que la clase active
        pueda controlar correctamente el modal.
    */

    modal.style.removeProperty(
        "display"
    );


    modal.classList.add(
        "active"
    );


    window.currentMeal =
        null;


    window
        .calorieTrackSelectedProducts =
        [];


    const resultSection =
        document.getElementById(
            "resultSection"
        );


    if (resultSection) {

        resultSection.style.display =
            "none";
    }
}


async function stopScannerSafely() {

    if (!html5QrCode) {
        return;
    }


    try {

        await html5QrCode.stop();

    } catch (_) {

        /*
            Es normal si el scanner
            todavía no estaba iniciado.
        */
    }


    try {

        html5QrCode.clear();

    } catch (_) {

        // Ignorar.
    }


    html5QrCode =
        null;
}


function closeModal() {

    const modal =
        document.getElementById(
            "mealModal"
        );


    if (!modal) {
        return;
    }


    /*
        Esta corrección es importante:

        Quitamos "active" Y forzamos display:none.

        Así funciona tanto con la versión nueva
        del CSS como con versiones anteriores
        del HTML/CSS que mostraban el modal
        mediante display:flex.
    */

    modal.classList.remove(
        "active"
    );


    modal.style.display =
        "none";


    const scannerContainer =
        document.getElementById(
            "scannerContainer"
        );


    if (scannerContainer) {

        scannerContainer.style.display =
            "none";
    }


    stopScannerSafely();
}


// ======================================================
// 47. EVENTOS PRINCIPALES
// ======================================================

// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // ==================================================
        // ABRIR MODAL DE COMIDA
        // ==================================================

        [
            "openMealModal",
            "openMealModal2",
            "headerAddMeal",
            "dashboardAddMeal",
            "mobileAddMeal"
        ].forEach(
            id => {

                const button =
                    document.getElementById(
                        id
                    );

                if (button) {

                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();

                            openModal();
                        }
                    );
                }
            }
        );


        // ==================================================
        // CERRAR MODAL DE COMIDA
        // ==================================================

        const mealOverlay =
            document.getElementById(
                "mealModalOverlay"
            );


        if (mealOverlay) {

            mealOverlay.addEventListener(
                "click",
                closeModal
            );
        }


        const mealModal =
            document.getElementById(
                "mealModal"
            );


        if (mealModal) {

            mealModal.addEventListener(
                "click",
                event => {

                    /*
                        También permitimos cerrar si el
                        usuario toca directamente el fondo
                        exterior del modal.
                    */

                    if (
                        event.target ===
                        mealModal
                    ) {

                        closeModal();
                    }
                }
            );
        }


        const closeMeal =
            document.getElementById(
                "closeMealModal"
            );


        if (closeMeal) {

            closeMeal.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    closeModal();
                }
            );
        }


        // ==================================================
        // FORMULARIO COMIDA
        // ==================================================

        const mealForm =
            document.getElementById(
                "mealForm"
            );


        if (mealForm) {

            mealForm.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();


                    const descriptionInput =
                        document.getElementById(
                            "mealDescription"
                        );


                    const description =
                        descriptionInput
                            ?.value
                            ?.trim();


                    if (!description) {

                        alert(
                            "Describí lo que comiste."
                        );

                        return;
                    }


                    const submitButton =
                        mealForm.querySelector(
                            '[type="submit"]'
                        );


                    const originalText =
                        submitButton
                            ?.textContent;


                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        submitButton.textContent =
                            "Analizando...";
                    }


                    try {

                        /*
                            Esta es la función principal.

                            Primero analiza alimentos
                            genéricos y después intenta
                            reconocer productos/marcas.
                        */

                        const results =
                            await analyzeMealWithProducts(
                                description
                            );


                        if (
                            !Array.isArray(results) ||
                            results.length === 0
                        ) {

                            alert(
                                "No pude reconocer alimentos o productos en esa descripción."
                            );

                            return;
                        }


                        showEstimate(
                            results
                        );


                    } catch (error) {

                        console.error(
                            "Error analizando comida:",
                            error
                        );


                        /*
                            Si Open Food Facts falla,
                            CalorieTrack sigue funcionando
                            con la base local.
                        */

                        try {

                            const fallbackResults =
                                analyzeMeal(
                                    description
                                );


                            if (
                                fallbackResults.length >
                                0
                            ) {

                                showEstimate(
                                    fallbackResults
                                );

                            } else {

                                alert(
                                    "No pude analizar esa comida. Probá escribiéndola de otra manera."
                                );
                            }

                        } catch (
                            fallbackError
                        ) {

                            console.error(
                                "Error en analizador local:",
                                fallbackError
                            );


                            alert(
                                "Ocurrió un error al analizar la comida."
                            );
                        }


                    } finally {

                        if (
                            submitButton
                        ) {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalText ||
                                "Calcular comida";
                        }
                    }
                }
            );
        }


        // ==================================================
        // GUARDAR COMIDA
        // ==================================================

        const saveMealButton =
            document.getElementById(
                "saveMealBtn"
            );


        if (saveMealButton) {

            saveMealButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    if (
                        !window.currentMeal
                    ) {

                        alert(
                            "Primero calculá la comida."
                        );

                        return;
                    }


                    const mealType =
                        document.getElementById(
                            "mealType"
                        )
                            ?.value ||
                        "Comida";


                    const description =
                        document.getElementById(
                            "mealDescription"
                        )
                            ?.value
                            ?.trim() ||
                        "";


                    saveMeal({

                        type:
                            mealType,

                        description:
                            description,

                        calories:
                            window.currentMeal
                                .calories,

                        protein:
                            window.currentMeal
                                .protein,

                        foods:
                            window.currentMeal
                                .foods
                    });


                    /*
                        Actualizamos el dashboard
                        antes de cerrar.
                    */

                    updateDashboard();


                    /*
                        Limpiamos el estado temporal.
                    */

                    window.currentMeal =
                        null;


                    window
                        .calorieTrackSelectedProducts =
                        [];


                    const descriptionInput =
                        document.getElementById(
                            "mealDescription"
                        );


                    if (
                        descriptionInput
                    ) {

                        descriptionInput.value =
                            "";
                    }


                    const resultSection =
                        document.getElementById(
                            "resultSection"
                        );


                    if (
                        resultSection
                    ) {

                        resultSection.style.display =
                            "none";
                    }


                    const scannedContainer =
                        document.getElementById(
                            "scannedProductContainer"
                        );


                    if (
                        scannedContainer
                    ) {

                        scannedContainer.style.display =
                            "none";
                    }


                    window.scannedProductResult =
                        null;


                    closeModal();
                }
            );
        }


        // ==================================================
        // FORMULARIO DE OBJETIVO
        // ==================================================

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
                            )
                                ?.value
                        );


                    const height =
                        parseFloat(
                            document.getElementById(
                                "goalHeight"
                            )
                                ?.value
                        );


                    const age =
                        parseInt(
                            document.getElementById(
                                "goalAge"
                            )
                                ?.value,
                            10
                        );


                    const sex =
                        document.getElementById(
                            "goalSex"
                        )
                            ?.value;


                    const activity =
                        document.getElementById(
                            "goalActivity"
                        )
                            ?.value;


                    const goalType =
                        document.getElementById(
                            "goalType"
                        )
                            ?.value;


                    // ======================================
                    // VALIDACIONES
                    // ======================================

                    if (
                        !Number.isFinite(
                            weight
                        ) ||
                        weight < 30 ||
                        weight > 500
                    ) {

                        alert(
                            "Ingresá un peso válido."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(
                            height
                        ) ||
                        height < 100 ||
                        height > 250
                    ) {

                        alert(
                            "Ingresá una altura válida en centímetros."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(
                            age
                        ) ||
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
                            "Seleccioná el sexo."
                        );

                        return;
                    }


                    if (!activity) {

                        alert(
                            "Seleccioná tu nivel de actividad."
                        );

                        return;
                    }


                    if (!goalType) {

                        alert(
                            "Seleccioná tu objetivo."
                        );

                        return;
                    }


                    const calories =
                        calculateGoalCalories(
                            weight,
                            sex,
                            height,
                            age,
                            activity,
                            goalType
                        );


                    if (
                        !Number.isFinite(
                            calories
                        )
                    ) {

                        alert(
                            "No pude calcular el objetivo. Revisá los datos ingresados."
                        );

                        return;
                    }


                    const protein =
                        Math.round(
                            weight *
                            1.6
                        );


                    const goal = {

                        weight:
                            weight,

                        height:
                            height,

                        age:
                            age,

                        sex:
                            sex,

                        activity:
                            activity,

                        goalType:
                            goalType,

                        calories:
                            calories,

                        protein:
                            protein
                    };


                    saveGoal(
                        goal
                    );


                    displayGoal(
                        goal
                    );


                    updateDashboard();


                    /*
                        Cerramos el modal objetivo
                        si existe.
                    */

                    const goalModal =
                        document.getElementById(
                            "goalModal"
                        );


                    if (
                        goalModal
                    ) {

                        goalModal.classList.remove(
                            "active"
                        );

                        goalModal.style.display =
                            "none";
                    }
                }
            );
        }


        // ==================================================
        // SCANNER
        // ==================================================

        const scanButton =
            document.getElementById(
                "scanButton"
            );


        if (scanButton) {

            scanButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    startScanner();
                }
            );
        }


        const productAmount =
            document.getElementById(
                "productAmount"
            );


        const productUnit =
            document.getElementById(
                "productUnit"
            );


        if (productAmount) {

            productAmount.addEventListener(
                "input",
                calculateScannedProduct
            );
        }


        if (productUnit) {

            productUnit.addEventListener(
                "change",
                calculateScannedProduct
            );
        }


        // ==================================================
        // USAR PRODUCTO ESCANEADO
        // ==================================================

        const useScannedProduct =
            document.getElementById(
                "useScannedProduct"
            );


        if (
            useScannedProduct
        ) {

            useScannedProduct.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const product =
                        window
                            .scannedProductResult;


                    if (!product) {

                        alert(
                            "Primero escaneá un producto."
                        );

                        return;
                    }


                    if (
                        !Number.isFinite(
                            Number(
                                product.calorias
                            )
                        )
                    ) {

                        calculateScannedProduct();
                    }


                    const mealItem = {

                        key:
                            "scanned_" +
                            (
                                product.code ||
                                normalize(
                                    product.name
                                )
                            ),

                        name:
                            [
                                product.name,
                                product.brand
                            ]
                                .filter(
                                    Boolean
                                )
                                .join(
                                    " · "
                                ),

                        calories:
                            Number(
                                product.calorias
                            ) ||
                            0,

                        protein:
                            Number(
                                product.proteinas
                            ) ||
                            0,

                        grams:
                            Number(
                                product.gramos
                            ) ||
                            0,

                        brandedProduct:
                            true
                    };


                    /*
                        showEstimate() se ocupa
                        de crear window.currentMeal.
                    */

                    showEstimate(
                        [
                            mealItem
                        ]
                    );


                    const description =
                        document.getElementById(
                            "mealDescription"
                        );


                    if (
                        description
                    ) {

                        description.value =
                            `${mealItem.name} - ${Math.round(
                                mealItem.grams
                            )} g`;
                    }


                    const scannedContainer =
                        document.getElementById(
                            "scannedProductContainer"
                        );


                    if (
                        scannedContainer
                    ) {

                        scannedContainer.style.display =
                            "none";
                    }
                }
            );
        }


        // ==================================================
        // CARGA INICIAL
        // ==================================================

        loadSavedGoal();

        updateDashboard();
    }
);


// ======================================================
// 48. MODAL MI OBJETIVO
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const modal =
            document.getElementById(
                "goalModal"
            );


        function openGoal(
            event
        ) {

            if (event) {

                event.preventDefault();
            }


            if (!modal) {
                return;
            }


            /*
                Eliminamos display:none que
                pudiera venir escrito directamente
                en el HTML.
            */

            modal.style.removeProperty(
                "display"
            );


            modal.classList.add(
                "active"
            );
        }


        function closeGoal() {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "active"
            );


            /*
                Forzamos cerrado para mantener
                compatibilidad con el HTML/CSS.
            */

            modal.style.display =
                "none";
        }


        [
            "openGoalModal",
            "mobileOpenGoalModal"
        ].forEach(
            id => {

                const button =
                    document.getElementById(
                        id
                    );


                if (button) {

                    button.addEventListener(
                        "click",
                        openGoal
                    );
                }
            }
        );


        const close =
            document.getElementById(
                "closeGoalModal"
            );


        const overlay =
            document.getElementById(
                "goalModalOverlay"
            );


        const finish =
            document.getElementById(
                "finishGoalBtn"
            );


        if (close) {

            close.addEventListener(
                "click",
                closeGoal
            );
        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeGoal
            );
        }


        if (finish) {

            finish.addEventListener(
                "click",
                closeGoal
            );
        }
    }
);


// ======================================================
// 49. MODAL RECETAS
// ======================================================

// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const recipesModal =
            document.getElementById(
                "recipesModal"
            );


        if (!recipesModal) {
            return;
        }


        function openRecipes(
            event
        ) {

            if (event) {
                event.preventDefault();
            }


            recipesModal.style.removeProperty(
                "display"
            );


            recipesModal.classList.add(
                "active"
            );
        }


        function closeRecipes() {

            recipesModal.classList.remove(
                "active"
            );


            recipesModal.style.display =
                "none";
        }


        // ==============================================
        // BOTONES PARA ABRIR RECETAS
        // ==============================================

        [
            "openRecipesModal",
            "mobileOpenRecipesModal"
        ].forEach(
            id => {

                const button =
                    document.getElementById(
                        id
                    );


                if (button) {

                    button.addEventListener(
                        "click",
                        openRecipes
                    );
                }
            }
        );


        // ==============================================
        // CERRAR RECETAS
        // ==============================================

        const closeButton =
            document.getElementById(
                "closeRecipesModal"
            );


        const overlay =
            document.getElementById(
                "recipesModalOverlay"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeRecipes
            );
        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeRecipes
            );
        }


        // ==============================================
        // CATEGORÍAS DE RECETAS
        // ==============================================

        const categoryButtons =
            recipesModal.querySelectorAll(
                "[data-recipe-category]"
            );


        const recipeSections =
            recipesModal.querySelectorAll(
                "[data-recipe-section]"
            );


        categoryButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const category =
                            button.dataset
                                .recipeCategory;


                        if (!category) {
                            return;
                        }


                        // Quitar activo
                        categoryButtons
                            .forEach(
                                item => {

                                    item.classList
                                        .remove(
                                            "active"
                                        );
                                }
                            );


                        // Activar botón actual
                        button.classList.add(
                            "active"
                        );


                        // Mostrar sección correcta
                        recipeSections
                            .forEach(
                                section => {

                                    const sectionCategory =
                                        section.dataset
                                            .recipeSection;


                                    section.style.display =
                                        (
                                            sectionCategory ===
                                            category
                                        )
                                            ? ""
                                            : "none";
                                }
                            );
                    }
                );
            }
        );
    }
);


// ======================================================
// 50. MODAL COMUNIDAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const communityModal =
            document.getElementById(
                "communityModal"
            );


        if (!communityModal) {
            return;
        }


        function openCommunity(
            event
        ) {

            if (event) {
                event.preventDefault();
            }


            communityModal.style
                .removeProperty(
                    "display"
                );


            communityModal.classList.add(
                "active"
            );
        }


        function closeCommunity() {

            communityModal.classList.remove(
                "active"
            );


            communityModal.style.display =
                "none";
        }


        // ==============================================
        // ABRIR
        // ==============================================

        [
            "openCommunityModal",
            "mobileOpenCommunityModal"
        ].forEach(
            id => {

                const button =
                    document.getElementById(
                        id
                    );


                if (button) {

                    button.addEventListener(
                        "click",
                        openCommunity
                    );
                }
            }
        );


        // ==============================================
        // CERRAR
        // ==============================================

        const closeButton =
            document.getElementById(
                "closeCommunityModal"
            );


        const overlay =
            document.getElementById(
                "communityModalOverlay"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeCommunity
            );
        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeCommunity
            );
        }
    }
);


// ======================================================
// 51. CERRAR MODALES CON ESC
// ======================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        // ==============================================
        // MODAL COMIDA
        // ==============================================

        closeModal();


        // ==============================================
        // OTROS MODALES
        // ==============================================

        [
            "goalModal",
            "recipesModal",
            "communityModal"
        ].forEach(
            id => {

                const modal =
                    document.getElementById(
                        id
                    );


                if (!modal) {
                    return;
                }


                modal.classList.remove(
                    "active"
                );


                modal.style.display =
                    "none";
            }
        );


        // ==============================================
        // MODAL DINÁMICO DE PRODUCTOS
        // ==============================================

        const productOverlay =
            document.querySelector(
                ".product-search-overlay"
            );


        if (productOverlay) {

            /*
                Disparamos click sobre el fondo
                para que la Promise se resuelva
                correctamente con null.

                No removemos el elemento
                directamente.
            */

            productOverlay.click();
        }
    }
);


// ======================================================
// 52. LIMPIAR MODAL DE COMIDA
// ======================================================

function resetMealModal() {

    const mealForm =
        document.getElementById(
            "mealForm"
        );


    if (mealForm) {

        mealForm.reset();
    }


    const resultSection =
        document.getElementById(
            "resultSection"
        );


    if (resultSection) {

        resultSection.style.display =
            "none";
    }


    const scannerContainer =
        document.getElementById(
            "scannerContainer"
        );


    if (scannerContainer) {

        scannerContainer.style.display =
            "none";
    }


    const scannedProductContainer =
        document.getElementById(
            "scannedProductContainer"
        );


    if (
        scannedProductContainer
    ) {

        scannedProductContainer
            .style.display =
            "none";
    }


    window.currentMeal =
        null;


    window.scannedProductResult =
        null;


    window
        .calorieTrackSelectedProducts =
        [];
}


// ======================================================
// 53. CERRAR MODAL + LIMPIAR ESTADO
// ======================================================

const originalCloseMealModal =
    closeModal;


closeModal =
    function () {

        const modal =
            document.getElementById(
                "mealModal"
            );


        if (modal) {

            modal.classList.remove(
                "active"
            );


            modal.style.display =
                "none";
        }


        const scannerContainer =
            document.getElementById(
                "scannerContainer"
            );


        if (
            scannerContainer
        ) {

            scannerContainer.style.display =
                "none";
        }


        stopScannerSafely();


        /*
            No hacemos resetMealModal() acá.

            Motivo:
            si el usuario cierra accidentalmente
            el modal, puede volver a abrirlo sin
            perder lo que estaba escribiendo.

            El formulario se limpia después de
            guardar correctamente.
        */
    };


// ======================================================
// 54. REABRIR CORRECTAMENTE EL MODAL DE COMIDA
// ======================================================

const originalOpenMealModal =
    openModal;


openModal =
    function () {

        const modal =
            document.getElementById(
                "mealModal"
            );


        if (!modal) {
            return;
        }


        /*
            closeModal() coloca display:none.

            Por eso al volver a abrir debemos
            quitar ese estilo antes de agregar
            la clase active.
        */

        modal.style.removeProperty(
            "display"
        );


        modal.classList.add(
            "active"
        );


        /*
            Si el CSS actual todavía depende
            directamente de display:flex y no
            de .active, este fallback asegura
            que el modal igualmente aparezca.
        */

        const computedStyle =
            window.getComputedStyle(
                modal
            );


        if (
            computedStyle.display ===
            "none"
        ) {

            modal.style.display =
                "flex";
        }
    };


// ======================================================
// 55. PROTECCIÓN CONTRA DOBLE GUARDADO
// ======================================================

let mealSaveLocked =
    false;


document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "#saveMealBtn"
            );


        if (!button) {
            return;
        }


        if (mealSaveLocked) {

            event.preventDefault();

            event.stopImmediatePropagation();

            return;
        }


        mealSaveLocked =
            true;


        setTimeout(
            () => {

                mealSaveLocked =
                    false;
            },
            800
        );
    },
    true
);


// ======================================================
// 56. PROTECCIÓN DE DATOS NUMÉRICOS
// ======================================================

function safeNumber(
    value,
    fallback = 0
) {

    const number =
        Number(value);


    return Number.isFinite(
        number
    )
        ? number
        : fallback;
}


// ======================================================
// 57. RESUMEN DE COMIDA ACTUAL
// ======================================================

function getCurrentMealSummary() {

    if (
        !window.currentMeal
    ) {

        return null;
    }


    return {

        calories:
            safeNumber(
                window.currentMeal
                    .calories
            ),

        protein:
            safeNumber(
                window.currentMeal
                    .protein
            ),

        foods:
            Array.isArray(
                window.currentMeal
                    .foods
            )
                ? window.currentMeal
                    .foods
                : []
    };
}


// ======================================================
// 58. COMPROBAR LOCALSTORAGE
// ======================================================

function isLocalStorageAvailable() {

    try {

        const testKey =
            "__calorieTrackTest__";


        localStorage.setItem(
            testKey,
            "1"
        );


        localStorage.removeItem(
            testKey
        );


        return true;

    } catch (_) {

        return false;
    }
}


// ======================================================
// 59. COMPROBACIONES AL CARGAR
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            !isLocalStorageAvailable()
        ) {

            console.warn(
                "CalorieTrack: localStorage no está disponible."
            );
        }


        // ==============================================
        // BOTONES IMPORTANTES
        // ==============================================

        const importantElements = [

            "mealModal",
            "mealForm",
            "mealDescription",
            "closeMealModal"
        ];


        importantElements.forEach(
            id => {

                if (
                    !document.getElementById(
                        id
                    )
                ) {

                    console.warn(
                        `CalorieTrack: no se encontró #${id}`
                    );
                }
            }
        );


        /*
            Dejamos el modal de comida cerrado
            al iniciar la página.

            Esto evita que aparezca abierto por
            una regla CSS antigua.
        */

        const mealModal =
            document.getElementById(
                "mealModal"
            );


        if (mealModal) {

            mealModal.classList.remove(
                "active"
            );


            mealModal.style.display =
                "none";
        }


        // ==============================================
        // OTROS MODALES
        // ==============================================

        [
            "goalModal",
            "recipesModal",
            "communityModal"
        ].forEach(
            id => {

                const modal =
                    document.getElementById(
                        id
                    );


                if (modal) {

                    modal.classList.remove(
                        "active"
                    );


                    modal.style.display =
                        "none";
                }
            }
        );
    }
);


// ======================================================
// 60. ERRORES NO CONTROLADOS
// ======================================================

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "CalorieTrack - Promise rechazada:",
            event.reason
        );
    }
);


window.addEventListener(
    "error",
    event => {

        /*
            Dejamos el error visible en consola
            para facilitar cualquier diagnóstico.
        */

        console.error(
            "CalorieTrack - Error:",
            event.error ||
            event.message
        );
    }
);


// ======================================================
// 61. INFORMACIÓN DE DEPURACIÓN
// ======================================================

console.log(
    "CalorieTrack cargado correctamente."
);


console.log(
    "Reconocimiento de alimentos: activo."
);


console.log(
    "Búsqueda de marcas/productos: activa."
);


console.log(
    "Scanner de código de barras: preparado."
);


// ======================================================
// FIN DEL SCRIPT.JS
// ======================================================

